import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Beschreibung */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Dirk Messerschmidt</h3>
                <p className="text-gray-400">Sachverständiger</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Professionelle Gutachten und sachverständige Beratung mit jahrelanger Erfahrung 
              und höchster Qualität.
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">0202 / 423 110</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">www.messerschmidt.eu</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">
                  Alt-Wolfshahn 12<br />
                  42117 Wuppertal
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors">
                Startseite
              </Link>
              <Link href="/gutachten" className="block text-gray-400 hover:text-white transition-colors">
                Gutachten
              </Link>
              <Link href="/leistungen" className="block text-gray-400 hover:text-white transition-colors">
                Leistungen
              </Link>
              <Link href="/ablauf" className="block text-gray-400 hover:text-white transition-colors">
                Ablauf
              </Link>
              <Link href="/kontakt" className="block text-gray-400 hover:text-white transition-colors">
                Kontakt
              </Link>
              <Link href="/termin-anfragen" className="block text-gray-400 hover:text-white transition-colors">
                Termin anfragen
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Dirk Messerschmidt. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/impressum" className="text-gray-400 hover:text-white transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

