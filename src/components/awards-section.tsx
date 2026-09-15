/**
 * Awards & Recognition Section
 * =============================
 * Displays the firm's industry recognition and awards to build
 * credibility and trust before visitors reach the team/services sections.
 */

import Image from "next/image";

export function AwardsSection() {
  return (
    <section id="awards" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Awards &amp; Recognition
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Certificate image */}
          <div className="relative w-full aspect-[3/4] max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/images/awards/best-100-law-firms-2025-2026.jpg"
              alt="MBS Advocates - Best 100 Law Firms in Uganda 2025/2026 Award Certificate, Public Opinions"
              fill
              className="object-contain bg-white"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </div>

          {/* Award description */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-wide text-yellow-600">
              Public Opinions &middot; 2025/2026
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              Best Corporate and Investment Advisory Law Firm
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              MBS Advocates has been recognised and rated on the prestigious
              list of the{" "}
              <span className="font-semibold">
                Best 100 Law Firms in Uganda
              </span>{" "}
              for 2025/2026 by Public Opinions, as published in the Public
              Opinions Journal for Best 100 Law Firms in Uganda.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The firm was also honoured with the{" "}
              <span className="font-semibold">
                Responsible Investment Global Award
              </span>{" "}
              for its exceptional commitment to international best practice and
              standards in legal services, and for promoting the principles of
              the Universal Declaration of Human Rights.
            </p>
            <p className="text-sm text-gray-500 pt-2">
              Certificate No: PO-RI/067-2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
