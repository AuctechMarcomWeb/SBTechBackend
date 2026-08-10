export function scanAlertToSBTech({ domain, risk, findings = [] }) {
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
    <div style="background:linear-gradient(135deg,#0d1c33,#1a3a6e);padding:30px 36px;border-bottom:1px solid rgba(59,126,248,.2);">
      <div style="display:inline-block;background:#3b7ef8;border-radius:6px;padding:8px 14px;font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:16px;">SBTech</div>
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px;font-weight:800;">🔍 New Domain Scan</h1>
      <p style="color:#6b8cae;font-size:14px;margin:0;">Someone just scanned a domain using the SBTech Security Scanner.</p>
    </div>
    <div style="padding:28px 36px;border-bottom:1px solid #1a2e4a;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 16px;background:#060d1a;border-radius:6px 0 0 6px;border:1px solid #1a2e4a;">
            <div style="font-size:11px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Scanned Domain</div>
            <div style="font-size:18px;color:#ffffff;font-weight:800;">${domain}</div>
          </td>
          <td style="width:20px;"></td>
          <td style="padding:12px 16px;background:#060d1a;border-radius:0 6px 6px 0;border:1px solid #1a2e4a;">
            <div style="font-size:11px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Risk Level</div>
            <div style="font-size:16px;font-weight:800;color:${riskColor};">${risk || 'Scan Initiated'}</div>
          </td>
        </tr>
      </table>
    </div>
    ${findings.length > 0 ? `
    <div style="padding:20px 36px 28px;">
      <div style="font-size:12px;color:#6b8cae;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;">Scan Findings</div>
      <table style="width:100%;border-collapse:collapse;background:#060d1a;border-radius:6px;overflow:hidden;border:1px solid #1a2e4a;">
        ${rowsHtml}
      </table>
    </div>` : ''}
    <div style="padding:20px 36px;background:#060d1a;border-top:1px solid #1a2e4a;text-align:center;">
      <p style="color:#2d4a6a;font-size:11px;margin:0;">© SBTech Security Scanner · Auto-generated alert</p>
    </div>
  </div>
</body>
</html>`;
}
