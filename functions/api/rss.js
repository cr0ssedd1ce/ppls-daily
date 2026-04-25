// functions/api/rss.js
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const feedUrl = url.searchParams.get('url');
  if (!feedUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const resp = await fetch(feedUrl, { headers: { 'User-Agent': 'PeoplesDaily/1.0' } });
    if (!resp.ok) throw new Error(`Upstream status ${resp.status}`);
    const text = await resp.text();
    return new Response(text, { headers: { 'Content-Type': 'application/xml', 'Access-Control-Allow-Origin': '*' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 502, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }
}
