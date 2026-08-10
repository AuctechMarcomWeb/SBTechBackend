import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import scanRoute from './routes/scan.js';
import registerRoute from './routes/register.js';

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'SBTech Backend Running ✅' }));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', scanRoute);
app.use('/api', registerRoute);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅  SBTech backend running on port ${PORT}`)
);
