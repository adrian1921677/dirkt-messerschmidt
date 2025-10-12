'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
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
  Mail,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingCalendar } from '@/components/booking-calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  const { data: session, status } = useSession();
  const router = useRouter();
  // const [currentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [transparentBookings, setTransparentBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'calendar' | 'bookings' | 'slots' | 'transparent'>('calendar');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [emailAction, setEmailAction] = useState<'confirm' | 'decline'>('confirm');
  const [declineReason, setDeclineReason] = useState('');
  const [showForceDeleteModal, setShowForceDeleteModal] = useState(false);
  const [slotToForceDelete, setSlotToForceDelete] = useState<TimeSlot | null>(null);
  const [activeBookingsCount, setActiveBookingsCount] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Prüfe Authentifizierung
  useEffect(() => {
    if (status === 'loading') return; // Warte auf Session-Loading
    
    if (!session || (session.user as { role?: string })?.role !== 'ADMIN') {
      router.push('/admin/login');
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  // Lade echte Daten aus der Datenbank
  useEffect(() => {
    const loadData = async () => {
      try {
        // Lade Buchungen (ohne Cache)
        const bookingsResponse = await fetch('/api/admin/bookings', { cache: 'no-store' });
        const bookingsData = await bookingsResponse.json();
        
        if (bookingsData.bookings) {
          const parsedBookings = bookingsData.bookings.map((booking: {
            id: string;
            clientName: string;
            clientEmail: string;
            clientPhone?: string;
            message?: string;
            status: string;
            createdAt: string;
            timeSlot: {
              id: string;
              date: string;
              startTime: string;
              endTime: string;
            };
          }) => ({
            id: booking.id,
            clientName: booking.clientName,
            clientEmail: booking.clientEmail,
            clientPhone: booking.clientPhone,
            message: booking.message,
            status: booking.status,
            createdAt: new Date(booking.createdAt),
            timeSlot: {
              id: booking.timeSlot.id,
              date: new Date(booking.timeSlot.date),
              startTime: booking.timeSlot.startTime,
              endTime: booking.timeSlot.endTime,
            },
          }));
          setBookings(parsedBookings);
        }

        // Lade Slots für den aktuellen Monat (ohne Cache)
        const currentDate = new Date();
        const slotsResponse = await fetch(`/api/admin/slots?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`, { cache: 'no-store' });
        const slotsData = await slotsResponse.json();
        
        if (slotsData.success && slotsData.slots) {
          const parsedSlots = slotsData.slots.map((slot: { id: string; date: string; startTime: string; endTime: string; status: string; createdAt: string; updatedAt: string }) => ({
            id: slot.id,
            date: new Date(slot.date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: slot.status,
            isHoliday: false,
            isWeekend: false,
            maxBookings: 1,
            currentBookings: 0,
          }));
          setTimeSlots(parsedSlots);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    };

    loadData();
  }, []);


  // Loading-Anzeige während Session-Check
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Wird geladen...</p>
        </div>
      </div>
    );
  }

  // const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  // const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  // const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

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

  const handleBookingAction = async (bookingId: string, action: 'confirm' | 'decline') => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setSelectedBooking(booking);
    setEmailAction(action);
    setShowEmailModal(true);
  };

  const sendEmailAndUpdateBooking = async () => {
    if (!selectedBooking) return;

    try {
      // Buchung-Status in der Datenbank aktualisieren
      const updateResponse = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking.id,
          action: emailAction
        })
      });

      if (updateResponse.ok) {
        // Lokalen State aktualisieren
        setBookings(prev => prev.map(booking => 
          booking.id === selectedBooking.id 
            ? { ...booking, status: emailAction === 'confirm' ? 'CONFIRMED' : 'DECLINED' }
            : booking
        ));
        
        // E-Mail-Vorlage öffnen
        const emailSubject = emailAction === 'confirm' 
          ? 'Terminbestätigung - Dirk Messerschmidt'
          : 'Terminabsage - Dirk Messerschmidt';
        
        const emailBody = emailAction === 'confirm'
          ? `Sehr geehrte/r ${selectedBooking.clientName},\n\nvielen Dank für Ihre Terminanfrage. Ich bestätige Ihnen gerne folgenden Termin:\n\nDatum: ${new Date(selectedBooking.timeSlot.date).toLocaleDateString('de-DE')}\nUhrzeit: ${selectedBooking.timeSlot.startTime} - ${selectedBooking.timeSlot.endTime}\n\nBitte seien Sie pünktlich zum vereinbarten Termin.\n\nMit freundlichen Grüßen\nDirk Messerschmidt\nSachverständiger\n\nTel: 0202 / 423 110\nAdresse: Alt-Wolfshahn 12, 42117 Wuppertal`
          : `Sehr geehrte/r ${selectedBooking.clientName},\n\nvielen Dank für Ihre Terminanfrage. Leider muss ich Ihnen mitteilen, dass der gewünschte Termin nicht verfügbar ist.\n\n${declineReason ? `Grund: ${declineReason}\n\n` : ''}Bitte kontaktieren Sie mich telefonisch unter 0202 / 423 110, um einen alternativen Termin zu vereinbaren.\n\nMit freundlichen Grüßen\nDirk Messerschmidt\nSachverständiger\n\nTel: 0202 / 423 110\nAdresse: Alt-Wolfshahn 12, 42117 Wuppertal`;
        
        // mailto: Link öffnen
        const mailtoLink = `mailto:${selectedBooking.clientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
        
        setShowEmailModal(false);
        setSelectedBooking(null);
        setDeclineReason('');
      } else {
        alert('Fehler beim Aktualisieren der Buchung');
      }
    } catch (error) {
      console.error('Update-Fehler:', error);
      alert('Fehler beim Aktualisieren der Buchung');
    }
  };

  const refreshBookings = async () => {
    try {
      // Lade Buchungen (ohne Cache)
      const response = await fetch('/api/admin/bookings', { cache: 'no-store' });
      const data = await response.json();
      
      if (data.bookings) {
        const parsedBookings = data.bookings.map((booking: {
          id: string;
          clientName: string;
          clientEmail: string;
          clientPhone?: string;
          message?: string;
          status: string;
          createdAt: string;
          timeSlot: {
            id: string;
            date: string;
            startTime: string;
            endTime: string;
          };
        }) => ({
          id: booking.id,
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          clientPhone: booking.clientPhone,
          message: booking.message,
          status: booking.status,
          createdAt: new Date(booking.createdAt),
          timeSlot: {
            id: booking.timeSlot.id,
            date: new Date(booking.timeSlot.date),
            startTime: booking.timeSlot.startTime,
            endTime: booking.timeSlot.endTime,
          },
        }));
        setBookings(parsedBookings);
        console.log(`${parsedBookings.length} Buchungen aus der Datenbank geladen!`);
      } else {
        console.log('Keine Buchungen in der Datenbank gefunden');
      }
    } catch (error) {
      console.error('Fehler beim Laden der Buchungen:', error);
    }
  };

  const handleSlotToggle = async (slotId: string) => {
    try {
      const slot = timeSlots.find(s => s.id === slotId);
      if (!slot) return;

      const newStatus = slot.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED';
      
      const response = await fetch(`/api/admin/slots/${slotId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedSlots = timeSlots.map(s => 
          s.id === slotId 
            ? { ...s, status: newStatus as 'PUBLISHED' | 'HIDDEN' | 'BOOKED' | 'CANCELLED' }
            : s
        );
        
        setTimeSlots(updatedSlots);
      } else {
        const errorData = await response.json();
        alert(`Fehler: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Fehler beim Umschalten des Slots:', error);
      alert('Fehler beim Umschalten des Slots');
    }
  };

  const handleEditSlot = (slot: TimeSlot) => {
    // TODO: Implementiere Slot-Bearbeitung
    alert(`Slot bearbeiten: ${format(slot.date, 'dd.MM.yyyy')} ${slot.startTime}-${slot.endTime}`);
  };

  const handleHideSlot = async (slotId: string) => {
    try {
      const response = await fetch(`/api/admin/slots/${slotId}/hide`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const updatedSlots = timeSlots.map(slot => 
          slot.id === slotId 
            ? { ...slot, status: 'HIDDEN' as const }
            : slot
        );
        setTimeSlots(updatedSlots);
        alert('Slot erfolgreich versteckt');
      } else {
        const errorData = await response.json();
        console.error('API Fehler:', errorData);
        alert(`Fehler: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Fehler beim Verstecken des Slots:', error);
      alert('Fehler beim Verstecken des Slots');
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      const response = await fetch(`/api/admin/slots/${slotId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const updatedSlots = timeSlots.filter(slot => slot.id !== slotId);
        setTimeSlots(updatedSlots);
        alert('Slot erfolgreich gelöscht');
      } else {
        const errorData = await response.json();
        console.error('API Fehler:', errorData);
        
        if (response.status === 409 && errorData.canForce) {
          // Zeige Force-Delete Dialog
          const slot = timeSlots.find(s => s.id === slotId);
          if (slot) {
            setSlotToForceDelete(slot);
            setActiveBookingsCount(errorData.details.active);
            setShowForceDeleteModal(true);
          }
        } else {
          alert(`Fehler: ${errorData.error}`);
        }
      }
    } catch (error) {
      console.error('Fehler beim Löschen des Slots:', error);
      alert('Fehler beim Löschen des Slots');
    }
  };

  const handleForceDeleteSlot = async () => {
    if (!slotToForceDelete) return;

    try {
      const response = await fetch(`/api/admin/slots/${slotToForceDelete.id}?force=true`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        const updatedSlots = timeSlots.filter(slot => slot.id !== slotToForceDelete.id);
        setTimeSlots(updatedSlots);
        
        // Öffne mailto: Links für Stornierungs-E-Mails
        if (data.mailtoLinks && data.mailtoLinks.length > 0) {
          for (const link of data.mailtoLinks) {
            window.open(link.mailtoLink);
            // Kleine Verzögerung zwischen den E-Mails
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        alert(`Slot erfolgreich gelöscht (${activeBookingsCount} Buchungen storniert)`);
      } else {
        const errorData = await response.json();
        console.error('API Fehler:', errorData);
        alert(`Fehler: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Fehler beim Force-Löschen des Slots:', error);
      alert('Fehler beim Force-Löschen des Slots');
    } finally {
      setShowForceDeleteModal(false);
      setSlotToForceDelete(null);
      setActiveBookingsCount(0);
    }
  };

  // Hilfsfunktion: Slots nach Datum gruppieren
  const groupSlotsByDate = (slots: TimeSlot[]) => {
    const grouped: { [key: string]: TimeSlot[] } = {};
    
    slots.forEach(slot => {
      const dateKey = format(slot.date, 'yyyy-MM-dd');
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(slot);
    });
    
    // Sortiere Slots innerhalb eines Tages nach Startzeit
    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });
    
    return grouped;
  };

  // Alle Slots eines Tages umschalten
  const handleToggleAllSlotsForDate = async (date: string, slots: TimeSlot[]) => {
    try {
      const allPublished = slots.every(slot => slot.status === 'PUBLISHED');
      const newStatus = allPublished ? 'HIDDEN' : 'PUBLISHED';
      
      let successCount = 0;
      let errorCount = 0;

      // Aktualisiere jeden Slot einzeln über die API
      for (const slot of slots) {
        try {
          const response = await fetch(`/api/admin/slots/${slot.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        // Aktualisiere lokalen State
        const updatedSlots = timeSlots.map(slot => {
          const slotDate = format(slot.date, 'yyyy-MM-dd');
          if (slotDate === date) {
            return { ...slot, status: newStatus as 'PUBLISHED' | 'HIDDEN' | 'BOOKED' | 'CANCELLED' };
          }
          return slot;
        });
        
        setTimeSlots(updatedSlots);
      }

      if (errorCount > 0) {
        alert(`${successCount} Slots aktualisiert, ${errorCount} Fehler aufgetreten`);
      } else {
        alert(`${successCount} Slots erfolgreich aktualisiert`);
      }
    } catch (error) {
      console.error('Fehler beim Umschalten der Slots:', error);
      alert('Fehler beim Umschalten der Slots');
    }
  };

  // Alle Slots eines Tages löschen
  const handleDeleteAllSlotsForDate = async (date: string, slots: TimeSlot[]) => {
    if (confirm(`Möchten Sie alle ${slots.length} Slots für ${format(new Date(date), 'dd.MM.yyyy')} wirklich löschen?`)) {
      try {
        let deletedCount = 0;
        let errorCount = 0;

        // Lösche jeden Slot einzeln über die API
        for (const slot of slots) {
          try {
            console.log(`Lösche Slot ${slot.id}...`);
            const response = await fetch(`/api/admin/slots/${slot.id}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
              deletedCount++;
              console.log(`Slot ${slot.id} erfolgreich gelöscht`);
            } else {
              const errorData = await response.json();
              console.error(`Fehler beim Löschen von Slot ${slot.id}:`, errorData);
              errorCount++;
            }
          } catch (error) {
            console.error(`Fehler beim Löschen von Slot ${slot.id}:`, error);
            errorCount++;
          }
        }

        if (deletedCount > 0) {
          // Aktualisiere lokalen State
          const updatedSlots = timeSlots.filter(slot => {
            const slotDate = format(slot.date, 'yyyy-MM-dd');
            return slotDate !== date;
          });
          setTimeSlots(updatedSlots);
        }

        if (errorCount > 0) {
          alert(`${deletedCount} Slots gelöscht, ${errorCount} Fehler aufgetreten`);
        } else {
          alert(`${deletedCount} Slots erfolgreich gelöscht`);
        }
      } catch (error) {
        console.error('Fehler beim Löschen der Slots:', error);
        alert('Fehler beim Löschen der Slots');
      }
    }
  };

  const refreshSlots = async () => {
    try {
      // Lade Slots für den aktuellen Monat (ohne Cache)
      const currentDate = new Date();
      const response = await fetch(`/api/admin/slots?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`, { cache: 'no-store' });
      const data = await response.json();
      
      if (data.success && data.slots) {
        const parsedSlots = data.slots.map((slot: { id: string; date: string; startTime: string; endTime: string; status: string; createdAt: string; updatedAt: string }) => ({
          id: slot.id,
          date: new Date(slot.date),
          startTime: slot.startTime,
          endTime: slot.endTime,
          status: slot.status,
          isHoliday: false,
          isWeekend: false,
          maxBookings: 1,
          currentBookings: 0,
        }));
        setTimeSlots(parsedSlots);
        console.log(`${parsedSlots.length} Slots aus der Datenbank geladen!`);
      } else {
        console.log('Keine Slots in der Datenbank gefunden');
      }
    } catch (error) {
      console.error('Fehler beim Laden der Slots:', error);
      // Fehler beim Laden - stille Behandlung ohne Popup
    }
  };

  const refreshTransparentBookings = async () => {
    try {
      // Lade alle Buchungen (ohne Cache)
      const response = await fetch('/api/admin/all-bookings', { cache: 'no-store' });
      const data = await response.json();
      
      if (data.bookings) {
        const parsedBookings = data.bookings.map((booking: {
          id: string;
          clientName: string;
          clientEmail: string;
          clientPhone?: string;
          message?: string;
          status: string;
          createdAt: string;
          timeSlot: {
            id: string;
            date: string;
            startTime: string;
            endTime: string;
            status: string;
          };
        }) => ({
          id: booking.id,
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          clientPhone: booking.clientPhone,
          message: booking.message,
          status: booking.status,
          createdAt: new Date(booking.createdAt),
          timeSlot: {
            id: booking.timeSlot.id,
            date: new Date(booking.timeSlot.date),
            startTime: booking.timeSlot.startTime,
            endTime: booking.timeSlot.endTime,
          },
        }));
        setTransparentBookings(parsedBookings);
        console.log(`${parsedBookings.length} transparente Buchungen aus der Datenbank geladen!`);
      } else {
        console.log('Keine transparenten Buchungen in der Datenbank gefunden');
      }
    } catch (error) {
      console.error('Fehler beim Laden der transparenten Buchungen:', error);
    }
  };

  const handleCancelBooking = (booking: Booking) => {
    setBookingToCancel(booking);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    if (!bookingToCancel) return;

    const subject = 'Terminabsage - Dirk Messerschmidt';
    const body = `Sehr geehrte/r ${bookingToCancel.clientName},

leider muss ich Ihnen mitteilen, dass Ihr gebuchter Termin storniert werden muss.

Stornierter Termin:
- Datum: ${format(bookingToCancel.timeSlot.date, 'dd.MM.yyyy', { locale: de })}
- Uhrzeit: ${bookingToCancel.timeSlot.startTime} - ${bookingToCancel.timeSlot.endTime}
- Grund: ${cancelReason || 'Termin wurde vom Administrator storniert'}

Bitte kontaktieren Sie mich telefonisch unter 0202 / 423 110, um einen neuen Termin zu vereinbaren.

Ich entschuldige mich für die Unannehmlichkeiten.

Mit freundlichen Grüßen
Dirk Messerschmidt
Sachverständiger

Tel: 0202 / 423 110
Adresse: Alt-Wolfshahn 12, 42117 Wuppertal`;

    const mailtoLink = `mailto:${bookingToCancel.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    // Lösche die Buchung aus der Datenbank
    try {
      const response = await fetch(`/api/admin/bookings/${bookingToCancel.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        // Aktualisiere die lokalen Listen
        setTransparentBookings(prev => prev.filter(booking => booking.id !== bookingToCancel.id));
        setBookings(prev => prev.filter(booking => booking.id !== bookingToCancel.id));
        console.log(`Buchung ${bookingToCancel.id} erfolgreich gelöscht`);
      } else {
        const errorData = await response.json();
        console.error('Fehler beim Löschen der Buchung:', errorData);
        alert('E-Mail geöffnet, aber Fehler beim Löschen der Buchung aus der Datenbank');
      }
    } catch (error) {
      console.error('Fehler beim Löschen der Buchung:', error);
      alert('E-Mail geöffnet, aber Fehler beim Löschen der Buchung aus der Datenbank');
    }
    
    setShowCancelModal(false);
    setBookingToCancel(null);
    setCancelReason('');
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
              <span className="text-sm text-gray-600">
                Angemeldet als: {session?.user?.name || session?.user?.email}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Einstellungen
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
              <button
                onClick={() => {
                  setActiveTab('transparent');
                  refreshTransparentBookings();
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transparent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Termine ({transparentBookings.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Kalender verwalten</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={refreshSlots}>
                  <Clock className="h-4 w-4 mr-2" />
                  Aktualisieren
                </Button>
                <Button asChild>
                  <Link href="/admin/create-slots">
                    <Plus className="h-4 w-4 mr-2" />
                    Neue Slots erstellen
                  </Link>
                </Button>
              </div>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Buchungsanfragen</h2>
              <Button variant="outline" onClick={refreshBookings}>
                <Clock className="h-4 w-4 mr-2" />
                Aktualisieren
              </Button>
            </div>
            
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Zeitslots verwalten</h2>
              <Button variant="outline" onClick={refreshSlots}>
                <Clock className="h-4 w-4 mr-2" />
                Aktualisieren
              </Button>
            </div>
            
            <div className="space-y-6">
              {Object.entries(groupSlotsByDate(timeSlots)).map(([date, slots]) => (
                <Card key={date} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {format(new Date(date), 'EEEE, dd. MMMM yyyy', { locale: de })}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {slots.length} Termin{slots.length !== 1 ? 'e' : ''} verfügbar
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleAllSlotsForDate(date, slots)}
                        className="text-xs"
                      >
                        {slots.every(slot => slot.status === 'PUBLISHED') ? 'Alle verstecken' : 'Alle freigeben'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAllSlotsForDate(date, slots)}
                        className="text-xs border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Alle löschen
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slots.map((slot) => (
                      <div key={slot.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {slot.startTime} - {slot.endTime}
                            </p>
                            <p className="text-xs text-gray-500">
                              {slot.currentBookings}/{slot.maxBookings} gebucht
                            </p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(slot.status)}`}>
                            {slot.status}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSlotToggle(slot.id)}
                            className="text-xs px-2 py-1 h-7"
                          >
                            {slot.status === 'PUBLISHED' ? 'Verstecken' : 'Freigeben'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleHideSlot(slot.id)}
                            className="text-xs px-2 py-1 h-7 border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                            disabled={slot.status === 'HIDDEN'}
                          >
                            {slot.status === 'HIDDEN' ? 'Versteckt' : 'Verstecken'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSlot(slot)}
                            className="text-xs px-2 py-1 h-7 border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-xs px-2 py-1 h-7 border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Force-Delete Modal */}
        <Dialog open={showForceDeleteModal} onOpenChange={setShowForceDeleteModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Slot erzwingend löschen</DialogTitle>
              <DialogDescription>
                Dieser Slot hat {activeBookingsCount} aktive Buchung{activeBookingsCount !== 1 ? 'en' : ''}. 
                Beim erzwingenden Löschen werden alle aktiven Buchungen storniert und der Slot gelöscht.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {slotToForceDelete && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Slot: {format(slotToForceDelete.date, 'dd.MM.yyyy', { locale: de })} um {slotToForceDelete.startTime} - {slotToForceDelete.endTime}
                  </p>
                  <p className="text-sm text-red-600">
                    ⚠️ {activeBookingsCount} Buchung{activeBookingsCount !== 1 ? 'en' : ''} wird{activeBookingsCount !== 1 ? 'en' : ''} storniert
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForceDeleteModal(false);
                  setSlotToForceDelete(null);
                  setActiveBookingsCount(0);
                }}
              >
                Abbrechen
              </Button>
              <Button
                onClick={handleForceDeleteSlot}
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Erzwingen & Löschen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* E-Mail Modal */}
        {showEmailModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                {emailAction === 'confirm' ? 'Termin bestätigen' : 'Termin ablehnen'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Kunde:</strong> {selectedBooking.clientName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>E-Mail:</strong> {selectedBooking.clientEmail}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Termin:</strong> {format(selectedBooking.timeSlot.date, 'dd.MM.yyyy', { locale: de })} um {selectedBooking.timeSlot.startTime}
                  </p>
                </div>

                {emailAction === 'decline' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grund für die Absage:
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      placeholder="z.B. betriebliche Gründe, Krankheit, Überschneidung im Terminplan"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEmailModal(false);
                      setSelectedBooking(null);
                      setDeclineReason('');
                    }}
                  >
                    Abbrechen
                  </Button>
                  <Button
                    onClick={sendEmailAndUpdateBooking}
                    className={emailAction === 'confirm' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {emailAction === 'confirm' ? 'Bestätigen & E-Mail öffnen' : 'Ablehnen & E-Mail öffnen'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transparent' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Termine (Alle Buchungen)</h2>
              <Button variant="outline" onClick={refreshTransparentBookings}>
                <Clock className="h-4 w-4 mr-2" />
                Aktualisieren
              </Button>
            </div>
            
            <div className="space-y-4">
              {transparentBookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{booking.clientName}</p>
                      <p className="text-sm text-gray-600">{booking.clientEmail}</p>
                      {booking.clientPhone && (
                        <p className="text-sm text-gray-600">{booking.clientPhone}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        Termin: {format(booking.timeSlot.date, 'dd.MM.yyyy', { locale: de })} um {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                      </p>
                      {booking.message && (
                        <p className="text-sm text-gray-700 mt-2">
                          Nachricht: {booking.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Anfrage vom: {format(booking.createdAt, 'dd.MM.yyyy HH:mm', { locale: de })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Slot: {booking.timeSlot.id.slice(-8)}
                      </Badge>
                      {booking.status === 'PENDING' || booking.status === 'CONFIRMED' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelBooking(booking)}
                          className="text-xs px-2 py-1 h-7 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Stornieren
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}
              
              {transparentBookings.length === 0 && (
                <Card className="p-8 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Keine Buchungen vorhanden</p>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Stornierungs-Modal */}
        <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Termin stornieren</DialogTitle>
              <DialogDescription>
                Geben Sie einen Grund für die Stornierung ein. Dieser wird in der E-Mail an den Kunden verwendet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {bookingToCancel && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Kunde: {bookingToCancel.clientName}</p>
                  <p className="text-sm text-gray-600">E-Mail: {bookingToCancel.clientEmail}</p>
                  <p className="text-sm text-gray-600">
                    Termin: {format(bookingToCancel.timeSlot.date, 'dd.MM.yyyy', { locale: de })} um {bookingToCancel.timeSlot.startTime} - {bookingToCancel.timeSlot.endTime}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="cancelReason">Grund für die Stornierung</Label>
                <Textarea
                  id="cancelReason"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="z.B. Krankheit, betriebliche Gründe, Überschneidung im Terminplan, technische Probleme..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelModal(false);
                  setBookingToCancel(null);
                  setCancelReason('');
                }}
              >
                Abbrechen
              </Button>
              <Button
                onClick={confirmCancelBooking}
                className="bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Stornieren & E-Mail öffnen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
