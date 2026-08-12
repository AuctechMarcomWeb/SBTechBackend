import Lead from '../models/Lead.js';
import { sendMail } from '../config/mailer.js';
import { welcomeEmailToUser }    from '../templates/welcomeUser.js';
import { registerAlertToSBTech } from '../templates/registerAlert.js';

export async function registerLead(req, res) {
  try {
    const { firstName, lastName, email, company, phone, role, challenge, domain, risk, findings } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ success: false, message: 'firstName and email are required' });
    }

    await Lead.create({ firstName, lastName, email, company, phone, role, challenge, domain, risk, findings: findings || [] });

    await sendMail({
      to:      email,
      subject: `Welcome to SBTech — Your Security Report is Ready`,
      html:    welcomeEmailToUser({ firstName, lastName, domain, risk, findings }),
    });

    await sendMail({
      to:      process.env.SBTECH_EMAIL,
      subject: `🚨 New Lead — ${company || firstName} (${domain || 'No domain'}) — ${risk || 'N/A'}`,
      html:    registerAlertToSBTech({ firstName, lastName, email, company, phone, role, challenge, domain, risk, findings }),
    });

    res.json({ success: true, message: 'Lead saved and emails sent' });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}
