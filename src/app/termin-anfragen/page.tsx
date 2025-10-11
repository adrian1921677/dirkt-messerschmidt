'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookingCalendar } from '@/components/booking-calendar';
import { TimeslotSelector } from '@/components/timeslot-selector';
import { BookingForm } from '@/components/booking-form';
import { TimeSlot, BookingFormData } from '@/types/booking';

export default function TerminanfragePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'timeslot' | 'form' | 'success'>('calendar');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Lade verfügbare Slots (Mock-Daten für Demo)
  useEffect(() => {
    const loadAvailableSlots = () => {
      // Mock-Daten für Demo-Zwecke
      const mockSlots: TimeSlot[] = [
        {
          id: 'demo1',
          date: new Date(2024, 11, 20), // 20. Dezember 2024
          startTime: '09:00',
          endTime: '10:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
        {
          id: 'demo2',
          date: new Date(2024, 11, 21), // 21. Dezember 2024
          startTime: '14:00',
          endTime: '15:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
        {
          id: 'demo3',
          date: new Date(2024, 11, 22), // 22. Dezember 2024
          startTime: '10:00',
          endTime: '11:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
      ];
      
      setAvailableSlots(mockSlots);
      setToastMessage(`${mockSlots.length} verfügbare Termine geladen`);
      setTimeout(() => setToastMessage(null), 3000);
    };

    loadAvailableSlots();
  }, []);

  const refreshAvailableSlots = () => {
    setIsRefreshing(true);
    
    // Simuliere Refresh
    setTimeout(() => {
      const mockSlots: TimeSlot[] = [
        {
          id: 'demo1',
          date: new Date(2024, 11, 20),
          startTime: '09:00',
          endTime: '10:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
        {
          id: 'demo2',
          date: new Date(2024, 11, 21),
          startTime: '14:00',
          endTime: '15:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
        {
          id: 'demo3',
          date: new Date(2024, 11, 22),
          startTime: '10:00',
          endTime: '11:00',
          status: 'PUBLISHED',
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        },
      ];
      
      setAvailableSlots(mockSlots);
      setToastMessage(`${mockSlots.length} verfügbare Termine aktualisiert`);
      setTimeout(() => setToastMessage(null), 3000);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setBookingStep('timeslot');
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setBookingStep('form');
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          selectedDate: selectedDate?.toISOString(),
          selectedSlotId: selectedSlot?.id,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setBookingStep('success');
      } else {
        console.error('Booking failed:', result.message);
        alert('Fehler beim Senden der Terminanfrage: ' + result.message);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingStep('calendar');
  };

  const getDateSlots = (date: Date) => {
    return availableSlots.filter(slot => 
      slot.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terminanfrage
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Buchen Sie Ihren Termin bei Dirk Messerschmidt. Wählen Sie einen 
            verfügbaren Tag und Zeit aus, um Ihre Anfrage zu stellen.
          </p>
          <Button 
            variant="outline" 
            onClick={refreshAvailableSlots}
            disabled={isRefreshing}
            className="mb-4"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Verfügbare Termine aktualisieren
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${
              bookingStep === 'calendar' ? 'text-blue-600' : 
              ['timeslot', 'form', 'success'].includes(bookingStep) ? 'text-green-600' : 
              'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'calendar' ? 'bg-blue-100' : 
                ['timeslot', 'form', 'success'].includes(bookingStep) ? 'bg-green-100' : 
                'bg-gray-100'
              }`}>
                <Calendar className="h-4 w-4" />
              </div>
              <span className="font-medium">Datum wählen</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['timeslot', 'form', 'success'].includes(bookingStep) ? 'bg-green-300' : 'bg-gray-300'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              bookingStep === 'timeslot' ? 'text-blue-600' : 
              ['form', 'success'].includes(bookingStep) ? 'text-green-600' : 
              'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'timeslot' ? 'bg-blue-100' : 
                ['form', 'success'].includes(bookingStep) ? 'bg-green-100' : 
                'bg-gray-100'
              }`}>
                <Clock className="h-4 w-4" />
              </div>
              <span className="font-medium">Zeit wählen</span>
            </div>
            
            <div className={`w-8 h-0.5 ${
              ['form', 'success'].includes(bookingStep) ? 'bg-green-300' : 'bg-gray-300'
            }`} />
            
            <div className={`flex items-center space-x-2 ${
              bookingStep === 'form' ? 'text-blue-600' : 
              bookingStep === 'success' ? 'text-green-600' : 
              'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                bookingStep === 'form' ? 'bg-blue-100' : 
                bookingStep === 'success' ? 'bg-green-100' : 
                'bg-gray-100'
              }`}>
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="font-medium">Daten eingeben</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          {bookingStep === 'calendar' && (
            <div className="lg:col-span-2">
              <BookingCalendar
                availableSlots={availableSlots}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            </div>
          )}

          {/* Timeslot Selection */}
          {bookingStep === 'timeslot' && selectedDate && (
            <div className="lg:col-span-2">
              <TimeslotSelector
                selectedDate={selectedDate}
                timeSlots={getDateSlots(selectedDate)}
                onSlotSelect={handleSlotSelect}
                selectedSlot={selectedSlot}
              />
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={resetBooking}>
                  Zurück zum Kalender
                </Button>
              </div>
            </div>
          )}

          {/* Booking Form */}
          {bookingStep === 'form' && selectedDate && selectedSlot && (
            <div className="lg:col-span-2">
              <BookingForm
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSubmit={handleBookingSubmit}
                isLoading={isLoading}
              />
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setBookingStep('timeslot')}>
                  Zurück zur Zeitslot-Auswahl
                </Button>
              </div>
            </div>
          )}

          {/* Success Message */}
          {bookingStep === 'success' && (
            <div className="lg:col-span-2">
              <Card className="p-8 text-center">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Terminanfrage erfolgreich gesendet!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Vielen Dank für Ihre Terminanfrage. Sie erhalten in Kürze eine 
                    Bestätigung per E-Mail.
                  </p>
                  {selectedDate && selectedSlot && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <p className="font-medium text-gray-900">
                        Gewählter Termin: {format(selectedDate, 'dd. MMMM yyyy', { locale: de })}
                      </p>
                      <p className="text-gray-600">
                        {selectedSlot.startTime} - {selectedSlot.endTime}
                      </p>
                    </div>
                  )}
                </div>
                <Button onClick={resetBooking} className="w-full sm:w-auto">
                  Neuen Termin anfragen
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Toast-Benachrichtigung */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}