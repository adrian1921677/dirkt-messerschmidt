import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Clock, MessageCircle, Globe, Send, Zap } from "lucide-react";
import MagicBento from "@/components/MagicBento";

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
            <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200 group hover:shadow-2xl transition-all duration-500">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/30 rounded-full -translate-y-16 translate-x-16 animate-bounce"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300/30 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
              
              <CardHeader className="relative text-center pb-4">
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-green-700 text-xl group-hover:text-green-800 transition-colors">
                  WhatsApp Chat
                </CardTitle>
                <CardDescription className="text-green-600">
                  Direkt & schnell erreichbar
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative text-center space-y-6">
                {/* Floating Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zum%20Gutachten."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    <div className="relative flex items-center space-x-3">
                      <Send className="h-5 w-5 group-hover/btn:animate-bounce" />
                      <span>Chat starten</span>
                      <Zap className="h-4 w-4 group-hover/btn:animate-pulse" />
                    </div>
                  </a>
                </div>

                {/* Animated Status */}
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online & verfügbar</span>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://wa.me/491711415899?text=Termin%20vereinbaren"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <div className="text-2xl mb-1 group-hover/quick:animate-bounce">📅</div>
                    <div className="text-xs font-medium text-gray-700">Termin</div>
                  </a>
                  <a
                    href="https://wa.me/491711415899?text=Gutachten%20anfragen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <div className="text-2xl mb-1 group-hover/quick:animate-bounce">📋</div>
                    <div className="text-xs font-medium text-gray-700">Gutachten</div>
                  </a>
                  <a
                    href="https://wa.me/491711415899?text=Beratung%20anfragen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/quick bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <div className="text-2xl mb-1 group-hover/quick:animate-bounce">💬</div>
                    <div className="text-xs font-medium text-gray-700">Beratung</div>
                  </a>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 text-green-400/30 group-hover:text-green-400/50 transition-colors">
                  <div className="text-4xl animate-bounce delay-500">💚</div>
                </div>
                <div className="absolute bottom-4 left-4 text-emerald-400/30 group-hover:text-emerald-400/50 transition-colors">
                  <div className="text-3xl animate-pulse delay-1000">✨</div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Magic Bento Section */}
        <section className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Interaktive Service-Übersicht
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Entdecken Sie unsere Leistungen auf eine neue Art
              </p>
            </div>
            <div className="flex justify-center">
              <MagicBento 
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
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
