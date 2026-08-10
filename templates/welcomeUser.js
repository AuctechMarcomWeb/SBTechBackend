/**
 * Welcome email to user after they register / request report
 */
function welcomeEmailToUser({ firstName, lastName, domain, risk, findings = [] }) {
  const riskColor =
    risk && risk.toLowerCase().includes('high')   ? '#ff4d6a' :
    risk && risk.toLowerCase().includes('medium') ? '#f0a030' : '#00e87a';

  const rowsHtml = findings.map(f => {
    const color =
      f.status === 'fail' ? '#ff4d6a' :
      f.status === 'warn' ? '#f0a030' : '#00e87a';
    const icon =
      f.status === 'fail' ? '❌' :
      f.status === 'warn' ? '⚠️' : '✅';
    return `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #1a2e4a;font-size:13px;color:#c8deff;">${icon} ${f.name}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #1a2e4a;font-size:12px;color:${color};font-weight:600;">${f.val}</td>
      </tr>`;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#060d1a;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;background:#0a1628;border:1px solid rgba(59,126,248,.2);border-radius:8px;overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0d1c33,#1a3a6e);padding:30px 36px;border-bottom:1px solid rgba(59,126,248,.2);">
      <div style="background:#3b7ef8;display:inline-block;border-radius:6px;padding:8px 14px;font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:20px;">SBTech</div>
      <h1 style="color:#ffffff;font-size:24px;margin:0 0 8px;font-weight:800;">Your Security Report is Ready 🛡️</h1>
      <p style="color:#6b8cae;font-size:14px;margin:0;">Hi ${firstName}${lastName ? ' ' + lastName : ''}, here are the results for <strong style="color:#c8deff;">${domain || 'your domain'}</strong>.</p>
    </div>

    <!-- Risk Summary -->
    <div style="padding:28px 36px;border-bottom:1px solid #1a2e4a;">
      <div style="background:#060d1a;border:1px solid #1a2e4a;border-radius:8px;padding:20px 24px;">
        <div style="font-size:11px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">Overall Risk Level</div>
        <div style="font-size:22px;font-weight:800;color:${riskColor};">${risk || 'Analysis Complete'}</div>
      </div>
    </div>

    <!-- Findings -->
    ${findings.length > 0 ? `
    <div style="padding:20px 36px 28px;">
      <div style="font-size:12px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">Detailed Findings</div>
      <table style="width:100%;border-collapse:collapse;background:#060d1a;border-radius:6px;overflow:hidden;border:1px solid #1a2e4a;">
        ${rowsHtml}
      </table>
    </div>` : ''}

    <!-- CTA -->
    <div style="padding:20px 36px 32px;text-align:center;">
      <p style="color:#6b8cae;font-size:14px;margin:0 0 20px;">Our security team will contact you with a full NIST-aligned remediation plan.</p>
      <a href="https://sbtech.ca/contact.html" style="display:inline-block;background:#3b7ef8;color:#ffffff;padding:14px 32px;border-radius:6px;font-weight:800;font-size:13px;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">Contact Our Team</a>
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;background:#060d1a;border-top:1px solid #1a2e4a;text-align:center;">
      <p style="color:#2d4a6a;font-size:11px;margin:0 0 4px;">SBTech · 100 Mural St, Suite 100, Richmond Hill, ON L4B 1J3</p>
      <p style="color:#2d4a6a;font-size:11px;margin:0;">© 2025 SBTech. All rights reserved.</p>
    </div>

  </div>
</body>
</html>`;
}

module.exports = { welcomeEmailToUser };
