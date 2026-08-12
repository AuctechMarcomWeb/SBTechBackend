import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  domain:   { type: String, required: true },
  risk:     { type: String, default: '' },
  findings: { type: Array,  default: [] },
}, { timestamps: true });

export default mongoose.models.Scan || mongoose.model('Scan', scanSchema);
