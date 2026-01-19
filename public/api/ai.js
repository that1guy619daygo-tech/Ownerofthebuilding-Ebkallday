export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "No key" });

  try {
    const { prompt } = req.body;
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    const d = await r.json();
    res.status(200).json({ reply: d.choices?.[0]?.message?.content?.trim() || "" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
