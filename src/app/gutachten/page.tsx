import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Award, Clock, Users, CheckCircle, AlertTriangle, Euro, Gavel } from "lucide-react";

export default function GutachtenPage() {
  const coreQuestions = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Was ist ein Gutachten?",
      content: "Ein Gutachten wird nach erfolgter Besichtigung zur Beweissicherung erstellt. In unseren Gutachten finden Sie die technischen Daten, den Zustand Ihres Fahrzeuges sowie relevante Einzelheiten. Wir erstellen Ihnen Gutachten für fast alles, was sich auf der Straße bewegt.",
      highlight: "Nur ein unabhängig erstelltes Kfz-Schadengutachten dient zur Beweissicherung."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Wofür brauche ich ein Gutachten?",
      content: "Sie benötigen ein Gutachten in erster Linie zur berechtigten Durchsetzung Ihrer Ansprüche gegenüber einer Versicherung oder direkt bei dem Verursacher. Dieses Gutachten dient zur Vorlage bei Versicherungen und auch zur Durchsetzung Ihrer Ansprüche vor Gericht.",
      highlight: "Verzichten Sie somit nicht auf Ihr Recht der freien Gutachterwahl!"
    },
    {
      icon: <Euro className="h-8 w-8 text-yellow-600" />,
      title: "Wer bezahlt ein Gutachten?",
      content: "Bei einem unverschuldeten Unfall trägt grundsätzlich der Verursacher bzw. die eintretende Haftpflichtversicherung auch die Kosten des KFZ-Sachverständigen. Sie haben Anspruch darauf, so gestellt zu werden, wie das Fahrzeug vor dem Schadenereignis eingebracht wurde.",
      highlight: "Ganz gleich, ob Sie Ihr Fahrzeug reparieren lassen oder die Nettosumme auszahlen lassen wollen."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Kostenvoranschlag",
      content: "Die von uns erstellten Gutachten sind unabhängig und objektiv. Wir arbeiten unabhängig und haben keine Kooperation mit Versicherungen. Ein Wertgutachten erstellen wir Ihnen fair und kostengünstig.",
      highlight: "Sie fahren einen Old- oder Youngtimer? Wir klassifizieren diesen nach einer Besichtigung und erstellen hierüber ein Wertgutachten zu fairen Preisen."
    }
  ];

  const services = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Kraftfahrzeug-Schadengutachten",
      description: "Unabhängige und objektive Bewertung von Fahrzeugschäden"
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Wertgutachten für Old- und Youngtimer",
      description: "Klassifizierung und Bewertung zu fairen Preisen"
    },
    {
      icon: <Gavel className="h-8 w-8 text-purple-600" />,
      title: "Unfallrekonstruktion",
      description: "Professionelle Rekonstruktion von Unfallhergängen"
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
              Unabhängiger Sachverständiger
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Gutachten
              <span className="text-blue-600 block">von Experten für Experten</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Über 30 Jahre Erfahrung in der Erstellung von unabhängigen und objektiven Gutachten. 
              Wir arbeiten unabhängig und haben keine Kooperation mit Versicherungen.
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

      {/* Core Questions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kernfragen zu Gutachten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Die wichtigsten Informationen rund um Gutachten und Ihre Rechte
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreQuestions.map((question, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      {question.icon}
                    </div>
                    <CardTitle className="text-xl">{question.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{question.content}</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 font-medium text-sm">
                      <AlertTriangle className="h-4 w-4 inline mr-2" />
                      {question.highlight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unsere Leistungen
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

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vertrauen Sie auf Unabhängigkeit
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Über 30 Jahre Erfahrung und mehr als 500 erfolgreich abgeschlossene Gutachten
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">30+</h3>
              <p className="text-gray-600">Jahre Erfahrung</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Unabhängig & Objektiv</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benötigen Sie ein Gutachten?
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
