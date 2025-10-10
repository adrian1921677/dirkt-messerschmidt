import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, GraduationCap, Users, Calendar, MapPin, Phone, Mail } from "lucide-react";

export default function UeberMich() {
  const qualifications = [
    {
      title: "Zertifizierter Sachverständiger",
      organization: "Deutsche Gesellschaft für Sachverständigenwesen",
      year: "2010"
    },
    {
      title: "Master of Engineering",
      organization: "Technische Universität München",
      year: "2008"
    },
    {
      title: "Bachelor of Science",
      organization: "Hochschule für angewandte Wissenschaften",
      year: "2005"
    }
  ];

  const memberships = [
    "Deutsche Gesellschaft für Sachverständigenwesen (DGSV)",
    "Bundesverband der Sachverständigen (BDS)",
    "Verein Deutscher Ingenieure (VDI)",
    "Chamber of Commerce Sachverständige"
  ];

  const experience = [
    {
      period: "2015 - heute",
      position: "Freiberuflicher Sachverständiger",
      description: "Selbstständige Tätigkeit als zertifizierter Sachverständiger mit Schwerpunkt auf technische Gutachten und Schadensbewertungen."
    },
    {
      period: "2010 - 2015",
      position: "Senior Consultant",
      description: "Leitende Position in einem renommierten Ingenieurbüro mit Fokus auf Qualitätssicherung und Projektmanagement."
    },
    {
      period: "2008 - 2010",
      position: "Projektingenieur",
      description: "Erste Berufserfahrung in der Industrie mit Schwerpunkt auf technische Analyse und Dokumentation."
    }
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
            Dirk Messerschmidt - Ihr zuverlässiger Partner für professionelle Gutachten 
            und sachverständige Beratung mit über 15 Jahren Erfahrung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profil */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <CardTitle className="text-2xl">Dirk Messerschmidt</CardTitle>
                <CardDescription className="text-lg">
                  Zertifizierter Sachverständiger
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Musterstadt, Deutschland</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">+49 170 12345678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">info@gutachter-messerschmidt.de</span>
                </div>
                <div className="pt-4 border-t">
                  <Badge variant="secondary" className="w-full justify-center">
                    <Award className="h-4 w-4 mr-2" />
                    Seit 2010 zertifiziert
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inhalt */}
          <div className="lg:col-span-2 space-y-12">
            {/* Kurzvita */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kurzvita</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Als zertifizierter Sachverständiger mit über 15 Jahren Berufserfahrung 
                  spezialisiere ich mich auf die Erstellung von technischen Gutachten, 
                  Schadensbewertungen und Qualitätsanalysen. Meine Expertise umfasst 
                  verschiedene Bereiche der Technik und Industrie.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nach meinem Studium des Maschinenbaus an der Technischen Universität 
                  München und mehreren Jahren in der Industrie, entschied ich mich 2010 
                  für die Selbstständigkeit als Sachverständiger. Seitdem habe ich über 
                  500 Gutachten erstellt und dabei stets höchste Qualitätsstandards eingehalten.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Meine Arbeit zeichnet sich durch Objektivität, Präzision und eine 
                  verständliche Darstellung komplexer technischer Sachverhalte aus. 
                  Ich bin Mitglied in mehreren Fachverbänden und bilde mich kontinuierlich 
                  weiter, um stets auf dem neuesten Stand der Technik zu bleiben.
                </p>
              </div>
            </section>

            {/* Qualifikationen */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Qualifikationen & Zertifikate</h2>
              <div className="space-y-4">
                {qualifications.map((qual, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {qual.title}
                          </h3>
                          <p className="text-gray-600 mb-1">{qual.organization}</p>
                          <Badge variant="outline">{qual.year}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Mitgliedschaften */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mitgliedschaften</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memberships.map((membership, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{membership}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Berufserfahrung */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Berufserfahrung</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {exp.position}
                            </h3>
                            <Badge variant="outline">{exp.period}</Badge>
                          </div>
                          <p className="text-gray-600">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
