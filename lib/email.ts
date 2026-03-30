// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface SendPaymentEmailOptions {
  to: string;
  customerName: string;
  productName: string;
  amountFcfa: number;
  reference: string;
  paidAt: Date;
  notionUrl: string;
}

export async function sendPaymentConfirmationEmail(
  opts: SendPaymentEmailOptions
): Promise<void> {
  const { to, customerName, productName, amountFcfa, reference, paidAt, notionUrl } = opts;

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Africa/Porto-Novo',
  }).format(paidAt);

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de paiement — Zoulkiful</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;font-weight:600;">Zoulkiful Soumaila</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;">Paiement confirmé ✓</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 24px;font-size:16px;color:#334155;line-height:1.6;">
                Bonjour <strong>${customerName}</strong>,<br><br>
                Merci pour ton achat ! Ton paiement a bien été reçu. Tu peux accéder à ton contenu dès maintenant.
              </p>

              <!-- Receipt Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:32px;">
                <tr><td style="padding:24px;">
                  <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">Récapitulatif de commande</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#64748b;">Produit</td>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;text-align:right;">${productName}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#64748b;">Montant</td>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:700;text-align:right;">${amountFcfa.toLocaleString('fr-FR')} FCFA</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#64748b;">Date</td>
                      <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;text-align:right;">${formattedDate}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;font-size:14px;color:#64748b;">Référence</td>
                      <td style="padding:8px 0;font-size:14px;color:#0f172a;font-family:monospace;text-align:right;">${reference}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${notionUrl}"
                       style="display:inline-block;background:linear-gradient(135deg,#1d4ed8,#2563eb);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:10px;box-shadow:0 4px 16px rgba(37,99,235,0.35);">
                      🚀 Accéder à mon contenu
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:14px;color:#64748b;text-align:center;">
                Des questions ? Réponds directement à cet email ou contacte-moi sur WhatsApp.
              </p>
              <p style="margin:0;font-size:14px;color:#64748b;text-align:center;">
                <strong style="color:#0f172a;">Zoulkiful Soumaila</strong> — Digital Entrepreneur, Bénin
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Cet email a été envoyé automatiquement suite à ton achat sur zoulkiful.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `✅ Ton accès à "${productName}" est prêt !`,
    html,
  });
}
