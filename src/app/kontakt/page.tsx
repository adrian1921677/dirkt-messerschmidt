import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info & WhatsApp */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                  Kontaktinformationen
                </CardTitle>
                <CardDescription>
                  Verschiedene Wege, mich zu erreichen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                      {info.action && (
                        <a
                          href={info.action}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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

            {/* Fancy WhatsApp Bereich */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center text-green-700">
                  <div className="relative">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  WhatsApp Chat
                </CardTitle>
                <CardDescription className="text-green-600">
                  Schnelle Kommunikation direkt über WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Dirk Messerschmidt</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Online
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-100 rounded-lg p-3 text-sm text-gray-700">
                      <p className="font-medium mb-1">💬 Vordefinierte Nachrichten:</p>
                      <div className="space-y-1">
                        <p>• &ldquo;Hallo Herr Messerschmidt, ich habe eine Frage zum Gutachten.&rdquo;</p>
                        <p>• &ldquo;Ich möchte einen Termin vereinbaren.&rdquo;</p>
                        <p>• &ldquo;Können Sie mir bei meinem Schaden helfen?&rdquo;</p>
                      </div>
                    </div>
                    
                    <a
                      href="https://wa.me/49202423110?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zum%20Gutachten."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
                    >
                      <Send className="h-5 w-5 group-hover:animate-bounce" />
                      <span>WhatsApp Chat starten</span>
                      <Zap className="h-4 w-4 group-hover:animate-pulse" />
                    </a>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xs text-green-600 bg-green-100 rounded-full px-3 py-1 inline-block">
                    ⚡ Sofortige Antwort garantiert
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

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

        {/* Additional Info */}
        <section className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Terminvereinbarung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Für eine Terminvereinbarung können Sie mich telefonisch erreichen oder 
                  das Kontaktformular nutzen. Ich rufe Sie gerne zurück.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Flexible Termine auch außerhalb der Bürozeiten</li>
                  <li>• Vor-Ort-Termine oder Remote-Beratung möglich</li>
                  <li>• Schnelle Terminvergabe innerhalb von 24-48 Stunden</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notfall-Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Für dringende Fälle stehe ich auch außerhalb der regulären 
                  Bürozeiten zur Verfügung.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24/7 Notfall-Hotline für Eilgutachten</li>
                  <li>• Sofortige Vor-Ort-Termine möglich</li>
                  <li>• Express-Bearbeitung in 24-48 Stunden</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
