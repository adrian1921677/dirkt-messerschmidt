export interface BookingData {
  customerName: string;
  formattedDate: string;
  formattedTime: string;
  address: string;
  phoneNumber: string;
  email: string;
  website: string;
  reason?: string;
  privacyPolicyUrl: string;
}

export const emailTemplates = {
  bookingConfirmation: (data: BookingData) => `
Sehr geehrter ${data.customerName},

vielen Dank für Ihre Terminbuchung.

Hiermit bestätigen wir den folgenden Termin:

Datum: ${data.formattedDate}
Uhrzeit: ${data.formattedTime} Uhr
Ort: ${data.address}

Leistung: Kfz-Gutachten  
Bearbeiter: Dirk Messerschmidt

Bitte bringen Sie, falls vorhanden, folgende Unterlagen mit:
- Fahrzeugschein (Zulassungsbescheinigung Teil I)
- Kostenvoranschläge oder Werkstattunterlagen
- vorhandene Schadenbilder

Eine kostenfreie Stornierung oder Terminänderung ist bis 24 Stunden vor dem Termin möglich.  
Bei kurzfristigen Absagen behalten wir uns vor, eine Aufwandspauschale zu berechnen.

Mit dieser E-Mail gilt der Termin als verbindlich bestätigt.

Mit freundlichen Grüßen  
Dirk Messerschmidt  
Kfz-Gutachterbüro Messerschmidt  
${data.address}  
Telefon: ${data.phoneNumber}  
E-Mail: ${data.email}  
Web: ${data.website}

---

Datenschutzhinweis:  
Ihre personenbezogenen Daten werden ausschließlich zur Terminverwaltung verarbeitet.  
Weitere Informationen finden Sie unter ${data.privacyPolicyUrl}.
`,

  bookingDecline: (data: BookingData) => `
Sehr geehrter ${data.customerName},

der von Ihnen gebuchte Termin am ${data.formattedDate} um ${data.formattedTime} Uhr
muss leider abgesagt werden.

Grund: ${data.reason || 'betriebliche Gründe'}  
(Ein kurzer Hinweis, z. B. „betriebliche Gründe", „Krankheit", „Überschneidung im Terminplan".)

Wir bitten die Unannehmlichkeiten zu entschuldigen und bieten Ihnen gerne einen Ersatztermin an.  
Bitte teilen Sie uns mit, ob Sie einen neuen Termin wünschen.

Bisherige Buchungsdaten:
Datum: ${data.formattedDate}
Uhrzeit: ${data.formattedTime} Uhr
Ort: ${data.address}
Leistung: Kfz-Gutachten

Mit freundlichen Grüßen  
Dirk Messerschmidt  
Kfz-Gutachterbüro Messerschmidt  
${data.address}  
Telefon: ${data.phoneNumber}  
E-Mail: ${data.email}  
Web: ${data.website}

---

Datenschutzhinweis:  
Ihre personenbezogenen Daten werden ausschließlich zur Terminverwaltung verarbeitet.  
Weitere Informationen finden Sie unter ${data.privacyPolicyUrl}.
`
};

export const formatBookingData = (booking: any): BookingData => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const formatTime = (time: string) => {
    return time;
  };

  return {
    customerName: booking.clientName,
    formattedDate: formatDate(booking.timeSlot.date),
    formattedTime: formatTime(booking.timeSlot.startTime),
    address: 'Alt-Wolfshahn 12, 42117 Wuppertal',
    phoneNumber: '0202 / 423 110',
    email: 'info@messerschmidt.eu',
    website: 'www.messerschmidt.eu',
    privacyPolicyUrl: 'https://dirkt-messerschmidt.vercel.app/datenschutz'
  };
};
