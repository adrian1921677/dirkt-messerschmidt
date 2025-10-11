import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    // Prüfe ob Slot existiert
    const existingSlot = await prisma.timeSlot.findUnique({
      where: { id: slotId }
    });

    if (!existingSlot) {
      console.log(`Slot ${slotId} nicht gefunden`);
      return NextResponse.json(
        { error: 'Slot nicht gefunden' },
        { status: 404 }
      );
    }

    // Soft-Delete: Slot verstecken (isOpen = false)
    const updatedSlot = await prisma.timeSlot.update({
      where: { id: slotId },
      data: { isOpen: false },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
        isOpen: true,
        maxBookings: true,
        currentBookings: true
      }
    });

    console.log(`Slot ${slotId} erfolgreich versteckt (isOpen = false)`);

    return NextResponse.json({
      success: true,
      message: 'Slot erfolgreich versteckt',
      slot: updatedSlot
    });

  } catch (error) {
    console.error('Fehler beim Verstecken des Slots:', error);
    
    // Detaillierte Fehlerbehandlung
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Fehler beim Verstecken des Slots',
        details: error instanceof Error ? error.message : 'Unbekannter Fehler'
      },
      { status: 500 }
    );
  }
}
