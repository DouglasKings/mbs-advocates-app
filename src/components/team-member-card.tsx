import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ImageContainer } from "@/components/image-container";
import type { TeamMemberCardProps } from "@/types/team-member-card";

export function TeamMemberCard({
  id,
  name,
  title,
  description,
  imageUrl,
  imageAlt,
}: TeamMemberCardProps) {
  return (
    <Link
      href={`/team/${id}`}
      className="block h-full group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
    >
      <Card className="flex flex-col items-center text-center p-6 shadow-md h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
        {/* Use explicit dimensions instead of fill */}
        <div className="relative mb-4">
          <ImageContainer
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={144}
            height={144}
            className="rounded-full object-cover object-top"
            wrapperClassName="w-36 h-36" // Container dimensions
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm font-medium text-gray-600 mb-4">{title}</p>
        <CardContent className="p-0 text-gray-700 text-sm flex-grow">
          <p>
            {description.substring(0, 80)}
            {description.length > 80 ? "..." : ""}
          </p>
        </CardContent>
        <div className="mt-auto pt-4">
          <span className="text-sm font-bold text-blue-600 group-hover:underline">
            Click to view full profile →
          </span>
        </div>
      </Card>
    </Link>
  );
}
