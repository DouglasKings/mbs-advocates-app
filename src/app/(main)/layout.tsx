/**
 * Main Layout Component
 * ====================
 *
 * This layout wraps the main public-facing pages and provides:
 * - Consistent navigation header
 * - Professional footer
 * - Responsive design structure
 *
 * The (main) folder is a Next.js route group that doesn't affect URLs
 * but allows us to apply this layout to specific pages.
 */

import type React from "react"
import Link from "next/link"
import Image from "next/image"

/**
 * Main Layout Component
 *
 * Provides navigation and footer structure for public pages.
 *
 * @param children - Page content (e.g., home page sections)
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* --------------------------------------------------------- */}
      {/* Navigation Header - Sticky positioning for easy access   */}
      {/* --------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand Name */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            <Image
              src="/images/assets/logo.png" // Updated path
              alt="MBS Advocates Legal Firm Logo"
              width={80}
              height={80}
              className="h-20 w-20 object-contain"
              priority // Load logo immediately for better UX
            />
            <span>MBS Advocates</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden space-x-6 md:flex">
            <Link href="/" className="text-sm font-bold hover:text-gray-700 transition-colors">
              Home
            </Link>
            <Link href="/#about" className="text-sm font-bold hover:text-gray-700 transition-colors">
              About
            </Link>
            <Link href="/#services" className="text-sm font-bold hover:text-gray-700 transition-colors">
              Services
            </Link>
            <Link href="/#contact" className="text-sm font-bold hover:text-gray-700 transition-colors">
              Contact
            </Link>
          </div>

          {/* Call-to-Action Button */}
          <Link
            href="/#contact"
            className="hidden md:flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            Get Legal Consultation
          </Link>
        </nav>
      </header>

      {/* --------------------------------------------------------- */}
      {/* Main Content Area                                         */}
      {/* --------------------------------------------------------- */}
      <main className="flex-1">{children}</main>

      {/* --------------------------------------------------------- */}
      {/* Professional Footer                                       */}
      {/* --------------------------------------------------------- */}
      <footer className="w-full border-t bg-gray-50 py-8 text-center text-gray-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Copyright Information */}
          <p className="font-bold">&copy; {new Date().getFullYear()} MBS Advocates. All rights reserved.</p>

          {/* Developer Credit */}
          <p className="mt-2 text-sm font-bold">
            Professional website developed by{" "}
            <a
              href="https://douglaskings.dev" // Replace with your actual portfolio URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:underline transition-colors"
            >
              Douglas Kings Kato
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
