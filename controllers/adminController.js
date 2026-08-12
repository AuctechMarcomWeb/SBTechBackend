import Lead from '../models/Lead.js';
import Scan from '../models/Scan.js';

export function login(req, res) {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true, token: process.env.ADMIN_TOKEN });
  }
  res.status(401).json({ success: false, message: 'Invalid email or password' });
}

export async function getStats(req, res) {
  try {
    const [totalLeads, totalScans, highRisk, medRisk, lowRisk] = await Promise.all([
      Lead.countDocuments(),
      Scan.countDocuments(),
      Scan.countDocuments({ risk: /HIGH/i }),
      Scan.countDocuments({ risk: /MEDIUM/i }),
      Scan.countDocuments({ risk: /LOW/i }),
    ]);
    res.json({ success: true, data: { totalLeads, totalScans, highRisk, medRisk, lowRisk } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getLeads(req, res) {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    const data  = leads.map(l => ({ ...l, id: l._id, createdAt: l.createdAt?.toISOString() }));
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getScans(req, res) {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 }).lean();
    const data  = scans.map(s => ({ ...s, id: s._id, createdAt: s.createdAt?.toISOString() }));
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteLead(req, res) {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
