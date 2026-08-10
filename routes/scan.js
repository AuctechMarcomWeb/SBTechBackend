import express from 'express';
import { sendMail } from '../mailer.js';
import { scanAlertToSBTech } from '../templates/scanAlert.js';

const router = express.Router();

// POST /api/scan-alert
// → SBTech ko email jab koi scan kare
router.post('/scan-alert', async (req, res) => {
  try {
    const { domain, risk, findings } = req.body;

    if (!domain) {
      return res.status(400).json({ success: false, message: 'Domain is required' });
    }

    await sendMail({
      to: process.env.SBTECH_EMAIL,
      subject: `🔍 New Security Scan — ${domain} | ${risk || 'Result Pending'}`,
      html: scanAlertToSBTech({ domain, risk, findings }),
    });

    res.json({ success: true, message: 'Scan alert sent to SBTech' });
  } catch (err) {
    console.error('Scan alert error:', err.message);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
});

export default router;
