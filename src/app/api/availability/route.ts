import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // "YYYY-MM"
    const tzOffsetMin = Number(searchParams.get('tz') ?? "0"); // clientseitig: new Date().getTimezoneOffset()

    if (!month) {
      return NextResponse.json({ error: 'month parameter required' }, { status: 400 });
    }

    const [y, m] = month.split("-").map(Number);
    const from = new Date(Date.UTC(y, m - 1, 1));
    const to = new Date(Date.UTC(y, m, 1));

    const [slots, bookings] = await Promise.all([
      prisma.timeSlot.findMany({ 
        where: { 
          date: { gte: from, lt: to }, 
          status: 'PUBLISHED'
        }, 
        orderBy: [
          { date: 'asc' },
          { startTime: 'asc' }
        ] 
      }),
      prisma.booking.findMany({ 
        where: { 
          timeSlot: {
            date: { gte: from, lt: to }
          },
          status: { in: ['PENDING', 'CONFIRMED'] } 
        },
        select: { 
          timeSlot: {
            select: {
              date: true,
              startTime: true,
              endTime: true
            }
          }
        } 
      }),
    ]);

    // Erstelle Set der belegten Slots
    const busy = new Set(
      bookings.map(b => `${b.timeSlot.date.toISOString()}|${b.timeSlot.startTime}|${b.timeSlot.endTime}`)
    );

    const data = slots.map(slot => {
      const key = `${slot.date.toISOString()}|${slot.startTime}|${slot.endTime}`;
      const available = !busy.has(key);
      
      // Konvertiere UTC zu lokaler Zeit
      const localMs = slot.date.getTime() - tzOffsetMin * 60_000;
      const localDateISO = new Date(localMs).toISOString();
      
      // Prüfe ob Slot in der Vergangenheit liegt
      const now = new Date();
      const isPast = slot.date < now || (slot.date.toDateString() === now.toDateString() && slot.endTime <= now.toTimeString().slice(0, 5));
      
      return {
        id: slot.id,
        dateUTC: slot.date.toISOString(),
        dateLocalISO: localDateISO,
        startTime: slot.startTime,
        endTime: slot.endTime,
        available: available && !isPast,
        isPast,
      };
    });

    return NextResponse.json({ 
      success: true,
      slots: data 
    });

  } catch (error) {
    console.error('Availability fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
