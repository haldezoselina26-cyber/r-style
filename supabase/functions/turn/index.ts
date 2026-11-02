/* TURN credentials for calls (Cloudflare Realtime). Secrets: CF_TURN_KEY_ID, CF_TURN_API_TOKEN */
const ID = Deno.env.get("CF_TURN_KEY_ID") ?? "";
const TOKEN = Deno.env.get("CF_TURN_API_TOKEN") ?? "";
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const out = (o: unknown) => new Response(JSON.stringify(o), { headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (!ID || !TOKEN) return out({ iceServers: null, error: "TURN not set up" });
  const ok = await fetch(`${Deno.env.get("SUPABASE_URL")}/auth/v1/user`, {
    headers: { Authorization: req.headers.get("Authorization") ?? "", apikey: req.headers.get("apikey") ?? "" },
  }).then((r) => r.ok).catch(() => false);
  if (!ok) return out({ iceServers: null, error: "Not signed in" });
  try {
    const r = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${ID}/credentials/generate-ice-servers`, {
      method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify({ ttl: 86400 }),
    });
    const d = await r.json().catch(() => ({}));
    let ice = d?.iceServers;
    if (!r.ok || !ice) {
      const r2 = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${ID}/credentials/generate`, {
        method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify({ ttl: 86400 }),
      });
      const d2 = await r2.json().catch(() => ({}));
      if (!r2.ok || !d2?.iceServers) return out({ iceServers: null, error: d2?.errors?.[0]?.message || "TURN error " + r2.status });
      ice = d2.iceServers;
    }
    const list = (Array.isArray(ice) ? ice : [ice]).map((s: any) => ({ ...s, urls: (Array.isArray(s.urls) ? s.urls : [s.urls]).filter((u: string) => !/:53\b/.test(u)) }));
    return out({ iceServers: list, ttl: 86400 });
  } catch (e) {
    return out({ iceServers: null, error: String(e) });
  }
});
