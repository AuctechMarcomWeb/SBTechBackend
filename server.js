require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());                   // allow all origins
app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'SBTech Backend Running ✅' }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', require('./routes/scan'));
app.use('/api', require('./routes/register'));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅  SBTech backend running on port ${PORT}`)
);
