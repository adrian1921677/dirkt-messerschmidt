import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Award, Clock, Euro, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Leistungen() {
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Technische Gutachten",
      description: "Umfassende Bewertung und Dokumentation technischer Sachverhalte",
      details: [
        "Maschinen- und Anlagenbewertung",
        "Technische Sicherheitsbewertung",
        "Produktqualitätsprüfung",
        "Konstruktionsbewertung",
        "Materialprüfung und -analyse"
      ],
      price: "ab 800€",
      duration: "5-10 Werktage"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Schadensgutachten",
      description: "Professionelle Analyse und Bewertung von Schäden aller Art",
      details: [
        "Brandschadensgutachten",
        "Wasserschadensbewertung",
        "Sturmschadensanalyse",
        "Vandalismusschäden",
        "Verschleiß- und Alterungsschäden"
      ],
      price: "ab 600€",
      duration: "3-7 Werktage"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Qualitätsbewertung",
      description: "Objektive Beurteilung von Produkten und Dienstleistungen",
      details: [
        "ISO-Zertifizierungsberatung",
        "Qualitätsmanagementsysteme",
        "Lieferantenbewertung",
        "Prozessoptimierung",
        "Auditierung und Compliance"
      ],
      price: "ab 1000€",
      duration: "7-14 Werktage"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Eilgutachten",
      description: "Schnelle Gutachten für dringende Fälle",
      details: [
        "24h-Express-Service",
        "Notfallbewertungen",
        "Gerichtstermin-Vorbereitung",
        "Sofortmaßnahmen-Empfehlung",
        "Telefonische Erstberatung"
      ],
      price: "ab 1200€",
      duration: "1-3 Werktage"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Erstberatung",
      description: "Kostenlose telefonische Erstberatung zur Klärung Ihres Anliegens"
    },
    {
      step: "2",
      title: "Angebot",
      description: "Detailliertes Angebot mit Kosten und Zeitrahmen"
    },
    {
      step: "3",
      title: "Terminvereinbarung",
      description: "Flexible Terminvereinbarung für die Begutachtung"
    },
    {
      step: "4",
      title: "Begutachtung",
      description: "Professionelle Vor-Ort-Begutachtung mit modernster Technik"
    },
    {
      step: "5",
      title: "Gutachten",
      description: "Erstellung des detaillierten Gutachtens mit Empfehlungen"
    },
    {
      step: "6",
      title: "Nachbetreuung",
      description: "Unterstützung bei der Umsetzung der Empfehlungen"
    }
  ];

  const pricing = [
    {
      title: "Standard-Gutachten",
      price: "600-1200€",
      features: [
        "Detaillierte Dokumentation",
        "Fotografische Beweisführung",
        "Schriftlicher Bericht",
        "Mündliche Erläuterung",
        "Nachfragen inklusive"
      ]
    },
    {
      title: "Premium-Gutachten",
      price: "1200-2500€",
      features: [
        "Umfassende Analyse",
        "3D-Dokumentation",
        "Video-Beweisführung",
        "Detaillierter Maßnahmenplan",
        "6 Monate Nachbetreuung",
        "Gerichtsfeste Dokumentation"
      ]
    },
    {
      title: "Eilgutachten",
      price: "1200-3000€",
      features: [
        "Express-Bearbeitung",
        "24h-Verfügbarkeit",
        "Sofortige Vor-Ort-Termine",
        "Schnelle Dokumentation",
        "Telefonische Beratung",
        "Notfall-Support"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meine Leistungen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionelle Gutachten und sachverständige Beratung für Ihre individuellen Anforderungen. 
            Transparente Preise und faire Abrechnung.
          </p>
        </div>

        {/* Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Gutachten-Typen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    {service.icon}
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex space-x-2 mt-2">
                        <Badge variant="outline">{service.price}</Badge>
                        <Badge variant="secondary">{service.duration}</Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-20 bg-gray-50 py-16 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mein Arbeitsprozess
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ein strukturierter und transparenter Ablauf von der ersten Anfrage bis zum fertigen Gutachten
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preise & Abrechnung
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparente Preise ohne versteckte Kosten. Alle Preise verstehen sich zzgl. MwSt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((pkg, index) => (
              <Card key={index} className={index === 1 ? "ring-2 ring-blue-600" : ""}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {pkg.price}
                  </div>
                  {index === 1 && (
                    <Badge className="mb-4">Empfohlen</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className="bg-blue-50 py-16 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Zusätzliche Informationen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <Euro className="h-6 w-6 inline mr-2" />
                  Zahlungsbedingungen
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Rechnung nach Gutachtenerstellung</li>
                  <li>• Zahlungsziel: 14 Tage</li>
                  <li>• Banküberweisung oder PayPal</li>
                  <li>• Keine Anzahlung erforderlich</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <Clock className="h-6 w-6 inline mr-2" />
                  Bearbeitungszeiten
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standard: 5-10 Werktage</li>
                  <li>• Express: 1-3 Werktage</li>
                  <li>• Eilgutachten: 24-48 Stunden</li>
                  <li>• Terminvereinbarung flexibel</li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/termin-anfragen">
                  Jetzt Termin anfragen
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

