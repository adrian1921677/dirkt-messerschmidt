"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar, MessageCircle } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigation = [
    { name: "Startseite", href: "/", icon: "🏠" },
    { name: "Gutachten", href: "/gutachten", icon: "📋" },
    { name: "Leistungen", href: "/leistungen", icon: "⚡" },
    { name: "Ablauf", href: "/ablauf", icon: "🔄" },
    { name: "Kontakt", href: "/kontakt", icon: "💬" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="h-16 w-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/logo.png" 
                  alt="Dirk Messerschmidt Logo" 
                  width={64}
                  height={64}
                  className="h-14 w-14 transition-all duration-300 group-hover:rotate-3"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 transition-all duration-300 hover:bg-green-50 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
              <Link href="/termin-anfragen" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 group-hover:animate-bounce" />
                <span>Termin anfragen</span>
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
              <a href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage." target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 group-hover:animate-bounce" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg hover:bg-green-50 transition-all duration-300"
            >
              <div className="relative">
                <Menu className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`h-6 w-6 absolute top-0 left-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3 border-t bg-gradient-to-b from-white to-green-50">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-100 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-xl group-hover:animate-bounce">{item.icon}</span>
                <span>{item.name}</span>
                <div className="ml-auto w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-8"></div>
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <Link href="/termin-anfragen" className="flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Termin anfragen</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                <a href="https://wa.me/491711415899?text=Hallo%20Herr%20Messerschmidt,%20ich%20habe%20eine%20Frage." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                  <MessageCircle className="h-5 w-5 group-hover:animate-bounce" />
                  <span>WhatsApp Chat</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
