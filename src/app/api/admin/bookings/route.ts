import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const updateBookingSchema = z.object({
  bookingId: z.string(),
  action: z.enum(['confirm', 'decline', 'cancel']),
});

export async function GET() {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Lade alle Buchungen aus der Datenbank
    const bookings = await prisma.booking.findMany({
      include: {
        timeSlot: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Konvertiere die Daten für das Frontend
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      clientName: booking.clientName,
      clientEmail: booking.clientEmail,
      clientPhone: booking.clientPhone,
      message: booking.message,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      timeSlot: {
        id: booking.timeSlot.id,
        date: booking.timeSlot.date.toISOString(),
        startTime: booking.timeSlot.startTime,
        endTime: booking.timeSlot.endTime,
      },
    }));

    return NextResponse.json({ bookings: formattedBookings });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Buchungen' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId, action } = updateBookingSchema.parse(body);
    
    // Bestimme den neuen Status basierend auf der Aktion
    let newStatus: 'CONFIRMED' | 'DECLINED' | 'CANCELLED';
    switch (action) {
      case 'confirm':
        newStatus = 'CONFIRMED';
        break;
      case 'decline':
        newStatus = 'DECLINED';
        break;
      case 'cancel':
        newStatus = 'CANCELLED';
        break;
    }
    
    // Aktualisiere die Buchung in der Datenbank
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
      include: {
        timeSlot: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
          }
        }
      }
    });
    
    console.log(`Booking ${bookingId} updated to status: ${newStatus}`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Buchung ${action === 'confirm' ? 'bestätigt' : action === 'decline' ? 'abgelehnt' : 'storniert'}`,
      booking: updatedBooking
    });
    
  } catch (error) {
    console.error('Error updating booking:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Buchung' },
      { status: 500 }
    );
  }
}