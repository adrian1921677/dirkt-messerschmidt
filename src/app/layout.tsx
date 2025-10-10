import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
