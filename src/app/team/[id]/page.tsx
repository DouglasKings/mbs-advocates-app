/**
 * @file src/app/team/[id]/page.tsx
 * @description Renders the detailed profile page for a single team member.
 */

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTeamMemberById, getTeamMembers } from "@/actions/team";
import type { Metadata } from "next";

// FIXED: Interface now expects params as a Promise (Next.js 15 requirement)
interface TeamMemberPageProps {
  params: Promise<{ id: string }>;
}

/**
 * The server component for an individual team member's page.
 * It fetches the specific member's data based on the ID in the URL.
 */
export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  // FIXED: Await params before destructuring (Next.js 15 requirement)
  const { id } = await params;
  const { data: member, success } = await getTeamMemberById(id);

  // If no member is found for the given ID, display a 404 page.
  if (!success || !member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/#team">
            <Button
              variant="outline"
              className="mb-4 bg-transparent hover:bg-white"
            >
              ← Back to Team
            </Button>
          </Link>
        </div>
        <Card className="overflow-hidden shadow-xl border-0">
          <CardContent className="p-0">
            {/* The responsive layout adjusts from column to row on large screens */}
            <div className="lg:flex">
              {/* Image Section - FIXED: Added explicit height to container */}
              <div className="lg:w-2/5 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-[320px] aspect-square h-80">
                  <Image
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.image_alt}
                    fill
                    className="object-cover object-top rounded-2xl shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 320px"
                    priority={true}
                  />
                </div>
              </div>

              {/* Information Section */}
              <div className="lg:w-3/5 p-8 sm:p-12">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    {member.name}
                  </h1>
                  <p className="text-2xl text-blue-600 font-semibold">
                    {member.title}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    Professional Background
                  </h2>
                  <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {member.description ||
                      "Professional information will be updated soon."}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// FIXED: generateStaticParams also awaits params
export async function generateStaticParams() {
  const { data: members } = await getTeamMembers();
  if (!members || members.length === 0) return [];
  return members.map((member) => ({ id: member.id! }));
}

// FIXED: generateMetadata now awaits params before destructuring
export async function generateMetadata({
  params,
}: TeamMemberPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: member } = await getTeamMemberById(id);

  if (!member) {
    return { title: "Team Member Not Found | MBS Advocates" };
  }

  return {
    title: `${member.name} - ${member.title} | MBS Advocates`,
    description: `Learn more about ${member.name}, ${member.title} at MBS Advocates. ${member.description.substring(0, 150)}...`,
  };
}
