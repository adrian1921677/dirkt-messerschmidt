import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Phone, FileText, CheckCircle, Calendar, Mail, MessageSquare, Award } from "lucide-react";
import Link from "next/link";

export default function Ablauf() {
  const steps = [
    {
      number: "1",
      title: "Erstkontakt",
      description: "Kontaktieren Sie mich telefonisch oder per E-Mail",
      details: [
        "Kostenlose Erstberatung",
        "Klärung Ihres Anliegens",
        "Einschätzung der Machbarkeit",
        "Grobe Kostenschätzung"
      ],
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      duration: "15-30 Min",
      cost: "Kostenlos"
    },
    {
      number: "2",
      title: "Angebotserstellung",
      description: "Detailliertes Angebot mit Kosten und Zeitrahmen",
      details: [
        "Schriftliches Angebot",
        "Detaillierte Kostenaufstellung",
        "Zeitplan für die Bearbeitung",
        "Leistungsumfang-Definition"
      ],
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      duration: "1-2 Tage",
      cost: "Kostenlos"
    },
    {
      number: "3",
      title: "Terminvereinbarung",
      description: "Flexible Terminvereinbarung für die Begutachtung",
      details: [
        "Online-Kalender verfügbar",
        "Flexible Zeiten",
        "Vor-Ort-Termin oder Remote",
        "Terminbestätigung per E-Mail"
      ],
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      duration: "Sofort",
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

  const timeline = [
    {
      phase: "Vorbereitung",
      duration: "1-2 Tage",
      tasks: [
        "Erstberatung und Angebotserstellung",
        "Terminvereinbarung",
        "Vorbereitung der Begutachtung"
      ]
    },
    {
      phase: "Begutachtung",
      duration: "1-4 Stunden",
      tasks: [
        "Vor-Ort-Termin",
        "Detaillierte Dokumentation",
        "Erste Einschätzung"
      ]
    },
    {
      phase: "Auswertung",
      duration: "3-10 Tage",
      tasks: [
        "Analyse der gesammelten Daten",
        "Erstellung des Gutachtens",
        "Qualitätskontrolle"
      ]
    },
    {
      phase: "Übergabe",
      duration: "1-2 Stunden",
      tasks: [
        "Präsentation der Ergebnisse",
        "Mündliche Erläuterung",
        "Nachbetreuung"
      ]
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
                    <div className="lg:col-span-2 bg-blue-50 p-8 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
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

        {/* Timeline */}
        <section className="mb-20 bg-gray-50 py-16 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Zeitplan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Übersichtliche Darstellung der verschiedenen Phasen und deren Dauer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{phase.phase}</CardTitle>
                  <Badge variant="outline">{phase.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{task}</span>
                      </li>
                    ))}
                  </ul>
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

        {/* Contact CTA */}
        <section className="bg-blue-600 py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Haben Sie Fragen zum Ablauf?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ich berate Sie gerne persönlich und erkläre Ihnen den gesamten Prozess im Detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/kontakt">
                <Mail className="h-5 w-5 mr-2" />
                Kontakt aufnehmen
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/termin-anfragen">
                <Calendar className="h-5 w-5 mr-2" />
                Termin anfragen
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
