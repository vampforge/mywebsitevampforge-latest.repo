import type React from "react"
import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "@/app/globals.css"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })

export const metadata: Metadata = {
  title: "VampForge - Ignite Your Brand",
  description: "Powering visionaries, creators & future-forward brands with cutting-edge digital experiences.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans bg-black text-white antialiased overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
