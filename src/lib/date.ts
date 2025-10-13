// Tages-UTC aus "YYYY-MM-DD" oder ISO
export function toDayUTC(iso: string) {
  const d = new Date(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

// Prüft ob ein Slot in der Vergangenheit liegt (lokal)
export function isPastLocal(localDateISO: string, endMinutes: number) {
  const d = new Date(localDateISO);
  const now = new Date();
  const sameDay = d.getUTCFullYear() === now.getUTCFullYear() && 
                  d.getUTCMonth() === now.getUTCMonth() && 
                  d.getUTCDate() === now.getUTCDate();
  
  if (d.getTime() < Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) return true;
  if (sameDay) return endMinutes <= (now.getHours() * 60 + now.getMinutes());
  return false;
}

// Konvertiert Minuten zu HH:MM Format
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Konvertiert HH:MM zu Minuten
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

