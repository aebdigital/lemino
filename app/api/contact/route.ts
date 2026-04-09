import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, string>;

  if (!email || !message) {
    return NextResponse.json({ error: 'Email a správa sú povinné' }, { status: 400 });
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    console.error('Missing SMTP2GO env vars');
    return NextResponse.json({ error: 'Chyba konfigurácie servera' }, { status: 500 });
  }

  const textBody = [
    `Meno: ${name || '-'}`,
    `Email: ${email}`,
    `Telefón: ${phone || '-'}`,
    '',
    'Správa:',
    message,
  ].join('\n');

  const htmlBody = `
    <table style="font-family:sans-serif;font-size:14px;color:#171510">
      <tr><td style="padding:4px 16px 4px 0;font-weight:600">Meno</td><td>${name || '-'}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;font-weight:600">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:4px 16px 4px 0;font-weight:600">Telefón</td><td>${phone || '-'}</td></tr>
    </table>
    <hr style="margin:16px 0;border:none;border-top:1px solid #e2d9c8"/>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;color:#171510">${message.replace(/</g, '&lt;')}</p>
  `;

  const res = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      to: [recipient],
      sender: sender,
      subject: `Dopyt z webu Lemino — ${name || email}`,
      text_body: textBody,
      html_body: htmlBody,
    }),
  });

  if (!res.ok) {
    console.error('SMTP2GO HTTP error', res.status);
    return NextResponse.json({ error: 'Odoslanie zlyhalo, skúste neskôr' }, { status: 502 });
  }

  const data = (await res.json()) as { data?: { succeeded?: number } };

  if (data?.data?.succeeded === 1) {
    return NextResponse.json({ success: true });
  }

  console.error('SMTP2GO returned failure', data);
  return NextResponse.json({ error: 'Odoslanie zlyhalo, skúste neskôr' }, { status: 502 });
}
