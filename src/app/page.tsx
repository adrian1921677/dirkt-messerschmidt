import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Clock, Users, FileText, Shield, Calendar, MessageCircle } from "lucide-react";

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
                  Über 30 Jahre Erfahrung in der Erstellung von technischen Gutachten, 
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

          {/* Location Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Unser Standort
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Besuchen Sie uns in Wuppertal für eine persönliche Beratung
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-96">
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Dirk Messerschmidt
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Alt-Wolfshahn 12<br />
                      42117 Wuppertal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="tel:+49202423110"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        📞 0202 / 423 110
                      </a>
                      <a
                        href="https://www.messerschmidt.eu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        🌐 www.messerschmidt.eu
                      </a>
                    </div>
                  </div>
                </div>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">30+</h3>
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

      {/* CTA Section - Special Design */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-40 translate-y-40"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-28 translate-y-28"></div>
        
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group hover:scale-110 transition-transform duration-300">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Bereit für Ihr Gutachten?
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung und ein individuelles Angebot.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-6 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group/btn text-xl">
              <Link href="/termin-anfragen">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6" />
                  <span>Termin anfragen</span>
                  <div className="w-2 h-2 bg-blue-500 rounded-full group-hover/btn:animate-ping"></div>
                </div>
              </Link>
            </Button>
            
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 px-10 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group/whatsapp text-xl">
              <Link href="/kontakt">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-6 w-6" />
                  <span>Kontakt aufnehmen</span>
                  <div className="w-2 h-2 bg-white rounded-full group-hover/whatsapp:animate-ping"></div>
                </div>
              </Link>
            </Button>
          </div>
          
          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-12 text-white/30">
            <div className="text-5xl">📋</div>
            <div className="text-5xl">⚡</div>
            <div className="text-5xl">🛠️</div>
            <div className="text-5xl">📊</div>
          </div>
          
          {/* Bottom Accent */}
          <div className="mt-12 w-40 h-1 bg-white/50 rounded-full mx-auto"></div>
        </div>
      </section>
    </div>
  );
}
