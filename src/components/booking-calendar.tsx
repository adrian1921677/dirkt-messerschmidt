'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { de } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getDateStatus } from '@/lib/holidays';
import { TimeSlot } from '@/types/booking';

interface BookingCalendarProps {
  availableSlots?: TimeSlot[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date | null;
  disabled?: boolean;
}

export function BookingCalendar({ 
  availableSlots = [], 
  onDateSelect, 
  selectedDate,
  disabled = false 
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Erstelle Kalender-Grid mit leeren Zellen für den Monatsanfang
  const startDate = monthStart;
  const startDayOfWeek = startDate.getDay();
  const emptyDays = Array.from({ length: startDayOfWeek }, () => null);
  const calendarDays = [...emptyDays, ...daysInMonth];

  const handleDateClick = (date: Date) => {
    if (disabled) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Vergangene Tage nicht wählbar
    if (date < today) return;
    
    const dateStatus = getDateStatus(date, availableSlots.map(slot => ({
      date: slot.date,
      status: slot.status
    })));
    
    // Nur verfügbare Tage wählbar
    if (dateStatus.status === 'available') {
      onDateSelect?.(date);
    }
  };

  const getDayColor = (date: Date) => {
    const dateStatus = getDateStatus(date, availableSlots.map(slot => ({
      date: slot.date,
      status: slot.status
    })));
    
    return dateStatus.color;
  };

  const getDayClasses = (date: Date) => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors";
    const color = getDayColor(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    
    let colorClasses = '';
    switch (color) {
      case 'green':
        colorClasses = 'bg-green-100 text-green-800 hover:bg-green-200 border-2 border-green-300';
        break;
      case 'red':
        colorClasses = 'bg-red-100 text-red-800 hover:bg-red-200 border-2 border-red-300';
        break;
      case 'yellow':
        colorClasses = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-2 border-yellow-300';
        break;
      case 'gray':
        colorClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed';
        break;
    }
    
    if (isSelected) {
      colorClasses += ' ring-2 ring-blue-500 ring-offset-2';
    }
    
    if (isToday) {
      colorClasses += ' font-bold';
    }
    
    return `${baseClasses} ${colorClasses}`;
  };

  const isDateClickable = (date: Date) => {
    const dateStatus = getDateStatus(date, availableSlots.map(slot => ({
      date: slot.date,
      status: slot.status
    })));
    
    return dateStatus.status === 'available' && !disabled;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: de })}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            disabled={disabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            disabled={disabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Wochentage Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Kalender Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={index} className="w-10 h-10" />;
          }

          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isClickable = isDateClickable(day);
          const dateStatus = getDateStatus(day, availableSlots.map(slot => ({
            date: slot.date,
            status: slot.status
          })));

          return (
            <div
              key={day.toISOString()}
              className={`${getDayClasses(day)} ${
                !isCurrentMonth ? 'opacity-30' : ''
              } ${!isClickable ? 'cursor-not-allowed' : ''}`}
              onClick={() => isClickable && handleDateClick(day)}
              title={dateStatus.label || format(day, 'dd.MM.yyyy')}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      {/* Legende */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-100 border-2 border-green-300"></div>
          <span>Verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-100 border-2 border-red-300"></div>
          <span>Nicht verfügbar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-100 border-2 border-yellow-300"></div>
          <span>Feiertag</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-100"></div>
          <span>Vergangen</span>
        </div>
      </div>
    </Card>
  );
}
