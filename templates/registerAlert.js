/**
 * Lead notification email to SBTech when user registers / requests report
 */
function registerAlertToSBTech({ firstName, lastName, email, company, phone, role, challenge, domain, risk, findings = [] }) {
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

  const field = (label, value) => value ? `
    <tr>
      <td style="padding:8px 14px;font-size:12px;color:#6b8cae;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;border-bottom:1px solid #1a2e4a;">${label}</td>
      <td style="padding:8px 14px;font-size:13px;color:#c8deff;border-bottom:1px solid #1a2e4a;">${value}</td>
    </tr>` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#060d1a;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;background:#0a1628;border:1px solid rgba(59,126,248,.2);border-radius:8px;overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0d1c33,#1a3a6e);padding:30px 36px;border-bottom:1px solid rgba(59,126,248,.2);">
      <div style="background:#ff4d6a;display:inline-block;border-radius:6px;padding:6px 14px;font-size:12px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:16px;">🚨 NEW LEAD</div>
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;font-weight:800;">${firstName} ${lastName || ''} — ${company || 'Unknown Company'}</h1>
      <p style="color:#6b8cae;font-size:14px;margin:0;">New report request from the SBTech Security Scanner.</p>
    </div>

    <!-- Contact Info -->
    <div style="padding:24px 36px;border-bottom:1px solid #1a2e4a;">
      <div style="font-size:12px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">Contact Details</div>
      <table style="width:100%;border-collapse:collapse;background:#060d1a;border-radius:6px;overflow:hidden;border:1px solid #1a2e4a;">
        ${field('Name', `${firstName} ${lastName || ''}`)}
        ${field('Email', email)}
        ${field('Company', company)}
        ${field('Phone', phone)}
        ${field('Role', role)}
        ${field('Challenge', challenge)}
      </table>
    </div>

    <!-- Scan Results -->
    <div style="padding:24px 36px;border-bottom:1px solid #1a2e4a;">
      <div style="font-size:12px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">Scan Results</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 16px;background:#060d1a;border-radius:6px 0 0 6px;border:1px solid #1a2e4a;">
            <div style="font-size:11px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Domain</div>
            <div style="font-size:18px;color:#ffffff;font-weight:800;">${domain || 'N/A'}</div>
          </td>
          <td style="width:16px;"></td>
          <td style="padding:12px 16px;background:#060d1a;border-radius:0 6px 6px 0;border:1px solid #1a2e4a;">
            <div style="font-size:11px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Risk Level</div>
            <div style="font-size:15px;font-weight:800;color:${riskColor};">${risk || 'N/A'}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Findings -->
    ${findings.length > 0 ? `
    <div style="padding:20px 36px 28px;">
      <div style="font-size:12px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">Security Findings</div>
      <table style="width:100%;border-collapse:collapse;background:#060d1a;border-radius:6px;overflow:hidden;border:1px solid #1a2e4a;">
        ${rowsHtml}
      </table>
    </div>` : ''}

    <!-- Footer -->
    <div style="padding:20px 36px;background:#060d1a;border-top:1px solid #1a2e4a;text-align:center;">
      <p style="color:#2d4a6a;font-size:11px;margin:0;">© SBTech Security Scanner · Auto-generated lead alert</p>
    </div>

  </div>
</body>
</html>`;
}

module.exports = { registerAlertToSBTech };
