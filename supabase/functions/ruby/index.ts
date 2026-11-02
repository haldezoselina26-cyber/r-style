const KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-flash-latest", "gemini-2.0-flash"];
const cfg = (model: string, json: boolean) => ({ maxOutputTokens: json ? 1024 : 400, temperature: 0.8, ...(json ? { responseMimeType: "application/json" } : {}), ...(model.startsWith("gemini-2.0") ? {} : { thinkingConfig: { thinkingBudget: 0 } }) });
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const out = (o: unknown) =>
  new Response(JSON.stringify(o), { headers: { ...cors, "Content-Type": "application/json" } });
const SAFE = ["HARM_CATEGORY_HARASSMENT", "HARM_CATEGORY_HATE_SPEECH", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "HARM_CATEGORY_DANGEROUS_CONTENT"]
  .map((category) => ({ category, threshold: "BLOCK_LOW_AND_ABOVE" }));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!KEY) return out({ error: "Missing GEMINI_API_KEY secret" });
  try {
    const { messages, image, json, imageOut, stream, warm } = await req.json();
    if (warm) return out({ ok: true });
    /* check the user at the same time as Ruby thinks (faster) */
    const who = fetch(`${Deno.env.get("SUPABASE_URL")}/auth/v1/user`, {
      headers: { Authorization: req.headers.get("Authorization") ?? "", apikey: req.headers.get("apikey") ?? "" },
    }).then((r) => r.ok).catch(() => false);
    const contents = (Array.isArray(messages) ? messages : []).slice(-12).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content ?? "").slice(0, 6000) }],
    }));
    if (!contents.length) return out({ error: "No message" });
    if (typeof image === "string" && image.startsWith("data:") && image.length < 4_000_000) {
      const [head, data] = image.split(",");
      const mime = (head.match(/data:(.*?);/) || [])[1] || "image/jpeg";
      contents[contents.length - 1].parts.push({ inline_data: { mime_type: mime, data } } as any);
    }
    if (imageOut) {
      if (!(await who)) return out({ error: "Not signed in" });
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
        body: JSON.stringify({ contents, safetySettings: SAFE, generationConfig: { responseModalities: ["IMAGE", "TEXT"] } }),
      });
      const d = await r.json();
      if (!r.ok) return out({ error: d?.error?.message || "Image error", status: r.status });
      const part = (d?.candidates?.[0]?.content?.parts || []).find((p: any) => p.inlineData || p.inline_data);
      const inl = part?.inlineData || part?.inline_data;
      if (!inl) return out({ error: "No image" });
      return out({ image: `data:${inl.mimeType || inl.mime_type || "image/png"};base64,${inl.data}` });
    }
    let lastErr = "No model available", lastStatus = 0;
    for (const model of MODELS) {
      const body = JSON.stringify({ contents, safetySettings: SAFE, generationConfig: cfg(model, !!json) });
      if (stream && !json) {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
          method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": KEY }, body,
        });
        if (r.status === 404) continue;
        if (!(await who)) return out({ error: "Not signed in" });
        if (!r.ok || !r.body) { const d = await r.json().catch(() => ({})); lastErr = d?.error?.message || "Gemini error"; lastStatus = r.status; if ([429, 500, 503].includes(r.status)) continue; return out({ error: lastErr, status: r.status }); }
        const dec = new TextDecoder(), enc = new TextEncoder();
        let buf = "";
        const ts = new TransformStream({
          transform(chunk, ctl) {
            buf += dec.decode(chunk, { stream: true });
            const lines = buf.split("\n"); buf = lines.pop() ?? "";
            for (const l of lines) {
              if (!l.startsWith("data:")) continue;
              try { const d = JSON.parse(l.slice(5)); const t = (d?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join(""); if (t) ctl.enqueue(enc.encode(t)); } catch (_) { /* skip */ }
            }
          },
          flush(ctl) {
            if (buf.startsWith("data:")) {
              try { const d = JSON.parse(buf.slice(5)); const t = (d?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join(""); if (t) ctl.enqueue(enc.encode(t)); } catch (_) { /* skip */ }
            }
          },
        });
        return new Response(r.body.pipeThrough(ts), { headers: { ...cors, "Content-Type": "text/plain; charset=utf-8", "X-Model": model } });
      }
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": KEY }, body,
      });
      if (r.status === 404) continue;
      if (!(await who)) return out({ error: "Not signed in" });
      const d = await r.json();
      if (!r.ok) { lastErr = d?.error?.message || "Gemini error"; lastStatus = r.status; if ([429, 500, 503].includes(r.status)) continue; return out({ error: lastErr, status: r.status }); }
      const text = (d?.candidates?.[0]?.content?.parts || []).map((p: any) => p.text || "").join("");
      return out({ text, model });
    }
    return out({ error: lastErr, status: lastStatus });
  } catch (e) {
    return out({ error: String(e) });
  }
});
