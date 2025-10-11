import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    const whereClause: { date?: { gte: Date; lte: Date } } = {};
    
    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      whereClause.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    const slots = await prisma.timeSlot.findMany({
      where: whereClause,
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ],
    });

    return NextResponse.json({ 
      success: true,
      slots 
    });

  } catch (error) {
    console.error('Slots fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slots } = await request.json();

    if (!slots || !Array.isArray(slots)) {
      return NextResponse.json({ error: 'Invalid slots data' }, { status: 400 });
    }

    // Slots in der Datenbank erstellen/aktualisieren
    const createdSlots = await Promise.all(
      slots.map(async (slot: { date: string; startTime: string; endTime: string; status?: string }) => {
        const slotDate = new Date(slot.date);
        const status = slot.status || 'PUBLISHED';

        return await prisma.timeSlot.upsert({
          where: { 
            date_startTime: { 
              date: slotDate, 
              startTime: slot.startTime
            }
          },
          update: { 
            status: status as 'HIDDEN' | 'PUBLISHED' | 'BOOKED' | 'CANCELLED',
            endTime: slot.endTime,
          },
          create: {
            date: slotDate,
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: status as 'HIDDEN' | 'PUBLISHED' | 'BOOKED' | 'CANCELLED',
            managerId: session.user.id,
          },
        });
      })
    );

    return NextResponse.json({ 
      success: true, 
      message: `${createdSlots.length} Slots erfolgreich erstellt/aktualisiert`,
      slots: createdSlots
    });

  } catch (error) {
    console.error('Slot creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authentifizierung prüfen
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateISO = searchParams.get('dateISO');
    const startTime = searchParams.get('startTime');

    if (!dateISO || !startTime) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const slotDate = new Date(dateISO);

    await prisma.timeSlot.delete({
      where: { 
        date_startTime: { 
          date: slotDate, 
          startTime: startTime
        }
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Slot deletion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}