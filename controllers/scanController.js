import Scan from '../models/Scan.js';
import { sendMail } from '../config/mailer.js';
import { scanAlertToSBTech } from '../templates/scanAlert.js';

export async function createScan(req, res) {
  try {
    const { domain, risk, findings } = req.body;
    if (!domain) return res.status(400).json({ success: false, message: 'Domain is required' });

    await Scan.create({ domain, risk, findings: findings || [] });

    // Send alert email — with proper error logging
    try {
      await sendMail({
        to:      process.env.SBTECH_EMAIL,
        subject: `🔍 New Security Scan — ${domain} | ${risk || 'Result Pending'}`,
        html:    scanAlertToSBTech({ domain, risk, findings }),
      });
    } catch (err) {
      console.error('Scan alert mail failed:', err.message);
    }

    res.json({ success: true, message: 'Scan saved and alert sent' });
  } catch (err) {
    console.error('Scan error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}
