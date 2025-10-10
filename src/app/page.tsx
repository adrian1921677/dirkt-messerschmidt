import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Clock, Users, FileText, Shield } from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Technische Gutachten",
      description: "Umfassende Bewertung und Dokumentation technischer Sachverhalte"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Schadensgutachten",
      description: "Professionelle Analyse und Bewertung von Schäden aller Art"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Qualitätsbewertung",
      description: "Objektive Beurteilung von Produkten und Dienstleistungen"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Anfrage",
      description: "Kontaktieren Sie mich mit Ihrem Anliegen"
    },
    {
      step: "2", 
      title: "Prüfung",
      description: "Ich prüfe Ihre Anfrage und erstelle ein Angebot"
    },
    {
      step: "3",
      title: "Termin",
      description: "Vereinbaren Sie einen passenden Termin"
    },
    {
      step: "4",
      title: "Gutachten",
      description: "Erstellung des professionellen Gutachtens"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Award className="h-4 w-4 mr-2" />
              Zertifizierter Sachverständiger
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professionelle Gutachten
              <span className="text-blue-600 block">mit höchster Qualität</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Über 15 Jahre Erfahrung in der Erstellung von technischen Gutachten, 
              Schadensbewertungen und Qualitätsanalysen. Vertrauen Sie auf Expertise und Präzision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/termin-anfragen">
                  Termin anfragen
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meine Leistungen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Umfassende sachverständige Beratung für Ihre individuellen Anforderungen
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So funktioniert&apos;s
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ein einfacher und transparenter Prozess von der Anfrage bis zum fertigen Gutachten
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vertrauen Sie auf Erfahrung
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Über 15 Jahre Expertise und mehr als 500 erfolgreich abgeschlossene Gutachten
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Erfolgreiche Gutachten</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Zufriedene Kunden</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bereit für Ihr Gutachten?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung und ein individuelles Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/termin-anfragen">
                Termin anfragen
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/kontakt">
                Kontakt aufnehmen
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
