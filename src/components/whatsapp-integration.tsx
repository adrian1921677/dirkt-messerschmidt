"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, QrCode, ExternalLink } from "lucide-react"

interface WhatsAppIntegrationProps {
  phone: string
  message: string
}

export function WhatsAppIntegration({ phone, message }: WhatsAppIntegrationProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")

  useEffect(() => {
    // Generate QR Code for WhatsApp
    const generateQRCode = async () => {
      try {
        // In a real implementation, you would use a QR code library
        // For now, we'll create a placeholder
        // const qrCodeText = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
        
        // This is a placeholder - in production you'd use a proper QR code library
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = 200
          canvas.height = 200
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, 200, 200)
          ctx.fillStyle = '#000000'
          ctx.font = '12px Arial'
          ctx.textAlign = 'center'
          ctx.fillText('QR Code', 100, 100)
          ctx.fillText('Placeholder', 100, 120)
          setQrCodeDataUrl(canvas.toDataURL())
        }
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQRCode()
  }, [phone, message])

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* WhatsApp Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="h-6 w-6 mr-2 text-green-600" />
            WhatsApp Chat
          </CardTitle>
          <CardDescription>
            Starten Sie direkt einen WhatsApp-Chat mit mir
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp-Chat starten
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
          <p className="text-sm text-gray-600">
            Klicken Sie auf den Button, um WhatsApp zu öffnen und direkt mit mir zu chatten.
          </p>
        </CardContent>
      </Card>

      {/* QR Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="h-6 w-6 mr-2 text-blue-600" />
            QR-Code
          </CardTitle>
          <CardDescription>
            Scannen Sie den Code mit Ihrem Smartphone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              {qrCodeDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrCodeDataUrl}
                  alt="WhatsApp QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <QrCode className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">QR-Code wird generiert...</p>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Scannen Sie diesen Code mit der Kamera Ihres Smartphones, 
            um direkt zu WhatsApp zu gelangen.
          </p>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <div className="md:col-span-2">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">
            Hinweis zur Datenverarbeitung
          </h4>
          <p className="text-sm text-yellow-700">
            Bei der Nutzung von WhatsApp werden Ihre Daten durch Meta (Facebook) verarbeitet. 
            Weitere Informationen finden Sie in der{" "}
            <a href="/datenschutz" className="underline hover:no-underline">
              Datenschutzerklärung
            </a>{" "}
            von WhatsApp und in unserer{" "}
            <a href="/datenschutz" className="underline hover:no-underline">
              Datenschutzerklärung
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
