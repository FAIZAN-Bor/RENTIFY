import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/contexts/AuthContext"
import LangHtml from "@/components/LangHtml"
import { TranslationProvider } from "@/hooks/useTranslation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rentify - Car Rental Aggregator",
  description: "Find and compare the best car rental deals from multiple providers",
    generator: 'v0.dev'
}
// haha
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <AuthProvider>
          <TranslationProvider>
            <LangHtml>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </LangHtml>
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
