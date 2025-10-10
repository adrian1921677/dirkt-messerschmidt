import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Datenschutz() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Datenschutzerklärung</h1>
          <p className="text-lg text-gray-600">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Datenschutz auf einen Blick</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-2">Allgemeine Hinweise</h3>
              <p className="text-gray-600 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-gray-600">
                Die Datenerfassung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; in dieser Datenschutzerklärung entnehmen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Verantwortliche Stelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Dirk Messerschmidt<br />
                  Musterstraße 123<br />
                  12345 Musterstadt<br />
                  Deutschland<br />
                  <br />
                  Telefon: +49 170 12345678<br />
                  E-Mail: info@gutachter-messerschmidt.de
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Datenerfassung auf dieser Website</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-2">Kontaktformular</h3>
              <p className="text-gray-600 mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Terminanfragen</h3>
              <p className="text-gray-600 mb-4">
                Bei der Terminanfrage über unser Online-Formular werden folgende Daten erfasst und gespeichert:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Name und Kontaktdaten</li>
                <li>Gewünschter Termin</li>
                <li>Beschreibung des Anliegens</li>
                <li>Hochgeladene Dokumente (falls vorhanden)</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mb-2">Rechtsgrundlage</h3>
              <p className="text-gray-600">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. WhatsApp-Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Diese Website bietet die Möglichkeit, direkt über WhatsApp mit uns zu kommunizieren. Wenn Sie diese Funktion nutzen, werden Sie zu WhatsApp weitergeleitet.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Hinweise zur Datenverarbeitung durch WhatsApp</h3>
              <p className="text-gray-600 mb-4">
                WhatsApp ist ein Dienst der Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Wenn Sie WhatsApp nutzen, werden Ihre Daten durch Meta verarbeitet. Weitere Informationen finden Sie in der Datenschutzerklärung von WhatsApp:
              </p>
              <p className="text-gray-600 mb-4">
                <a href="https://www.whatsapp.com/privacy" className="text-blue-600 hover:underline">
                  https://www.whatsapp.com/privacy
                </a>
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Rechtsgrundlage</h3>
              <p className="text-gray-600">
                Die Nutzung von WhatsApp erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen, indem Sie die Kommunikation über WhatsApp beenden.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Speicherdauer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Die von Ihnen über das Kontaktformular oder bei der Terminanfrage übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Automatische Löschung</h3>
              <p className="text-gray-600">
                Kontaktanfragen werden nach 12 Monaten automatisch gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen. Terminanfragen werden nach 24 Monaten gelöscht.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Ihre Rechte</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:
              </p>
              
              <ul className="space-y-2 text-gray-600">
                <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, Auskunft über die von uns verarbeiteten personenbezogenen Daten zu verlangen.</li>
                <li><strong>Berichtigungsrecht (Art. 16 DSGVO):</strong> Sie haben das Recht auf Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten.</li>
                <li><strong>Löschungsrecht (Art. 17 DSGVO):</strong> Sie haben das Recht auf Löschung Ihrer personenbezogenen Daten.</li>
                <li><strong>Einschränkungsrecht (Art. 18 DSGVO):</strong> Sie haben das Recht auf Einschränkung der Verarbeitung.</li>
                <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, der Verarbeitung zu widersprechen.</li>
                <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht auf Übertragung Ihrer Daten.</li>
                <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Datensicherheit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Falls Ihr Browser keine 256 Bit Verschlüsselung unterstützt, greifen wir auf 128 Bit v3 Technologie zurück.
              </p>
              
              <p className="text-gray-600">
                Ob eine einzelne Seite unseres Internetauftritts verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des Schlüssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres Browsers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Änderungen dieser Datenschutzerklärung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Dirk Messerschmidt<br />
                  Musterstraße 123<br />
                  12345 Musterstadt<br />
                  Deutschland<br />
                  <br />
                  E-Mail: info@gutachter-messerschmidt.de<br />
                  Telefon: +49 170 12345678
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
