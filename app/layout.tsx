import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"
import { InnerLabProvider } from "@/context/innerlab-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InnerLab - Laboratorio de Identidad Creativa",
  description: "Configura y explora tu identidad creativa con InnerLab",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <InnerLabProvider>{children}</InnerLabProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
