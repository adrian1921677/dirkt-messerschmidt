import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Euro, Car, Wrench, MessageCircle, Send, Zap } from "lucide-react";
import MagicBento from "@/components/MagicBento";

export default function Leistungen() {
  const services = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Wofür brauche ich ein Gutachten?",
      content: [
        "Nur ein unabhängig erstelltes Kfz-Schadengutachten dient zur Beweissicherung.",
        "Verzichten Sie somit nicht auf Ihr Recht der freien Gutachterwahl!",
        "Sie benötigen ein Gutachten in erster Linie zur berechtigten Durchsetzung Ihrer Ansprüche gegenüber einer Versicherung oder direkt bei dem Verursacher.",
        "Die von uns erstellten Gutachten sind unabhängig und objektiv. Wir arbeiten unabhängig und haben keine Kooperation mit Versicherungen."
      ],
      highlight: "Old- und Youngtimer-Spezialist",
      highlightText: "Wir klassifizieren diesen nach einer Besichtigung und erstellen hierüber ein Wertgutachten zu fairen Preisen."
    },
    {
      icon: <Euro className="h-8 w-8 text-blue-600" />,
      title: "Kostenvoranschlag / Kurzgutachten",
      content: [
        "Bei kleinen Schäden (derzeit bis 750.-€ Schadenhöhe) sieht der Gesetzgeber die Erstellung eines Kurzgutachtens oder Kostenvoranschlag vor.",
        "Wir ermitteln die Schadenhöhe schnell und erstellen Ihnen einen entsprechenden Kostenvoranschlag bzw. ein Kurzgutachten."
      ]
    },
    {
      icon: <Car className="h-8 w-8 text-orange-600" />,
      title: "Wer bezahlt ein Gutachten?",
      content: [
        "Bei einem unverschuldeten Unfall trägt grundsätzlich der Verursacher bzw. die eintretende Haftpflichtversicherung auch die Kosten des KFZ - Sachverständigen.",
        "Sie haben Anspruch darauf, so gestellt zu werden, wie das Fahrzeug vor dem Schadenereignis eingebracht wurde.",
        "Ganz gleich, ob Sie Ihr Fahrzeug in einer Fachwerkstatt, in einer Werkstatt Ihres Vertrauens reparieren lassen oder ob Sie sich die Nettosumme einer Reparatur auszahlen lassen wollen.",
        "Bei Fragen stehen wir jederzeit zur Verfügung.",
        "Ein Wertgutachten erstellen wir Ihnen fair und kostengünstig."
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Leistungen
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 30 Jahre professionelle KFZ-Gutachten - Unabhängig und objektiv
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  {service.icon}
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription>
                  Professionelle Gutachten und Bewertungen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {service.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {service.highlight && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {service.highlight}
                    </h4>
                    <p className="text-green-700 text-sm">
                      {service.highlightText}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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

        {/* Fancy WhatsApp Bereich */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200 group hover:shadow-2xl transition-all duration-500 mb-16">
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
                href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage%20zu%20Ihren%20Leistungen."
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

        {/* Why Choose Us */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Warum Dirk Messerschmidt?
            </h2>
            <p className="text-xl text-gray-600">
              Über 30 Jahre Erfahrung in der KFZ-Gutachterbranche
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">30+ Jahre</h3>
                <p className="text-gray-600">Professionelle Erfahrung</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Unabhängig</h3>
                <p className="text-gray-600">Keine Kooperation mit Versicherungen</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Wrench className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Schnell</h3>
                <p className="text-gray-600">Kurzgutachten bis 750€</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Objektiv</h3>
                <p className="text-gray-600">Faire und kostengünstige Gutachten</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action - Minimal Design */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          {/* Subtle Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/30"></div>
          
          {/* Main Content */}
          <div className="relative z-10 text-center py-12 px-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                <Car className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 italic">
              Bei Unfallschaden
              <br />
              zu Messerschmidt fahren!
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-700 mb-8">
              Wir kommen auch zu Ihnen vorbei
              <span className="block text-gray-600 mt-1">
                Termine nach Vereinbarung
              </span>
            </p>
            
            {/* Action Button */}
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Car className="h-5 w-5 mr-2" />
                Termin vereinbaren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}