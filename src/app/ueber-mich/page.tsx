import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Users, FileText, Shield, CheckCircle, Star, MessageCircle } from "lucide-react";
import MagicBento from "@/components/MagicBento";

export default function UeberMich() {
  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "30+ Jahre Erfahrung",
      description: "Über drei Jahrzehnte Expertise in der KFZ-Gutachterbranche"
    },
    {
      icon: <FileText className="h-8 w-8 text-green-600" />,
      title: "500+ Gutachten",
      description: "Erfolgreich abgeschlossene Gutachten und Bewertungen"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Unabhängig & Objektiv",
      description: "Keine Kooperation mit Versicherungen - nur im Interesse der Kunden"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "100% Zufriedenheit",
      description: "Höchste Kundenzufriedenheit durch professionelle Arbeit"
    }
  ];

  const specialties = [
    "KFZ-Schadengutachten",
    "Wertgutachten für Old- und Youngtimer",
    "Kostenvoranschläge und Kurzgutachten",
    "Unabhängige Schadensbewertung",
    "Beratung bei Versicherungsstreitigkeiten",
    "Technische Sachverständigentätigkeit"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Über mich
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dirk Messerschmidt - Ihr vertrauensvoller Partner für professionelle KFZ-Gutachten
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Dirk Messerschmidt</CardTitle>
                    <CardDescription className="text-lg">
                      Zertifizierter KFZ-Sachverständiger
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Seit über 30 Jahren bin ich als unabhängiger KFZ-Sachverständiger tätig 
                  und habe mich auf die Erstellung von technischen Gutachten, Schadensbewertungen 
                  und Qualitätsanalysen spezialisiert.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Meine Arbeit zeichnet sich durch höchste Professionalität, Objektivität 
                  und Unabhängigkeit aus. Ich arbeite ausschließlich im Interesse meiner 
                  Kunden und habe bewusst keine Kooperationen mit Versicherungen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Zertifiziert
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Shield className="h-3 w-3 mr-1" />
                    Unabhängig
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    30+ Jahre
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-blue-600" />
                  Meine Spezialgebiete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Besondere Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">
                  Als <strong>Old- und Youngtimer-Spezialist</strong> klassifiziere ich 
                  diese Fahrzeuge nach einer gründlichen Besichtigung und erstelle 
                  hierüber faire Wertgutachten zu kostengünstigen Preisen.
                </p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">Spezialist für klassische Fahrzeuge</span>
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
                Entdecken Sie meine Leistungen auf eine neue Art
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

        {/* Achievements Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meine Erfolge
            </h2>
            <p className="text-xl text-gray-600">
              Zahlen, die für sich sprechen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Meine Arbeitsphilosophie</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                "Mein Ziel ist es, meinen Kunden durch unabhängige, objektive und 
                professionelle Gutachten zu helfen, ihre berechtigten Ansprüche 
                durchzusetzen. Jedes Gutachten wird mit höchster Sorgfalt erstellt 
                und basiert auf fundiertem technischen Wissen."
              </p>
              <div className="flex justify-center">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Dirk Messerschmidt</p>
                  <p className="text-sm text-gray-600">KFZ-Sachverständiger</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Haben Sie Fragen zu meiner Arbeit?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Ich berate Sie gerne persönlich und unverbindlich
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+49202423110"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  0202 / 423 110
                </a>
                <a
                  href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zu%20Ihren%20Leistungen."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Chat
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
