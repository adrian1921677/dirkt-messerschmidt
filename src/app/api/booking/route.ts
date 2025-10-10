import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bookingSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  message: z.string().optional(),
  dataProtection: z.boolean().refine(val => val === true),
  selectedDate: z.string(),
  selectedSlotId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validierung der Eingabedaten
    const validatedData = bookingSchema.parse(body);
    
    // Hier würde die Datenbank-Integration stattfinden
    // Für jetzt simulieren wir nur die Verarbeitung
    console.log('Neue Buchungsanfrage:', validatedData);
    
    // Simuliere Verarbeitungszeit
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hier würde eine E-Mail-Benachrichtigung an den Admin gesendet werden
    // Hier würde eine Bestätigungs-E-Mail an den Kunden gesendet werden
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Terminanfrage erfolgreich gesendet',
        bookingId: `booking_${Date.now()}` // Temporäre ID
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Booking error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ungültige Eingabedaten',
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' 
      },
      { status: 500 }
    );
  }
}
