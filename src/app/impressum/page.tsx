import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Impressum() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Impressum</h1>
          <p className="text-lg text-gray-600">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Anbieter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dirk Messerschmidt</h3>
                <p className="text-gray-600">Sachverständiger</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Anschrift:</h4>
                <p className="text-gray-600">
                  Musterstraße 123<br />
                  12345 Musterstadt<br />
                  Deutschland
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Kontakt:</h4>
                <p className="text-gray-600">
                  Telefon: +49 170 12345678<br />
                  E-Mail: info@gutachter-messerschmidt.de
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Berufsbezeichnung und berufsrechtliche Regelungen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Die Berufsbezeichnung &ldquo;Sachverständiger&rdquo; wurde in Deutschland verliehen.
              </p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Zuständige Kammer:</h4>
                <p className="text-gray-600">
                  Industrie- und Handelskammer Musterstadt<br />
                  Musterstraße 456<br />
                  12345 Musterstadt
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Berufsrechtliche Regelungen:</h4>
                <p className="text-gray-600">
                  Die berufsrechtlichen Regelungen können bei der zuständigen Kammer eingesehen werden.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Umsatzsteuer-ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE123456789
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dirk Messerschmidt<br />
                Musterstraße 123<br />
                12345 Musterstadt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Haftung für Inhalte</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p className="text-gray-600">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Haftung für Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p className="text-gray-600">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Urheberrecht</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="text-gray-600">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Streitschlichtung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline ml-1">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
