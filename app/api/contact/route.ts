export const dynamic = 'force-dynamic';
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message trop long.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? '465'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `[Contact Site] ${subject ?? 'Nouveau message'} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#f8fafc;border-radius:12px;">
          <h2 style="color:#1e3a8a;margin-top:0;">Nouveau message de contact</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Nom</td><td style="color:#0f172a;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Email</td><td><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Sujet</td><td style="color:#0f172a;">${subject ?? '—'}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#fff;border-radius:8px;border:1px solid #e2e8f0;">
            <p style="color:#0f172a;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[POST /api/contact]', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi.' }, { status: 500 });
  }
}
