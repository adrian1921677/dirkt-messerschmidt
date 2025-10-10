import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = (formData.get("name") as string) || ""
    const email = (formData.get("email") as string) || ""
    const phone = (formData.get("phone") as string) || ""
    const message = (formData.get("message") as string) || ""
    const consent = (formData.get("consent") as string) || ""

    // Validate required fields
    if (!name || !email || !message || consent !== "true") {
      return NextResponse.json(
        { error: "Alle Pflichtfelder müssen ausgefüllt werden" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      )
    }

    // Handle file uploads (placeholder - in production you'd upload to S3/R2)
    const files: string[] = []
    for (let i = 0; i < 5; i++) {
      const file = formData.get(`file_${i}`) as File
      if (file) {
        // In production, upload to S3/R2 and store the URL
        // For now, we'll just store the filename
        files.push(file.name)
      }
    }

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        files,
        consent: true
      }
    })

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: "noreply@gutachter-messerschmidt.de",
        to: process.env.ADMIN_EMAIL || "admin@gutachter-messerschmidt.de",
        subject: "Neue Kontaktanfrage",
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "Nicht angegeben"}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          ${files.length > 0 ? `<p><strong>Anhänge:</strong> ${files.join(", ")}</p>` : ""}
          <p><strong>Zeitstempel:</strong> ${new Date().toLocaleString("de-DE")}</p>
        `
      })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      // Don't fail the request if email fails
    }

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: "noreply@gutachter-messerschmidt.de",
        to: email,
        subject: "Ihre Nachricht wurde empfangen",
        html: `
          <h2>Vielen Dank für Ihre Nachricht!</h2>
          <p>Hallo ${name},</p>
          <p>vielen Dank für Ihre Nachricht. Ich habe Ihre Anfrage erhalten und werde mich schnellstmöglich bei Ihnen melden.</p>
          <p><strong>Ihre Nachricht:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p>Mit freundlichen Grüßen,<br>Dirk Messerschmidt</p>
        `
      })
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { message: "Nachricht erfolgreich gesendet", id: contactMessage.id },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Fehler beim Verarbeiten der Anfrage" },
      { status: 500 }
    )
  }
}
