import { createClient } from "jsr:@supabase/supabase-js@2";
const URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const out = (o: unknown) => new Response(JSON.stringify(o), { headers: { ...cors, "Content-Type": "application/json" } });
const hash = async (s: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))).map((b) => b.toString(16).padStart(2, "0")).join("");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const admin = createClient(URL, SERVICE, { auth: { persistSession: false } });
    const { pin, set } = await req.json();
    /* the creator saves her code (must be logged in) */
    if (set) {
      if (!/^[A-Za-z0-9]{6,32}$/.test(String(set))) return out({ error: "6 to 32 letters or digits" });
      const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
      const { data: u } = await admin.auth.getUser(jwt);
      if (!u?.user) return out({ error: "Not signed in" });
      const { data: st } = await admin.from("staff").select("user_id").eq("user_id", u.user.id).maybeSingle();
      if (!st) return out({ error: "Only the creator" });
      await admin.from("pin_codes").upsert({ user_id: u.user.id, pin_hash: await hash(u.user.id + ":" + set) });
      return out({ ok: true });
    }
    /* log in with the code */
    if (!/^[A-Za-z0-9]{6,32}$/.test(String(pin))) return out({ error: "Wrong code" });
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await admin.from("pin_fails").select("*", { count: "exact", head: true }).gt("at", since);
    if ((count ?? 0) >= 10) return out({ error: "Too many tries, wait 1 hour" });
    const { data: rows } = await admin.from("pin_codes").select("user_id, pin_hash");
    let id = "";
    for (const r of rows ?? []) if ((await hash(r.user_id + ":" + pin)) === r.pin_hash) id = r.user_id;
    if (!id) { await admin.from("pin_fails").insert({}); return out({ error: "Wrong code" }); }
    const { data: usr } = await admin.auth.admin.getUserById(id);
    const email = usr?.user?.email;
    if (!email) return out({ error: "No account" });
    const { data: link, error: e1 } = await admin.auth.admin.generateLink({ type: "magiclink", email });
    if (e1 || !link?.properties?.hashed_token) return out({ error: e1?.message || "Link error" });
    const pub = createClient(URL, ANON, { auth: { persistSession: false } });
    const { data: ses, error: e2 } = await pub.auth.verifyOtp({ type: "magiclink", token_hash: link.properties.hashed_token });
    if (e2 || !ses?.session) return out({ error: e2?.message || "Session error" });
    return out({ access_token: ses.session.access_token, refresh_token: ses.session.refresh_token });
  } catch (e) {
    return out({ error: String(e) });
  }
});
