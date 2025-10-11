"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const navigation = [
    { name: "Startseite", href: "/" },
    { name: "Gutachten", href: "/gutachten" },
    { name: "Leistungen", href: "/leistungen" },
    { name: "Ablauf", href: "/ablauf" },
    { name: "Kontakt", href: "/kontakt" },
  ]

  // Admin-Link (in Produktion würde hier eine Authentifizierung stattfinden)
  useEffect(() => {
    setIsAdmin(
      typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname.includes('admin'))
    )
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-12 w-12 flex items-center justify-center">
                    <img 
                      src="/logo.svg" 
                      alt="Dirk Messerschmidt Logo" 
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-gray-900">
                      Dirk Messerschmidt
                    </h1>
                    <p className="text-sm text-gray-600">Sachverständiger</p>
                  </div>
                </Link>
              </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild size="sm">
              <Link href="/termin-anfragen">
                Termin anfragen
              </Link>
            </Button>
            {isAdmin && (
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/login">
                  Admin
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button asChild className="w-full">
                  <Link href="/termin-anfragen">
                    Termin anfragen
                  </Link>
                </Button>
                {isAdmin && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/login">
                      Admin-Bereich
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
