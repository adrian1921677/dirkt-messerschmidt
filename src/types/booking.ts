export interface TimeSlot {
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

export interface BookingFormData {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message?: string;
  dataProtection: boolean;
}

export interface BookingRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message?: string;
  dataProtection: boolean;
  selectedDate: string;
  selectedSlotId: string;
}

