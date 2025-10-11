import { addDays, isSameDay } from 'date-fns';

// Deutsche Feiertage (fest)
const FIXED_HOLIDAYS = [
  { month: 1, day: 1, name: 'Neujahr' },
  { month: 5, day: 1, name: 'Tag der Arbeit' },
  { month: 10, day: 3, name: 'Tag der Deutschen Einheit' },
  { month: 12, day: 25, name: '1. Weihnachtsfeiertag' },
  { month: 12, day: 26, name: '2. Weihnachtsfeiertag' },
];

// Berechnet bewegliche Feiertage
function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;
  return new Date(year, n - 1, p + 1);
}

function calculateMovableHolidays(year: number) {
  const easter = calculateEaster(year);
  const easterMonday = addDays(easter, 1);
  const ascensionDay = addDays(easter, 39);
  const whitMonday = addDays(easter, 50);
  const corpusChristi = addDays(easter, 60);
  const goodFriday = addDays(easter, -2);

  return [
    { date: goodFriday, name: 'Karfreitag' },
    { date: easter, name: 'Ostersonntag' },
    { date: easterMonday, name: 'Ostermontag' },
    { date: ascensionDay, name: 'Christi Himmelfahrt' },
    { date: whitMonday, name: 'Pfingstmontag' },
    { date: corpusChristi, name: 'Fronleichnam' },
  ];
}

export function getGermanHolidays(year: number): Array<{ date: Date; name: string }> {
  const holidays: Array<{ date: Date; name: string }> = [];

  // Feste Feiertage
  FIXED_HOLIDAYS.forEach(holiday => {
    holidays.push({
      date: new Date(year, holiday.month - 1, holiday.day),
      name: holiday.name,
    });
  });

  // Bewegliche Feiertage
  const movableHolidays = calculateMovableHolidays(year);
  holidays.push(...movableHolidays);

  return holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function isHoliday(date: Date): { isHoliday: boolean; name?: string } {
  const year = date.getFullYear();
  const holidays = getGermanHolidays(year);
  
  const holiday = holidays.find(h => isSameDay(h.date, date));
  
  return {
    isHoliday: !!holiday,
    name: holiday?.name,
  };
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sonntag oder Samstag
}

export function getDateStatus(date: Date, availableSlots: Array<{ date: Date; status: string; currentBookings?: number; maxBookings?: number }> = []): {
  status: 'available' | 'unavailable' | 'holiday' | 'weekend' | 'past';
  color: 'green' | 'red' | 'yellow' | 'gray';
  label?: string;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Vergangene Tage
  if (date < today) {
    return { status: 'past', color: 'gray' };
  }
  
  // Feiertage
  const holiday = isHoliday(date);
  if (holiday.isHoliday) {
    return { 
      status: 'holiday', 
      color: 'yellow',
      label: holiday.name 
    };
  }
  
  // Wochenenden
  if (isWeekend(date)) {
    return { status: 'weekend', color: 'red' };
  }
  
  // Verfügbare Slots prüfen - alle Slots an diesem Tag
  const slotsOnDate = availableSlots.filter(s => isSameDay(s.date, date));
  const publishedSlots = slotsOnDate.filter(s => s.status === 'PUBLISHED');
  
  // Wenn es veröffentlichte Slots gibt, die noch nicht voll sind
  const availableSlotsOnDate = publishedSlots.filter(slot => {
    const currentBookings = slot.currentBookings || 0;
    const maxBookings = slot.maxBookings || 1;
    return currentBookings < maxBookings;
  });
  
  if (availableSlotsOnDate.length > 0) {
    return { status: 'available', color: 'green' };
  }
  
  // Wenn es veröffentlichte Slots gibt, aber alle voll sind
  if (publishedSlots.length > 0) {
    return { status: 'unavailable', color: 'red' };
  }
  
  return { status: 'unavailable', color: 'red' };
}
