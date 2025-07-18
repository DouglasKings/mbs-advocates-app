/**
 * Skeleton Components
 * ===================
 *
 * Provides placeholder UI elements to display while content is loading.
 * Improves user experience by indicating that content is on its way.
 */

import { Card, CardContent, CardHeader } from "@/components/ui/card"

/**
 * Team Member Card Skeleton
 *
 * Displays a loading placeholder for a team member card.
 */
export function TeamMemberCardSkeleton() {
  return (
    <Card className="flex flex-col items-center text-center p-6 shadow-md h-full animate-pulse">
      {/* Placeholder for image */}
      <div className="w-36 h-36 rounded-full bg-gray-200 mb-4 aspect-square" />

      {/* Placeholder for name */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-1" />

      {/* Placeholder for title */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

      {/* Placeholder for description */}
      <CardContent className="p-0 w-full flex-grow space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </CardContent>
    </Card>
  )
}

/**
 * Service Card Skeleton
 *
 * Displays a loading placeholder for a service card.
 */
export function ServiceCardSkeleton() {
  return (
    <Card className="flex flex-col h-full shadow-md animate-pulse">
      <CardHeader>
        {/* Placeholder for title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        {/* Placeholder for description */}
        <div className="h-4 bg-gray-200 rounded w-full" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        {/* Placeholder for content */}
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </CardContent>
    </Card>
  )
}
