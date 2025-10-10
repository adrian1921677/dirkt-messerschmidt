import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateBookingSchema = z.object({
  bookingId: z.string(),
  action: z.enum(['confirm', 'decline', 'cancel']),
});

const createSlotSchema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  maxBookings: z.number().min(1).max(10),
});

export async function GET(request: NextRequest) {
  try {
    // Hier würde die Datenbankabfrage stattfinden
    // Für jetzt simulieren wir die Daten
    
    const mockBookings = [
      {
        id: '1',
        clientName: 'Max Mustermann',
        clientEmail: 'max@beispiel.de',
        clientPhone: '+49 123 456789',
        message: 'Gutachten für Immobilie benötigt',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        timeSlot: {
          id: 'slot1',
          date: new Date(2024, 11, 20).toISOString(),
          startTime: '09:00',
          endTime: '10:00',
        },
      },
      {
        id: '2',
        clientName: 'Anna Schmidt',
        clientEmail: 'anna@beispiel.de',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        timeSlot: {
          id: 'slot2',
          date: new Date(2024, 11, 21).toISOString(),
          startTime: '14:00',
          endTime: '15:00',
        },
      },
    ];

    return NextResponse.json({ bookings: mockBookings });
    
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
    const body = await request.json();
    const { bookingId, action } = updateBookingSchema.parse(body);
    
    // Hier würde die Datenbankaktualisierung stattfinden
    console.log(`Updating booking ${bookingId} with action: ${action}`);
    
    // Simuliere Verarbeitung
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ 
      success: true, 
      message: `Buchung ${action === 'confirm' ? 'bestätigt' : action === 'decline' ? 'abgelehnt' : 'storniert'}` 
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
