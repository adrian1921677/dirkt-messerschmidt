import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { emailTemplates, formatBookingData } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId, action, reason } = await request.json();

    if (!bookingId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hier würde normalerweise die Buchung aus der Datenbank geladen werden
    // Für jetzt verwenden wir Mock-Daten
    const mockBooking = {
      id: bookingId,
      clientName: 'Max Mustermann',
      clientEmail: 'max@beispiel.de',
      timeSlot: {
        date: new Date(),
        startTime: '09:00',
        endTime: '10:00'
      }
    };

    const bookingData = formatBookingData(mockBooking);
    
    let subject: string;
    let emailContent: string;

    if (action === 'confirm') {
      subject = `Terminbestätigung - ${bookingData.formattedDate}`;
      emailContent = emailTemplates.bookingConfirmation(bookingData);
    } else if (action === 'decline') {
      subject = `Terminabsage - ${bookingData.formattedDate}`;
      emailContent = emailTemplates.bookingDecline({
        ...bookingData,
        reason: reason || 'betriebliche Gründe'
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Hier würde normalerweise Resend oder eine andere E-Mail-Service verwendet werden
    // Für jetzt simulieren wir den E-Mail-Versand
    console.log('E-Mail würde gesendet werden:');
    console.log('An:', mockBooking.clientEmail);
    console.log('Betreff:', subject);
    console.log('Inhalt:', emailContent);

    // In Produktion würde hier der echte E-Mail-Versand stattfinden
    // await resend.emails.send({
    //   from: 'noreply@messerschmidt.eu',
    //   to: mockBooking.clientEmail,
    //   subject: subject,
    //   html: emailContent.replace(/\n/g, '<br>')
    // });

    return NextResponse.json({ 
      success: true, 
      message: 'E-Mail erfolgreich gesendet',
      emailContent: emailContent // Für Demo-Zwecke
    });

  } catch (error) {
    console.error('E-Mail-Versand Fehler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
