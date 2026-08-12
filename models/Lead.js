import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, default: '' },
  email:     { type: String, required: true },
  company:   { type: String, default: '' },
  phone:     { type: String, default: '' },
  role:      { type: String, default: '' },
  challenge: { type: String, default: '' },
  domain:    { type: String, default: '' },
  risk:      { type: String, default: '' },
  findings:  { type: Array,  default: [] },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
