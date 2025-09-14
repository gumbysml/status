import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GetMist - Advanced Roblox Executor",
  description:
    "The most advanced Roblox executor with unparalleled performance and reliability. Experience seamless script execution like never before.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Hide any v0 badges */
            [data-v0-t], 
            .v0-badge,
            [class*="v0"],
            [id*="v0"],
            div[style*="v0"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
