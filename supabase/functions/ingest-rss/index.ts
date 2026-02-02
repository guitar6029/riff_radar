import "@supabase/functions-js/edge-runtime.d.ts";

Deno.serve(async (req) => {
  const secret = req.headers.get("x-cron-secret");
  const expected = Deno.env.get("CRON_SECRET");

  if (!expected || secret !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({ ok: true });
});
