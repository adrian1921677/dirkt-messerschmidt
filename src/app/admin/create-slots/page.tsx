'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  Plus, 
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  maxBookings: number;
}

export default function CreateSlotsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      date: selectedDate,
      startTime: '09:00',
      endTime: '10:00',
      maxBookings: 1
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const updateTimeSlot = (id: string, field: keyof TimeSlot, value: string | number | boolean) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handleCreateSlots = async () => {
    setIsCreating(true);
    
    try {
      // Speichere Slots in der echten Datenbank
      const response = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slots: timeSlots.map(slot => ({
            date: slot.date.toISOString().split('T')[0] + 'T00:00:00.000Z', // Tages-UTC
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: 'PUBLISHED',
          }))
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`${result.message}`);
        router.push('/admin/dashboard');
      } else {
        console.error('Fehler beim Erstellen der Slots:', result.error);
      }
    } catch (error) {
      console.error('Fehler beim Erstellen der Slots:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const startTime = 9; // 9:00 Uhr
    const endTime = 17; // 17:00 Uhr
    // const slotDuration = 60; // 60 Minuten

    for (let hour = startTime; hour < endTime; hour++) {
      const startHour = hour.toString().padStart(2, '0');
      const endHour = (hour + 1).toString().padStart(2, '0');
      
      slots.push({
        id: `generated-${hour}`,
        date: selectedDate,
        startTime: `${startHour}:00`,
        endTime: `${endHour}:00`,
        maxBookings: 1
      });
    }

    setTimeSlots(slots);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
                <span>Zurück zum Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Angemeldet als: {session?.user?.name || session?.user?.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Neue Zeitslots erstellen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Datum auswählen */}
              <div className="space-y-2">
                <Label htmlFor="date">Datum auswählen</Label>
                <Input
                  id="date"
                  type="date"
                  value={format(selectedDate, 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="max-w-xs"
                />
                <p className="text-sm text-gray-600">
                  Ausgewähltes Datum: {format(selectedDate, 'EEEE, dd. MMMM yyyy', { locale: de })}
                </p>
              </div>

              {/* Schnell-Erstellung */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Schnell-Erstellung</h3>
                    <p className="text-sm text-gray-600">
                      Erstelle automatisch Slots von 9:00 bis 17:00 Uhr
                    </p>
                  </div>
                  <Button onClick={generateTimeSlots} variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Alle Slots generieren
                  </Button>
                </div>
              </div>

              {/* Manuelle Slots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Manuelle Slots</h3>
                  <Button onClick={addTimeSlot}>
                    <Plus className="h-4 w-4 mr-2" />
                    Slot hinzufügen
                  </Button>
                </div>

                {timeSlots.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Noch keine Slots erstellt</p>
                    <Button onClick={addTimeSlot}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ersten Slot hinzufügen
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <Card key={slot.id} className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`start-${slot.id}`}>Startzeit</Label>
                              <Input
                                id={`start-${slot.id}`}
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(slot.id, 'startTime', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`end-${slot.id}`}>Endzeit</Label>
                              <Input
                                id={`end-${slot.id}`}
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(slot.id, 'endTime', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`max-${slot.id}`}>Max. Buchungen</Label>
                              <Input
                                id={`max-${slot.id}`}
                                type="number"
                                min="1"
                                value={slot.maxBookings}
                                onChange={(e) => updateTimeSlot(slot.id, 'maxBookings', parseInt(e.target.value))}
                              />
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeTimeSlot(slot.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Aktionen */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Abbrechen
                </Button>
                <Button
                  onClick={handleCreateSlots}
                  disabled={timeSlots.length === 0 || isCreating}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isCreating ? 'Erstelle...' : `${timeSlots.length} Slots erstellen`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
