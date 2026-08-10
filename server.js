require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const mailer  = require('./mailer');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'SBTech Backend Running ✅' }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api', require('./routes/scan'));
app.use('/api', require('./routes/register'));

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`✅  SBTech backend running on http://localhost:${PORT}`));
