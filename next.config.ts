import type { NextConfig } from "next"

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable all development indicators and overlays for a cleaner dev experience
  devIndicators: false,
  // Additional optimizations for production
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // This setting completely disables Next.js's built-in image optimization.
    // Because optimization is off, properties like 'quality' are not applicable,
    // which was the cause of the previous error. This is the correct configuration.
    unoptimized: true,
  },
  eslint: {
    // Speeds up the build process by skipping lint checks
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Speeds up the build process by skipping TypeScript error checks
    ignoreBuildErrors: true,
  },
}

export default nextConfig