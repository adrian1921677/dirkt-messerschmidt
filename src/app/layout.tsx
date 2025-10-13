import type { Metadata } from "next";
import { Manrope, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { QRCodeAnimation } from "@/components/qr-code-animation";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-manrope",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Dirk Messerschmidt - Sachverständiger",
  description: "Professionelle Gutachten und sachverständige Beratung mit jahrelanger Erfahrung und höchster Qualität.",
  keywords: "Sachverständiger, Gutachten, Beratung, Dirk Messerschmidt",
  authors: [{ name: "Dirk Messerschmidt" }],
  openGraph: {
    title: "Dirk Messerschmidt - Sachverständiger",
    description: "Professionelle Gutachten und sachverständige Beratung",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${manrope.variable} ${workSans.variable}`}>
      <body className="font-work-sans antialiased min-h-screen flex flex-col">
            <AuthSessionProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              {/* Globaler QR-Code - sichtbar auf allen Seiten außer Admin */}
              <QRCodeAnimation qrCodePath="/qr-code.png?v=2" isGlobal={true} delay={3000} />
            </AuthSessionProvider>
      </body>
    </html>
  );
}
