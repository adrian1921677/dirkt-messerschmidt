import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  body: z.string().min(5).max(5000),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    // Optional: hier in bestehende DB schreiben
    // await saveMessage(data);

    const results = await Promise.allSettled([
      notifyEmail(data),
      notifySlack(data),
      notifyWhatsAppCloud(data),     // ← Offizielle WhatsApp Cloud API (empfohlen)
      // notifyWhatsAppCallMeBot(data) // ← Inoffiziell, nur falls gewünscht
    ]);

    const allFailed = results.every(r => r.status === "rejected");
    if (allFailed) {
      return NextResponse.json(
        { ok: false, error: "Alle Benachrichtigungen fehlgeschlagen" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}

/* ---------------- E-Mail (Resend) ---------------- */
async function notifyEmail(msg: any) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL_TO) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.NOTIFY_EMAIL_FROM ?? "no-reply@yourdomain.com",
      to: [process.env.NOTIFY_EMAIL_TO],
      subject: `Neue Nachricht: ${msg.subject ?? "Kontaktformular"}`,
      text:
`Von: ${msg.name} <${msg.email}>
${msg.phone ? "Tel: " + msg.phone + "\n" : ""}Betreff: ${msg.subject ?? "-"}
-------------------------
${msg.body}
`,
    }),
  });
  if (!res.ok) throw new Error("Resend email failed");
}

/* ---------------- Slack (Webhook) ---------------- */
async function notifySlack(msg: any) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  const payload = {
    text:
`📬 *Neue Kontaktanfrage*
*Von:* ${msg.name} (${msg.email})${msg.phone ? " • " + msg.phone : ""}
*Betreff:* ${msg.subject ?? "-"}
> ${msg.body}`,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Slack webhook failed");
}

/* -------- WhatsApp (offiziell, WhatsApp Cloud API) --------
   Erfordert:
   - WHATSAPP_TOKEN (permanent/long-lived)
   - WHATSAPP_PHONE_NUMBER_ID (Meta Business)
   - WHATSAPP_TO (Empfänger, z.B. 4917xxxxxxx)
*/
async function notifyWhatsAppCloud(msg: any) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_TO; // nur Ziffern mit Ländervorwahl, z.B. 4917...
  if (!token || !phoneNumberId || !to) return;

  const text =
`📩 Neue Nachricht
Von: ${msg.name} (${msg.email})${msg.phone ? " • " + msg.phone : ""}
Betreff: ${msg.subject ?? "-"}

${msg.body}`;

  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body: text },
    }),
  });
  if (!res.ok) throw new Error("WhatsApp Cloud API failed");
}

/* -------- WhatsApp (inoffiziell, CallMeBot – optional) --------
   Schnell & kostenlos, aber inoffiziell/fragil.
   Erfordert:
   - CALLMEBOT_PHONE (ohne +, mit Ländervorwahl, z.B. 4917...)
   - CALLMEBOT_APIKEY
*/
async function notifyWhatsAppCallMeBot(msg: any) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;

  const text =
`Neue Nachricht von ${msg.name} (${msg.email})${msg.phone ? " • " + msg.phone : ""}
${msg.subject ? "Betreff: " + msg.subject + "\n" : ""}${msg.body}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apikey}`;

  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error("CallMeBot failed");
}