const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/wealth', (req, res) => {
  res.json({ message: "Wealth unlocked." });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
