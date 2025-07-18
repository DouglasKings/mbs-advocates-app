/**
 * Image Container Component
 * ========================
 *
 * A wrapper component for Next.js Image with enhanced error handling,
 * loading states, and consistent styling across the application.
 *
 * Features:
 * - Automatic fallback to placeholder on error
 * - Loading state management
 * - Responsive image handling
 * - Accessibility improvements
 */

"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

/**
 * Extended Image Props Interface
 * Extends Next.js ImageProps with additional styling options
 */
export interface ImageContainerProps extends Omit<ImageProps, "onError" | "onLoad"> {
  wrapperClassName?: string // Additional classes for the wrapper div
  fallbackSrc?: string // Custom fallback image URL
  showLoadingState?: boolean // Whether to show loading spinner
}

/**
 * Image Container Component
 *
 * Provides enhanced image handling with error states and loading indicators.
 *
 * @param props - Extended image props with additional options
 */
export function ImageContainer({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  showLoadingState = false,
  ...props
}: ImageContainerProps) {
  // State management for loading and error handling
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  /**
   * Handle image load success
   * Clears loading state when image loads successfully
   */
  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  /**
   * Handle image load error
   * Switches to fallback image and clears loading state
   */
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    setCurrentSrc(fallbackSrc)
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {/* Loading State Indicator */}
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        </div>
      )}

      {/* Main Image Component */}
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError ? "opacity-75" : "",
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error State Indicator (optional visual cue) */}
      {hasError && (
        <div className="absolute bottom-2 right-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-75">
          Placeholder
        </div>
      )}
    </div>
  )
}
