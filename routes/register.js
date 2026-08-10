const express = require('express');
const router  = express.Router();
const { sendMail } = require('../mailer');
const { welcomeEmailToUser }       = require('../templates/welcomeUser');
const { registerAlertToSBTech }    = require('../templates/registerAlert');

/**
 * POST /api/register
 * Body: { firstName, lastName, email, company, phone, role, challenge, domain, risk, findings[] }
 * → User ko welcome email + SBTech ko lead notification
 */
router.post('/register', async (req, res) => {
  try {
    const {
      firstName, lastName, email,
      company, phone, role, challenge,
      domain, risk, findings,
    } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ success: false, message: 'firstName and email are required' });
    }

    // 1️⃣  User ko welcome email
    await sendMail({
      to: email,
      subject: `Welcome to SBTech — Your Security Report is Ready`,
      html: welcomeEmailToUser({ firstName, lastName, domain, risk, findings }),
    });

    // 2️⃣  SBTech ko lead notification
    await sendMail({
      to: process.env.SBTECH_EMAIL,
      subject: `🚨 New Lead — ${company || firstName} (${domain || 'No domain'}) — ${risk || 'N/A'}`,
      html: registerAlertToSBTech({ firstName, lastName, email, company, phone, role, challenge, domain, risk, findings }),
    });

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (err) {
    console.error('Register email error:', err.message);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
});

module.exports = router;
