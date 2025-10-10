import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIntegration } from "@/components/whatsapp-integration";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Kontakt() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telefon",
      details: ["+49 170 12345678", "Mo-Fr: 8:00-18:00 Uhr"],
      action: "tel:+4917012345678"
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "E-Mail",
      details: ["info@gutachter-messerschmidt.de", "Antwort innerhalb 24h"],
      action: "mailto:info@gutachter-messerschmidt.de"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Adresse",
      details: [
        "Dirk Messerschmidt",
        "Musterstraße 123",
        "12345 Musterstadt"
      ],
      action: "https://maps.google.com/?q=Musterstraße+123,+12345+Musterstadt"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Bürozeiten",
      details: [
        "Montag - Freitag: 8:00 - 18:00",
        "Samstag: 9:00 - 14:00",
        "Termine auch außerhalb der Bürozeiten möglich"
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

            {/* WhatsApp Integration */}
            <WhatsAppIntegration
              phone="+4917012345678"
              message="Hallo Herr Messerschmidt, ich habe eine Frage zum Gutachten."
            />
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
                Mein Büro befindet sich in zentraler Lage in Musterstadt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Karte wird geladen...</p>
                  <p className="text-sm">
                    In der finalen Version wird hier eine interaktive Karte angezeigt
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://maps.google.com/?q=Musterstraße+123,+12345+Musterstadt"
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
