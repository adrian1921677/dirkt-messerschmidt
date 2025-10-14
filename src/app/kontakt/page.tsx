import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle, Globe, Send, Zap } from "lucide-react";

export default function Kontakt() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telefon",
          details: ["0202 / 423 110"],
      action: "tel:+49202423110"
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Website",
      details: ["www.messerschmidt.eu"],
      action: "https://www.messerschmidt.eu"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Adresse",
      details: [
        "Dirk Messerschmidt",
        "Alt-Wolfshahn 12",
        "42117 Wuppertal"
      ],
      action: "https://maps.google.com/?q=Alt-Wolfshahn+12,+42117+Wuppertal"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Bürozeiten",
      details: [
        "Montag - Freitag: 9:00 - 17:00",
        "Termine nach Vereinbarung"
      ],
      action: null
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kontakt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
            Ich freue mich auf Ihre Nachricht und berate Sie gerne persönlich.
          </p>
        </div>

        {/* WhatsApp Chat - Hauptfokus */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200 group hover:shadow-2xl transition-all duration-500">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-300/30 rounded-full -translate-y-24 translate-x-24 animate-bounce"></div>
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-emerald-300/30 rounded-full translate-y-18 -translate-x-18 animate-pulse delay-1000"></div>
            
            <CardHeader className="relative text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-green-700 text-3xl group-hover:text-green-800 transition-colors mb-2">
                WhatsApp Chat
              </CardTitle>
              <CardDescription className="text-green-600 text-lg">
                Direkt & schnell erreichbar - Starten Sie jetzt den Chat!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative text-center space-y-8">
              {/* Haupt-CTA Button */}
              <div className="flex justify-center">
                <a
                  href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zum%20Gutachten."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-xl"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center space-x-4">
                    <Send className="h-6 w-6 group-hover/btn:animate-bounce" />
                    <span>Chat jetzt starten</span>
                  </div>
                </a>
              </div>

              {/* Animated Status */}
              <div className="flex items-center justify-center space-x-3 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">Online & verfügbar</span>
              </div>

              {/* Quick Actions - Größer */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <a
                  href="https://wa.me/491711415899?text=Termin%20vereinbaren"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-4xl mb-3 group-hover/quick:animate-bounce">📅</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Termin vereinbaren</div>
                </a>
                <a
                  href="https://wa.me/491711415899?text=Gutachten%20anfragen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-4xl mb-3 group-hover/quick:animate-bounce">📋</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Gutachten anfragen</div>
                </a>
                <a
                  href="https://wa.me/491711415899?text=Beratung%20anfragen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-4xl mb-3 group-hover/quick:animate-bounce">💬</div>
                  <div className="text-sm font-semibold text-gray-700 text-center">Beratung anfragen</div>
                </a>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-6 text-green-400/30 group-hover:text-green-400/50 transition-colors">
                <div className="text-6xl animate-bounce delay-500">💚</div>
              </div>
              <div className="absolute bottom-6 left-6 text-emerald-400/30 group-hover:text-emerald-400/50 transition-colors">
                <div className="text-5xl animate-pulse delay-1000">✨</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zusätzliche Informationen - Kompakter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Kontaktinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-xs text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.action && (
                      <a
                        href={info.action}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        {info.action.startsWith('tel:') ? 'Anrufen' : 
                         info.action.startsWith('mailto:') ? 'E-Mail senden' : 
                         'Auf Karte anzeigen'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Terminvereinbarung */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Terminvereinbarung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                Flexible Termine nach Vereinbarung über WhatsApp oder Telefon.
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• Flexible Termine</li>
                <li>• Vor-Ort oder Remote</li>
                <li>• Schnelle Terminvergabe</li>
              </ul>
            </CardContent>
          </Card>

          {/* Notfall-Service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 mr-2 text-red-600" />
                Notfall-Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">
                Für dringende Fälle auch außerhalb der Bürozeiten.
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                <li>• 24/7 Notfall-Hotline</li>
                <li>• Sofortige Termine</li>
                <li>• Express-Bearbeitung</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Service Overview Section */}
        <section className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Unsere Service-Übersicht
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Entdecken Sie unsere Leistungen im Detail
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
                <p className="text-gray-600 text-center">
                  Hier finden Sie eine detaillierte Übersicht aller unserer Gutachter-Services. 
                  Von der ersten Beratung bis zur finalen Gutachtenerstellung begleiten wir Sie professionell.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                Standort
              </CardTitle>
              <CardDescription>
                Mein Büro befindet sich in Wuppertal, Alt-Wolfshahn 12
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.123456789!2d7.123456789!3d51.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA3JzI0LjQiTiA3wrAwNyc0Mi4wIkU!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dirk Messerschmidt - Alt-Wolfshahn 12, 42117 Wuppertal"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=Alt-Wolfshahn+12,+42117+Wuppertal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  In Google Maps öffnen
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
