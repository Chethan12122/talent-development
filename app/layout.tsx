import type React from "react"
import { Inter } from "next/font/google"
import ClientLayout from "./clientlayout"
import "../src/index.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Talent Development - Athletics",
  description: "Athletics talent development system for Udupi schools",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
