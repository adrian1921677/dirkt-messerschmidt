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

    console.log(`Slot ${slotId} gefunden, Status: ${existingSlot.status}, Buchungen: ${existingSlot.bookings.length}`);

    // Prüfe ob Slot aktive Buchungen hat
    const activeBookings = existingSlot.bookings.filter(booking => 
      booking.status === 'PENDING' || booking.status === 'CONFIRMED'
    );

    if (activeBookings.length > 0) {
      console.log(`Slot ${slotId} hat ${activeBookings.length} aktive Buchungen, kann nicht gelöscht werden`);
      return NextResponse.json(
        { 
          error: 'Slot kann nicht gelöscht werden, da aktive Buchungen vorhanden sind',
          details: `Aktive Buchungen: ${activeBookings.length}`
        },
        { status: 409 }
      );
    }

    // Wenn Slot nur stornierte Buchungen hat, lösche sie zuerst
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
