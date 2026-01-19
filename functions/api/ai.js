export async function onRequest(c) {
  const k = c.env.OPENAI_API_KEY;
  if (!k) return new Response(JSON.stringify({error:"No key"}),{status:500,headers:{"Content-Type":"application/json"}});
  try {
    const {prompt} = await c.request.json();
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {"Authorization": `Bearer ${k}`, "Content-Type": "application/json"},
      body: JSON.stringify({model:"gpt-4o",messages:[{role:"user",content:prompt}],max_tokens:800})
    });
    const d = await r.json();
    return new Response(JSON.stringify({reply:d.choices?.[0]?.message?.content?.trim()||''}),{headers:{"Content-Type":"application/json"}});
  } catch (e) {
    return new Response(JSON.stringify({error:e.message}),{status:500,headers:{"Content-Type":"application
