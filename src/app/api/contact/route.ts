import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, email, phone, message, consent } = body

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

    // For now, just return success
    // In production, this would save to database and send emails
    console.log("Contact form submission:", { name, email, phone, message })

    return NextResponse.json(
      { message: "Nachricht erfolgreich gesendet" },
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
