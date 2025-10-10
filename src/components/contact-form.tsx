"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  consent: z.boolean().refine(val => val === true, "Sie müssen der Datenverarbeitung zustimmen")
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      const maxSize = 10 * 1024 * 1024 // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize
    })
    setFiles(prev => [...prev, ...validFiles].slice(0, 5)) // Max 5 files
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          message: data.message,
          consent: data.consent,
          files: files.map(file => file.name) // For now, just send filenames
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setFiles([])
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Kontaktformular</CardTitle>
        <CardDescription>
          Senden Sie mir eine Nachricht und ich melde mich schnellstmöglich bei Ihnen zurück.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Ihr vollständiger Name"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="ihre@email.de"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon (optional)</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+49 170 12345678"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Nachricht *</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Beschreiben Sie Ihr Anliegen..."
              rows={5}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.message.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="files">Anhänge (optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                PDF, JPG oder PNG (max. 10MB pro Datei, max. 5 Dateien)
              </p>
              <Input
                id="files"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('files')?.click()}
              >
                Dateien auswählen
              </Button>
            </div>
            
            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Ausgewählte Dateien:</p>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Consent */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="consent"
                {...register("consent")}
                className="mt-1"
              />
              <Label htmlFor="consent" className="text-sm">
                Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                <a href="/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </a>{" "}
                zu. *
              </Label>
            </div>
            {errors.consent && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800">Nachricht erfolgreich gesendet! Ich melde mich bald bei Ihnen.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich telefonisch.</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              "Nachricht senden"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
