// ─────────────────────────────────────────────
//  ArrivEd PH — AI Hub Backend Proxy
//  Node.js + Express server
// ─────────────────────────────────────────────

const express = require('express');
const cors    = require('cors');
const fetch   = require('node-fetch');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ───────────────────────────────
app.use(cors());                    // allow requests from your frontend
app.use(express.json());            // parse JSON bodies
app.use(express.static('public'));  // serve your HTML frontend from /public folder

// ── HEALTH CHECK ─────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ArrivEd PH AI Server is running 🎓' });
});

// ── CLAUDE PROXY ENDPOINT ────────────────────
// Your frontend calls POST /api/chat
// This server adds the API key and forwards to Anthropic
app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;

  // Basic validation
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const body = {
      model:      'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages,
    };
    if (system) body.system = system;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,   // key stays on server!
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.json(data);

  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ── START ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  ArrivEd PH AI Server running at http://localhost:${PORT}`);
});
