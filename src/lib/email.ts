import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_demo_key');

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Dirk Messerschmidt <noreply@dirk-messerschmidt.de>',
      to: [to],
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Email sending error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

export async function sendBookingConfirmationToClient(
  clientEmail: string,
  clientName: string,
  bookingDetails: {
    date: string;
    time: string;
    message?: string;
  }
) {
  const subject = 'Terminbestätigung - Dirk Messerschmidt';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Terminbestätigung</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Terminbestätigung</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Dirk Messerschmidt - Sachverständiger</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #2c3e50; margin-top: 0;">Hallo ${clientName},</h2>
        
        <p>vielen Dank für Ihre Terminanfrage. Ihr Termin wurde erfolgreich bestätigt:</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h3 style="margin-top: 0; color: #2c3e50;">Termindetails</h3>
          <p style="margin: 5px 0;"><strong>Datum:</strong> ${bookingDetails.date}</p>
          <p style="margin: 5px 0;"><strong>Uhrzeit:</strong> ${bookingDetails.time}</p>
          ${bookingDetails.message ? `<p style="margin: 5px 0;"><strong>Ihre Nachricht:</strong> ${bookingDetails.message}</p>` : ''}
        </div>
        
        <p>Bitte erscheinen Sie pünktlich zum vereinbarten Termin. Bei Fragen oder Änderungswünschen kontaktieren Sie mich bitte rechtzeitig.</p>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #1976d2;">Kontaktinformationen</h4>
          <p style="margin: 5px 0;"><strong>Dirk Messerschmidt</strong></p>
          <p style="margin: 5px 0;">Sachverständiger</p>
          <p style="margin: 5px 0;">E-Mail: info@dirk-messerschmidt.de</p>
          <p style="margin: 5px 0;">Telefon: +49 (0) 123 456789</p>
        </div>
        
        <p>Mit freundlichen Grüßen,<br>
        <strong>Dirk Messerschmidt</strong></p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
Terminbestätigung - Dirk Messerschmidt

Hallo ${clientName},

vielen Dank für Ihre Terminanfrage. Ihr Termin wurde erfolgreich bestätigt:

Termindetails:
- Datum: ${bookingDetails.date}
- Uhrzeit: ${bookingDetails.time}
${bookingDetails.message ? `- Ihre Nachricht: ${bookingDetails.message}` : ''}

Bitte erscheinen Sie pünktlich zum vereinbarten Termin. Bei Fragen oder Änderungswünschen kontaktieren Sie mich bitte rechtzeitig.

Kontaktinformationen:
Dirk Messerschmidt
Sachverständiger
E-Mail: info@dirk-messerschmidt.de
Telefon: +49 (0) 123 456789

Mit freundlichen Grüßen,
Dirk Messerschmidt
  `;

  return sendEmail({ to: clientEmail, subject, html, text });
}

export async function sendBookingNotificationToAdmin(
  adminEmail: string,
  bookingDetails: {
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    date: string;
    time: string;
    message?: string;
  }
) {
  const subject = 'Neue Buchungsanfrage - Admin Dashboard';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neue Buchungsanfrage</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Neue Buchungsanfrage</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Admin Dashboard</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        <h2 style="color: #2c3e50; margin-top: 0;">Neue Terminanfrage eingegangen</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b6b;">
          <h3 style="margin-top: 0; color: #2c3e50;">Kundendaten</h3>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${bookingDetails.clientName}</p>
          <p style="margin: 5px 0;"><strong>E-Mail:</strong> ${bookingDetails.clientEmail}</p>
          ${bookingDetails.clientPhone ? `<p style="margin: 5px 0;"><strong>Telefon:</strong> ${bookingDetails.clientPhone}</p>` : ''}
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
          <h3 style="margin-top: 0; color: #2c3e50;">Termindetails</h3>
          <p style="margin: 5px 0;"><strong>Datum:</strong> ${bookingDetails.date}</p>
          <p style="margin: 5px 0;"><strong>Uhrzeit:</strong> ${bookingDetails.time}</p>
          ${bookingDetails.message ? `<p style="margin: 5px 0;"><strong>Nachricht:</strong> ${bookingDetails.message}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/admin/dashboard" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Zum Admin Dashboard
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          Bitte loggen Sie sich in das Admin Dashboard ein, um die Buchungsanfrage zu bearbeiten.
        </p>
      </div>
    </body>
    </html>
  `;

  const text = `
Neue Buchungsanfrage - Admin Dashboard

Neue Terminanfrage eingegangen

Kundendaten:
- Name: ${bookingDetails.clientName}
- E-Mail: ${bookingDetails.clientEmail}
${bookingDetails.clientPhone ? `- Telefon: ${bookingDetails.clientPhone}` : ''}

Termindetails:
- Datum: ${bookingDetails.date}
- Uhrzeit: ${bookingDetails.time}
${bookingDetails.message ? `- Nachricht: ${bookingDetails.message}` : ''}

Bitte loggen Sie sich in das Admin Dashboard ein, um die Buchungsanfrage zu bearbeiten:
${process.env.NEXTAUTH_URL}/admin/dashboard
  `;

  return sendEmail({ to: adminEmail, subject, html, text });
}
