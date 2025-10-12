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

    const { id: bookingId } = await params;

    // Prüfe ob Buchung existiert
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Buchung nicht gefunden' },
        { status: 404 }
      );
    }

    // Lösche die Buchung
    await prisma.booking.delete({
      where: { id: bookingId }
    });

    console.log(`Buchung ${bookingId} erfolgreich gelöscht`);

    return NextResponse.json({
      success: true,
      message: 'Buchung erfolgreich gelöscht'
    });

  } catch (error) {
    console.error('Fehler beim Löschen der Buchung:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Fehler beim Löschen der Buchung',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    );
  }
}
