import "@supabase/functions-js/edge-runtime.d.ts";

const FEED_URL = "https://feeds.feedburner.com/metalinjection";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const secret = req.headers.get("x-cron-secret");
  const expected = Deno.env.get("CRON_SECRET");

  if (!expected || secret !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = await fetch(FEED_URL, {
    headers: {
      "User-Agent": "riff-radar/1.0",
    },
  });

  if (!res.ok) {
    return new Response(`RSS fetch failed: ${res.status}`, { status: 502 });
  }

  const xml = await res.text();

  console.log("rss first bytes:", xml.slice(0, 200));

  return Response.json({
    ok: true,
    bytes: xml.length,
  });
});
