import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, Euro, Car, Wrench, Phone, MessageCircle } from "lucide-react";

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

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-center text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Service und Termine unter: 0202 / 423 110
          </h2>
          <p className="text-lg mb-6">
            Gerne auch per SMS oder Whatsapp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              <Phone className="h-5 w-5 mr-2" />
              Jetzt anrufen
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

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

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-green-600 mb-4 italic">
              Bei Unfallschaden zu Messerschmidt fahren!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Wir kommen auch zu Ihnen vorbei - Termine nach Vereinbarung
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <Car className="h-5 w-5 mr-2" />
              Termin vereinbaren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}