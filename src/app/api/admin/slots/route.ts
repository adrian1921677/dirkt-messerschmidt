import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createSlotSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  maxBookings: z.number().min(1).max(10).default(1),
});

const updateSlotSchema = z.object({
  slotId: z.string(),
  status: z.enum(['HIDDEN', 'PUBLISHED', 'CANCELLED']),
});

export async function GET(request: NextRequest) {
  try {
    // Hier würde die Datenbankabfrage stattfinden
    // Für jetzt simulieren wir die Daten
    
    const mockSlots = [
      {
        id: '1',
        date: new Date(2024, 11, 20).toISOString(),
        startTime: '09:00',
        endTime: '10:00',
        status: 'PUBLISHED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: '2',
        date: new Date(2024, 11, 20).toISOString(),
        startTime: '10:30',
        endTime: '11:30',
        status: 'PUBLISHED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: '3',
        date: new Date(2024, 11, 21).toISOString(),
        startTime: '09:00',
        endTime: '10:00',
        status: 'BOOKED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 1,
      },
    ];

    return NextResponse.json({ slots: mockSlots });
    
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Zeitslots' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, startTime, endTime, maxBookings } = createSlotSchema.parse(body);
    
    // Hier würde die Datenbankerstellung stattfinden
    console.log('Creating new slot:', { date, startTime, endTime, maxBookings });
    
    // Simuliere Verarbeitung
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newSlot = {
      id: `slot_${Date.now()}`,
      date,
      startTime,
      endTime,
      status: 'PUBLISHED',
      isHoliday: false,
      isWeekend: false,
      maxBookings,
      currentBookings: 0,
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Zeitslot erfolgreich erstellt',
      slot: newSlot
    });
    
  } catch (error) {
    console.error('Error creating slot:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Zeitslots' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { slotId, status } = updateSlotSchema.parse(body);
    
    // Hier würde die Datenbankaktualisierung stattfinden
    console.log(`Updating slot ${slotId} to status: ${status}`);
    
    // Simuliere Verarbeitung
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: `Zeitslot ${status === 'PUBLISHED' ? 'freigegeben' : status === 'HIDDEN' ? 'versteckt' : 'storniert'}` 
    });
    
  } catch (error) {
    console.error('Error updating slot:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Ungültige Eingabedaten', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Zeitslots' },
      { status: 500 }
    );
  }
}
