const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// WhatsApp-Link für Dirk Messerschmidt
const whatsappUrl = 'https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zum%20Gutachten.';

// QR-Code generieren
QRCode.toFile(
  path.join(__dirname, '../public/qr-code.png'),
  whatsappUrl,
  {
    type: 'png',
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  },
  (err) => {
    if (err) {
      console.error('Fehler beim Generieren des QR-Codes:', err);
    } else {
      console.log('QR-Code erfolgreich generiert: qr-code.png');
    }
  }
);
