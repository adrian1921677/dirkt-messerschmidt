import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, CheckCircle, Calendar, MessageSquare, Award, Send, Zap, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Ablauf() {
  const steps = [
    {
      number: "1",
      title: "WhatsApp Kontakt",
      description: "Kontaktieren Sie mich direkt über WhatsApp",
      details: [
        "Schnelle Nachricht über WhatsApp senden",
        "Gewünschtes Datum und Uhrzeit mitteilen",
        "Kurze Beschreibung Ihres Anliegens",
        "Sofortige Antwort garantiert"
      ],
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      duration: "2 Min",
      cost: "Kostenlos"
    },
    {
      number: "2",
      title: "Terminbestätigung",
      description: "Sofortige Bestätigung über WhatsApp",
      details: [
        "Schnelle Bestätigung per WhatsApp",
        "Termindetails und Uhrzeit",
        "Treffpunkt und Kontaktdaten",
        "Vorbereitungshinweise"
      ],
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      duration: "Sofort",
      cost: "Kostenlos"
    },
    {
      number: "3",
      title: "Vorbereitung",
      description: "Vorbereitung der Begutachtung",
      details: [
        "Relevante Unterlagen sammeln",
        "Zugang zum Objekt sicherstellen",
        "Spezifische Fragen notieren",
        "Terminbestätigung nochmals prüfen"
      ],
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      duration: "1-2 Tage",
      cost: "Kostenlos"
    },
    {
      number: "4",
      title: "Begutachtung",
      description: "Professionelle Vor-Ort-Begutachtung",
      details: [
        "Detaillierte Dokumentation",
        "Fotografische Beweisführung",
        "Messungen und Analysen",
        "Erste Einschätzung vor Ort"
      ],
      icon: <Award className="h-8 w-8 text-blue-600" />,
      duration: "1-4 Stunden",
      cost: "Nach Aufwand"
    },
    {
      number: "5",
      title: "Gutachtenerstellung",
      description: "Erstellung des detaillierten Gutachtens",
      details: [
        "Schriftlicher Bericht",
        "Fotografische Dokumentation",
        "Technische Zeichnungen",
        "Empfehlungen und Maßnahmen"
      ],
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      duration: "3-10 Tage",
      cost: "Nach Vereinbarung"
    },
    {
      number: "6",
      title: "Übergabe & Nachbetreuung",
      description: "Übergabe des Gutachtens und Nachbetreuung",
      details: [
        "Digitale und gedruckte Version",
        "Mündliche Erläuterung",
        "Nachfragen beantworten",
        "Umsetzungsunterstützung"
      ],
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      duration: "1-2 Stunden",
      cost: "Inklusive"
    }
  ];


  const requirements = [
    {
      title: "Was Sie mitbringen sollten",
      items: [
        "Relevante Unterlagen und Dokumente",
        "Zugang zum zu begutachtenden Objekt",
        "Kontaktdaten für Rückfragen",
        "Spezifische Fragen oder Anforderungen"
      ]
    },
    {
      title: "Was ich mitbringe",
      items: [
        "Professionelle Messgeräte",
        "Fotografische Ausrüstung",
        "Laptop für sofortige Dokumentation",
        "Alle notwendigen Formulare"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Der Ablauf
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ein transparenter und strukturierter Prozess von der ersten Anfrage 
            bis zur Übergabe Ihres professionellen Gutachtens.
          </p>
        </div>

        {/* Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Schritt-für-Schritt Anleitung
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Step Number & Icon */}
                    <div className="lg:col-span-2 bg-green-50 p-8 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                        {step.number}
                      </div>
                      <div className="mb-4">
                        {step.icon}
                      </div>
                      <div className="text-center">
                        <Badge variant="outline" className="mb-2">{step.duration}</Badge>
                        <Badge variant="secondary">{step.cost}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-10 p-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 mb-4">
                          {step.description}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Requirements */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Vorbereitung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {requirements.map((req, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="h-6 w-6 mr-2 text-blue-600" />
                    {req.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {req.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* WhatsApp CTA - Hauptfokus */}
        <section className="relative py-24 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 overflow-hidden rounded-2xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-76 h-76 bg-white/5 rounded-full -translate-x-38 -translate-y-38"></div>
          <div className="absolute top-0 right-0 w-68 h-68 bg-white/5 rounded-full translate-x-34 -translate-y-34"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-36 translate-y-36"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-30 translate-y-30"></div>
          
          {/* Main Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Fragen zum Ablauf?
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
              Kontaktieren Sie mich direkt über WhatsApp für eine schnelle und persönliche Beratung.
            </p>
            
            {/* WhatsApp Button - Hauptfokus */}
            <div className="flex justify-center mb-8">
              <a
                href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20Fragen%20zum%20Ablauf%20der%20Gutachtenerstellung."
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative bg-white text-green-600 hover:bg-gray-100 font-bold py-6 px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden text-xl"
              >
                <div className="absolute inset-0 bg-green-100/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-4">
                  <Send className="h-6 w-6 group-hover/btn:animate-bounce" />
                  <span>WhatsApp Chat starten</span>
                  <Zap className="h-5 w-5 group-hover/btn:animate-pulse" />
                </div>
              </a>
            </div>
            
            {/* Alternative Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="bg-white/20 text-white hover:bg-white/30 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group/calendar text-lg backdrop-blur-sm">
                <Link href="/termin-anfragen">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5" />
                    <span>Termin anfragen</span>
                    <div className="w-2 h-2 bg-white rounded-full group-hover/calendar:animate-ping"></div>
                  </div>
                </Link>
              </Button>
              
              <Button asChild size="lg" className="bg-white/20 text-white hover:bg-white/30 font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group/contact text-lg backdrop-blur-sm">
                <Link href="/kontakt">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5" />
                    <span>Kontakt aufnehmen</span>
                    <div className="w-2 h-2 bg-white rounded-full group-hover/contact:animate-ping"></div>
                  </div>
                </Link>
              </Button>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-16 flex justify-center space-x-12 text-white/30">
              <div className="text-5xl">💬</div>
              <div className="text-5xl">📱</div>
              <div className="text-5xl">⚡</div>
              <div className="text-5xl">✅</div>
            </div>
            
            {/* Bottom Accent */}
            <div className="mt-12 w-40 h-1 bg-white/50 rounded-full mx-auto"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
