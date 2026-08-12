import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅  MongoDB connected');
  } catch (err) {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

// ── Lead Schema ──────────────────────────────────────────────────────────────
const leadSchema = new mongoose.Schema({
  firstName: String,
  lastName:  String,
  email:     String,
  company:   String,
  phone:     String,
  role:      String,
  challenge: String,
  domain:    String,
  risk:      String,
  findings:  { type: Array, default: [] },
}, { timestamps: true });

// ── Scan Schema ──────────────────────────────────────────────────────────────
const scanSchema = new mongoose.Schema({
  domain:   String,
  risk:     String,
  findings: { type: Array, default: [] },
}, { timestamps: true });

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
export const Scan = mongoose.models.Scan || mongoose.model('Scan', scanSchema);
