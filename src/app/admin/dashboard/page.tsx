'use client';

import { useState, useEffect } from 'react';
import { format, addDays, subDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingCalendar } from '@/components/booking-calendar';
import Link from 'next/link';

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message?: string;
  status: 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'CANCELLED';
  createdAt: Date;
  timeSlot: {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
  };
}

interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'HIDDEN' | 'PUBLISHED' | 'BOOKED' | 'CANCELLED';
  isHoliday: boolean;
  isWeekend: boolean;
  maxBookings: number;
  currentBookings: number;
}

export default function AdminDashboard() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'bookings' | 'slots'>('calendar');

  // Mock-Daten (später durch API ersetzen)
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: '1',
        clientName: 'Max Mustermann',
        clientEmail: 'max@beispiel.de',
        clientPhone: '+49 123 456789',
        message: 'Gutachten für Immobilie benötigt',
        status: 'PENDING',
        createdAt: new Date(),
        timeSlot: {
          id: 'slot1',
          date: new Date(2024, 11, 20),
          startTime: '09:00',
          endTime: '10:00',
        },
      },
      {
        id: '2',
        clientName: 'Anna Schmidt',
        clientEmail: 'anna@beispiel.de',
        status: 'CONFIRMED',
        createdAt: new Date(),
        timeSlot: {
          id: 'slot2',
          date: new Date(2024, 11, 21),
          startTime: '14:00',
          endTime: '15:00',
        },
      },
    ];

    const mockTimeSlots: TimeSlot[] = [
      {
        id: '1',
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
        id: '2',
        date: new Date(2024, 11, 20),
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
        date: new Date(2024, 11, 21),
        startTime: '09:00',
        endTime: '10:00',
        status: 'BOOKED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 1,
      },
    ];

    setBookings(mockBookings);
    setTimeSlots(mockTimeSlots);
  }, []);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'DECLINED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertCircle className="h-4 w-4" />;
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4" />;
      case 'DECLINED':
        return <XCircle className="h-4 w-4" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleBookingAction = (bookingId: string, action: 'confirm' | 'decline') => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: action === 'confirm' ? 'CONFIRMED' : 'DECLINED' }
        : booking
    ));
  };

  const handleSlotToggle = (slotId: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === slotId 
        ? { 
            ...slot, 
            status: slot.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED' 
          }
        : slot
    ));
  };

  const pendingBookings = bookings.filter(b => b.status === 'PENDING');
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DM</span>
                </div>
                <span className="text-xl font-bold">Admin Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Einstellungen
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Offene Anfragen</p>
                <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bestätigte Termine</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedBookings.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verfügbare Slots</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeSlots.filter(s => s.status === 'PUBLISHED').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gesamt Buchungen</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calendar'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kalender verwalten
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Buchungsanfragen ({pendingBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('slots')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'slots'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Zeitslots verwalten
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Kalender verwalten</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Neue Slots erstellen
              </Button>
            </div>
            
            <BookingCalendar
              availableSlots={timeSlots}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Buchungsanfragen</h2>
            
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.clientName}
                        </h3>
                        <Badge className={getStatusColor(booking.status)}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(booking.status)}
                            <span>{booking.status}</span>
                          </span>
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p><strong>E-Mail:</strong> {booking.clientEmail}</p>
                          {booking.clientPhone && (
                            <p><strong>Telefon:</strong> {booking.clientPhone}</p>
                          )}
                        </div>
                        <div>
                          <p><strong>Termin:</strong> {format(booking.timeSlot.date, 'dd.MM.yyyy', { locale: de })}</p>
                          <p><strong>Zeit:</strong> {booking.timeSlot.startTime} - {booking.timeSlot.endTime}</p>
                        </div>
                      </div>
                      
                      {booking.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Nachricht:</strong> {booking.message}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {booking.status === 'PENDING' && (
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Bestätigen
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBookingAction(booking.id, 'decline')}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Ablehnen
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              
              {bookings.length === 0 && (
                <Card className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Keine Buchungsanfragen vorhanden</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'slots' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Zeitslots verwalten</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeSlots.map((slot) => (
                <Card key={slot.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {format(slot.date, 'dd.MM.yyyy', { locale: de })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <Badge className={getStatusColor(slot.status)}>
                      {slot.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {slot.currentBookings}/{slot.maxBookings} gebucht
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSlotToggle(slot.id)}
                    >
                      {slot.status === 'PUBLISHED' ? 'Verstecken' : 'Freigeben'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
