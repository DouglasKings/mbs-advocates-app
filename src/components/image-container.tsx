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
 * - Proper handling of fill vs explicit dimensions
 */

"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface ImageContainerProps
  extends Omit<ImageProps, "onError" | "onLoad"> {
  wrapperClassName?: string;
  fallbackSrc?: string;
  showLoadingState?: boolean;
  objectPosition?: string; // For controlling image focus
}

export function ImageContainer({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "/placeholder.svg?height=400&width=400",
  showLoadingState = false,
  objectPosition = "object-center",
  fill, // Extract fill prop to handle separately
  width, // Extract width prop
  height, // Extract height prop
  ...props
}: ImageContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setCurrentSrc(fallbackSrc);
  };

  // Determine if we should use fill or explicit dimensions
  const shouldUseFill = fill || (!width && !height);

  return (
    <div
      className={cn("relative overflow-hidden", wrapperClassName, {
        "w-full h-full": shouldUseFill,
        "inline-block": !shouldUseFill,
      })}
    >
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        </div>
      )}
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        fill={shouldUseFill ? true : undefined} // Only use fill when appropriate
        width={shouldUseFill ? undefined : width} // Only use width when not using fill
        height={shouldUseFill ? undefined : height} // Only use height when not using fill
        className={cn(
          "transition-opacity duration-300",
          objectPosition,
          isLoading ? "opacity-0" : "opacity-100",
          hasError ? "opacity-75" : "",
          shouldUseFill ? "object-cover" : "", // Ensure fill images cover their container
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {hasError && (
        <div className="absolute bottom-2 right-2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-75">
          Placeholder
        </div>
      )}
    </div>
  );
}
