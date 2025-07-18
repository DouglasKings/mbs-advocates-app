/**
 * Root Layout Component
 * ====================
 *
 * This is the application's root layout that wraps all pages.
 * It sets up global HTML structure, fonts, metadata, and global components.
 *
 * Key Features:
 * - Global font configuration (Inter)
 * - SEO metadata and favicon
 * - Global toast notification system
 * - Smooth scrolling behavior
 */

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import type { Viewport } from "next"

// Configure Inter font with Latin subset for optimal loading
const inter = Inter({ subsets: ["latin"] })

// SEO and metadata configuration
export const metadata: Metadata = {
  title: "MBS Advocates - Professional Legal Services in Uganda",
  description:
    "MBS Advocates provides expert legal services with integrity and expertise. Specializing in corporate law, litigation, real estate, family law, and more in Kampala, Uganda.",
  keywords:
    "MBS Advocates, legal services, law firm, corporate law, litigation, real estate law, family law, intellectual property, employment law, Uganda legal services, Kampala lawyers",
  authors: [{ name: "MBS Advocates" }],
  creator: "Douglas Kings Kato",

  // Open Graph metadata for social sharing
  openGraph: {
    title: "MBS Advocates - Professional Legal Services",
    description: "Expert legal services with integrity and a client-centric approach in Uganda.",
    type: "website",
    locale: "en_US",
  },

  // Favicon configuration
  icons: {
    icon: "/images/assets/favicon.ico",
    shortcut: "/images/assets/favicon.ico",
    apple: "/images/assets/favicon.ico",
  },
}

// Viewport configuration for responsive design (moved from metadata)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

/**
 * Root Layout Component
 *
 * Provides the basic HTML structure and global functionality for all pages.
 *
 * @param children - Page content to be rendered
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Main application content */}
        {children}

        {/* Global toast notification system */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Custom styling for consistency with design
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 5000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 6000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  )
}
