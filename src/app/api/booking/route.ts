import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendBookingNotificationToAdmin } from '@/lib/email';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    
    console.log('Neue Buchungsanfrage:', validatedData);
    
    // Hole den TimeSlot aus der Datenbank
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id: validatedData.selectedSlotId }
    });
    
    if (!timeSlot) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Der gewählte Zeitslot wurde nicht gefunden' 
        },
        { status: 404 }
      );
    }
    
    // Hole oder erstelle einen Client-User
    let clientUser = await prisma.user.findUnique({
      where: { email: validatedData.clientEmail }
    });
    
    if (!clientUser) {
      clientUser = await prisma.user.create({
        data: {
          email: validatedData.clientEmail,
          name: validatedData.clientName,
          role: 'CLIENT'
        }
      });
    }
    
    // Erstelle die Buchung in der Datenbank
    const booking = await prisma.booking.create({
      data: {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        clientPhone: validatedData.clientPhone,
        message: validatedData.message,
        status: 'PENDING',
        userId: clientUser.id,
        timeSlotId: timeSlot.id,
      }
    });
    
    console.log('Buchung erfolgreich erstellt:', booking.id);
    
    // E-Mail-Benachrichtigung an Admin senden
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@dirk-messerschmidt.de';
      const selectedDate = new Date(validatedData.selectedDate);
      
      await sendBookingNotificationToAdmin(adminEmail, {
        clientName: validatedData.clientName,
        clientEmail: validatedData.clientEmail,
        clientPhone: validatedData.clientPhone,
        date: selectedDate.toLocaleDateString('de-DE'),
        time: `${timeSlot.startTime} - ${timeSlot.endTime}`,
        message: validatedData.message,
      });
      
      console.log('Admin-Benachrichtigung gesendet');
    } catch (emailError) {
      console.error('Fehler beim Senden der Admin-Benachrichtigung:', emailError);
      // E-Mail-Fehler sollten die Buchung nicht blockieren
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Terminanfrage erfolgreich gesendet',
        bookingId: booking.id
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
