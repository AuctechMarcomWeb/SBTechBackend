import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'smtp.hostinger.com',
    port:   Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    // Connection pool settings to avoid rate limiting
    pool: true,
    maxConnections: 2,
    maxMessages: 10,
    rateDelta: 1000,  // 1 second between sends
    rateLimit: 2,     // max 2 messages per rateDelta
  });
}

let transporter = createTransporter();

export async function sendMail({ to, subject, html }) {
  try {
    const result = await transporter.sendMail({
      from: `"SBTech Security" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to} | MessageId: ${result.messageId}`);
    return result;
  } catch (err) {
    // Recreate transporter on failure (handles stale connections)
    console.error(`❌ Email failed to ${to}: ${err.message}`);
    transporter = createTransporter();
    throw err;
  }
}
