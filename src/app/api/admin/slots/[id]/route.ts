import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: slotId } = await params;
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    // Prüfe ob Slot existiert
    const existingSlot = await prisma.timeSlot.findUnique({
      where: { id: slotId },
      include: {
        bookings: true
      }
    });

    if (!existingSlot) {
      console.log(`Slot ${slotId} nicht gefunden`);
      return NextResponse.json(
        { error: 'Slot nicht gefunden' },
        { status: 404 }
      );
    }

    console.log(`Slot ${slotId} gefunden, Status: ${existingSlot.status}, Buchungen: ${existingSlot.bookings.length}, Force: ${force}`);

    // Prüfe aktive Buchungen
    const activeBookings = existingSlot.bookings.filter(booking => 
      booking.status === 'PENDING' || booking.status === 'CONFIRMED'
    );

    if (activeBookings.length > 0 && !force) {
      console.log(`Slot ${slotId} hat ${activeBookings.length} aktive Buchungen, kann nicht gelöscht werden`);
      return NextResponse.json(
        { 
          error: 'Slot kann nicht gelöscht werden, da aktive Buchungen vorhanden sind',
          details: { active: activeBookings.length },
          canForce: true
        },
        { status: 409 }
      );
    }

    if (force && activeBookings.length > 0) {
      console.log(`Force-Delete: Storniere ${activeBookings.length} aktive Buchungen für Slot ${slotId}`);
      
      // Sammle Buchungsdaten für E-Mails
      const bookingData = activeBookings.map(booking => ({
        id: booking.id,
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        date: existingSlot.date.toLocaleDateString('de-DE'),
        time: `${existingSlot.startTime} - ${existingSlot.endTime}`
      }));
      
      // Force-Delete: Storniere alle aktiven Buchungen in einer Transaktion
      await prisma.$transaction(async (tx) => {
        // Storniere alle aktiven Buchungen
        await tx.booking.updateMany({
          where: { 
            timeSlotId: slotId,
            status: { in: ['PENDING', 'CONFIRMED'] }
          },
          data: { status: 'CANCELLED' }
        });

        // Lösche alle stornierten Buchungen
        await tx.booking.deleteMany({
          where: { 
            timeSlotId: slotId,
            status: 'CANCELLED'
          }
        });

        // Lösche den Slot
        await tx.timeSlot.delete({
          where: { id: slotId }
        });
      });

      // Generiere mailto: Links für Stornierungs-E-Mails
      const mailtoLinks = bookingData.map(booking => {
        const subject = 'Terminabsage - Dirk Messerschmidt';
        const body = `Sehr geehrte/r ${booking.clientName},

leider muss ich Ihnen mitteilen, dass Ihr gebuchter Termin storniert werden muss.

Stornierter Termin:
- Datum: ${booking.date}
- Uhrzeit: ${booking.time}
- Grund: Slot wurde vom Administrator entfernt

Bitte kontaktieren Sie mich telefonisch unter 0202 / 423 110, um einen neuen Termin zu vereinbaren.

Ich entschuldige mich für die Unannehmlichkeiten.

Mit freundlichen Grüßen
Dirk Messerschmidt
Sachverständiger

Tel: 0202 / 423 110
Adresse: Alt-Wolfshahn 12, 42117 Wuppertal`;

        return {
          email: booking.clientEmail,
          name: booking.clientName,
          mailtoLink: `mailto:${booking.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        };
      });

      console.log(`Force-Delete: ${mailtoLinks.length} mailto: Links generiert`);

      console.log(`Slot ${slotId} erfolgreich force-gelöscht (${activeBookings.length} Buchungen storniert)`);

      return NextResponse.json({
        success: true,
        message: `Slot erfolgreich gelöscht (${activeBookings.length} Buchungen storniert)`,
        forced: true,
        mailtoLinks: mailtoLinks
      });
    }

    // Normal-Delete: Nur stornierte Buchungen löschen
    if (existingSlot.bookings.length > 0) {
      console.log(`Slot ${slotId} hat ${existingSlot.bookings.length} stornierte Buchungen, lösche sie zuerst...`);
      
      // Lösche alle stornierten Buchungen für diesen Slot
      await prisma.booking.deleteMany({
        where: { 
          timeSlotId: slotId,
          status: 'CANCELLED'
        }
      });
      
      console.log(`Stornierte Buchungen für Slot ${slotId} gelöscht`);
    }

    // Lösche den Slot
    await prisma.timeSlot.delete({
      where: { id: slotId }
    });

    console.log(`Slot ${slotId} erfolgreich gelöscht`);

    return NextResponse.json({
      success: true,
      message: existingSlot.bookings.length > 0 
        ? `Slot erfolgreich gelöscht (${existingSlot.bookings.length} stornierte Buchungen entfernt)`
        : 'Slot erfolgreich gelöscht'
    });

  } catch (error) {
    console.error('Fehler beim Löschen des Slots:', error);
    
    // Prisma Foreign Key Constraint Error
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json(
        { 
          error: 'FK-Constraint: Buchungen referenzieren Slot',
          details: 'Slot kann nicht gelöscht werden, da noch Buchungen vorhanden sind'
        },
        { status: 409 }
      );
    }
    
    // Detaillierte Fehlerbehandlung
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Fehler beim Löschen des Slots',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: slotId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['PUBLISHED', 'HIDDEN', 'BOOKED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Ungültiger Status' },
        { status: 400 }
      );
    }

    // Aktualisiere den Slot
    const updatedSlot = await prisma.timeSlot.update({
      where: { id: slotId },
      data: { status },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
        maxBookings: true,
        currentBookings: true
      }
    });

    console.log(`Slot ${slotId} Status auf ${status} geändert`);

    return NextResponse.json({
      success: true,
      message: 'Slot erfolgreich aktualisiert',
      slot: updatedSlot
    });

  } catch (error) {
    console.error('Fehler beim Aktualisieren des Slots:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Slots' },
      { status: 500 }
    );
  }
}
