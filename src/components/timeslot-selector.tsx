'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Clock, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimeSlot } from '@/types/booking';

interface TimeslotSelectorProps {
  selectedDate: Date;
  timeSlots: TimeSlot[];
  onSlotSelect?: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
  disabled?: boolean;
}

export function TimeslotSelector({ 
  selectedDate, 
  timeSlots, 
  onSlotSelect, 
  selectedSlot,
  disabled = false 
}: TimeslotSelectorProps) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const availableSlots = timeSlots.filter(slot => 
    slot.status === 'PUBLISHED' && 
    slot.currentBookings < slot.maxBookings
  );

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const getSlotStatus = (slot: TimeSlot) => {
    if (slot.status === 'BOOKED') return 'booked';
    if (slot.status === 'CANCELLED') return 'cancelled';
    if (slot.currentBookings >= slot.maxBookings) return 'full';
    return 'available';
  };

  const getSlotClasses = (slot: TimeSlot) => {
    const baseClasses = "w-full p-3 rounded-lg border-2 transition-all duration-200 text-left";
    const status = getSlotStatus(slot);
    const isSelected = selectedSlot?.id === slot.id;
    const isHovered = hoveredSlot === slot.id;
    
    let statusClasses = '';
    switch (status) {
      case 'available':
        statusClasses = 'border-green-200 bg-green-50 hover:border-green-300 hover:bg-green-100 text-green-800';
        break;
      case 'booked':
        statusClasses = 'border-red-200 bg-red-50 text-red-600 cursor-not-allowed';
        break;
      case 'cancelled':
        statusClasses = 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed';
        break;
      case 'full':
        statusClasses = 'border-orange-200 bg-orange-50 text-orange-600 cursor-not-allowed';
        break;
    }
    
    if (isSelected) {
      statusClasses += ' ring-2 ring-blue-500 ring-offset-2 border-blue-300 bg-blue-50';
    }
    
    if (isHovered && status === 'available') {
      statusClasses += ' transform scale-105 shadow-md';
    }
    
    return `${baseClasses} ${statusClasses}`;
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (disabled || getSlotStatus(slot) !== 'available') return;
    onSlotSelect?.(slot);
  };

  if (availableSlots.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Keine verfügbaren Termine</p>
          <p className="text-sm">
            Für den {format(selectedDate, 'dd. MMMM yyyy', { locale: de })} sind 
            leider keine Termine verfügbar.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          Verfügbare Termine für {format(selectedDate, 'dd. MMMM yyyy', { locale: de })}
        </h3>
        <p className="text-sm text-gray-600">
          Wählen Sie einen passenden Termin aus:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {timeSlots.map((slot) => {
          const status = getSlotStatus(slot);
          const isSelected = selectedSlot?.id === slot.id;
          
          return (
            <div
              key={slot.id}
              className={getSlotClasses(slot)}
              onClick={() => handleSlotClick(slot)}
              onMouseEnter={() => setHoveredSlot(slot.id)}
              onMouseLeave={() => setHoveredSlot(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                </div>
                
                {isSelected && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </div>
              
              <div className="mt-2 flex items-center justify-between">
                <Badge 
                  variant={status === 'available' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {status === 'available' && 'Verfügbar'}
                  {status === 'booked' && 'Gebucht'}
                  {status === 'cancelled' && 'Storniert'}
                  {status === 'full' && 'Ausgebucht'}
                </Badge>
                
                {slot.maxBookings > 1 && (
                  <span className="text-xs text-gray-500">
                    {slot.currentBookings}/{slot.maxBookings}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSlot && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <Check className="h-4 w-4" />
            <span className="font-medium">
              Termin ausgewählt: {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
}
