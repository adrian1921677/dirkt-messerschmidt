import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Lade alle Buchungen aus der Datenbank (alle Status)
    const bookings = await prisma.booking.findMany({
      include: {
        timeSlot: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
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
        status: booking.timeSlot.status,
      },
    }));

    return NextResponse.json({ bookings: formattedBookings });
    
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Buchungen' },
      { status: 500 }
    );
  }
}
