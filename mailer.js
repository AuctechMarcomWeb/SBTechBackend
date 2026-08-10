const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,    // smtp.hostinger.com
  port:   Number(process.env.SMTP_PORT),  // 465
  secure: process.env.SMTP_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.EMAIL_USER,   // your@yourdomain.com
    pass: process.env.EMAIL_PASS,   // Hostinger email password
  },
  tls: {
    rejectUnauthorized: false,      // Hostinger SSL compatibility
  },
});

// Connection verify on startup
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ Mailer connection failed:', err.message);
  } else {
    console.log('✅ Mailer connected — ready to send emails');
  }
});

/**
 * sendMail({ to, subject, html })
 */
async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"SBTech Security" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
