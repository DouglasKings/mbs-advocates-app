/**
 * @file src/app/(main)/page.tsx
 * @description This is the primary landing page for the MBS Advocates website.
 *              As a Next.js Server Component, it is responsible for fetching all
 *              necessary data for the page sections (like services and testimonials)
 *              during the server-side rendering process. It then assembles the
 *              various imported components and sections into a single, cohesive page.
 */

// Import UI components from shadcn/ui for a consistent and professional design system
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Import a custom, robust ImageContainer component that handles loading states and fallbacks
import { ImageContainer } from "@/components/image-container";
// Import modern, clean icons from the Lucide React library
import { Mail, Phone, MapPin, Star, X } from "lucide-react";
// Import interactive Client Components for forms, which handle their own state
import { ContactForm } from "@/components/contact-form";
import { TestimonialForm } from "@/components/testimonial-form";
// Import Server Actions used to securely fetch data from the Supabase database
import { getApprovedTestimonials } from "@/actions/testimonials";
import { getServices } from "@/actions/services";
// Import the dynamic TeamSection component, which encapsulates its own data fetching and rendering logic
import { TeamSection } from "@/components/team-section";
// Import the skeleton loader component to provide a better user experience while data is loading
import { ServiceCardSkeleton } from "@/components/skeletons";
// Import TypeScript type definitions for strict type-checking of data from the database
import type { Testimonial } from "@/lib/schema";
// Import the standard Next.js Image component for optimized image handling
import Image from "next/image";

/**
 * The main Home page component for the public-facing website.
 * This `async` component fetches initial data on the server before the page is sent to the client.
 * @returns {Promise<JSX.Element>} The fully rendered homepage with all its sections.
 */
export default async function Home() {
  // Fetch approved testimonials and services data from the database.
  // These requests run in parallel on the server for optimal performance.
  const { data: testimonials, success: testimonialsSuccess } = await getApprovedTestimonials();
  const { data: services, success: servicesSuccess } = await getServices();

  return (
    <div>
      {/* ========================================================= */}
      {/* HERO SECTION - The first impression and primary entry point of the website. */}
      {/* ========================================================= */}
      <section id="home" className="relative flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 py-16 text-center overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main firm logo, marked with `priority` to optimize for Largest Contentful Paint (LCP). */}
          <Image
            src="/images/assets/logo.png"
            alt="MBS Advocates - Professional Legal Services"
            width={240}
            height={240}
            className="mx-auto mb-0 object-contain mt-[-4rem]"
            priority
          />
          {/* Main heading for the firm. */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            MBS Advocates
          </h1>
          {/* A brief, compelling value proposition to engage visitors. */}
          <p className="mb-8 text-lg text-gray-600 sm:text-xl max-w-3xl mx-auto">
            MBS Advocates is a dynamic and client-focused law firm dedicated to providing exceptional legal services. Founded on principles of integrity, professionalism, and a deep understanding of the law, we strive to deliver practical and effective solutions tailored to our clients' unique needs.
          </p>
          {/* A clear call-to-action button that smoothly scrolls the user to the contact section. */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ABOUT SECTION - Provides detailed background on the firm. */}
      {/* ========================================================= */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">About MBS Advocates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Textual content describing the firm's history, leadership, and mission. */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                MBS Advocates is a premier full-service Ugandan law firm established in 2022. Our firm represents an amalgamation of the vast experiences and practices of eminent lawyers, creating a modern institution with deep roots in legal practice. We embody the best qualities of the legal profession: tenacious, adaptable, ready for hard work, and committed to our clients' causes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Our Leadership:</span><br/>
                Our team is led by experienced legal professionals who bring a wealth of knowledge and a meticulous approach to every case. Muhangi George (Managing Partner): A highly reputed disputes lawyer known for his strategic and effective representation.<br/>
                Matovu Ronald (Partner): A key partner contributing to the firm's diverse expertise and success.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Our Mission:</span><br/>
                To provide high-quality, business-oriented, innovative, and cost-effective legal solutions. We are committed to upholding the highest standards of legal practice, ensuring our clients receive diligent representation and sound advice to achieve favorable outcomes.<br/><br/>
                 <span className="font-bold">Our National and International Reach:</span><br/>
                With a network of high-quality, experienced lawyers, we are well-placed to service the requirements of our clients across Uganda. We are also adequately equipped to handle cross-border transactions, working with an established legal network to give seamless legal service worldwide.
              </p>
            </div>
            {/* An accompanying professional image to add visual context and appeal. */}
            <div className="relative w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg">
              <ImageContainer
                src="/images/team/13.jpg"
                alt="MBS Advocates professional team at work"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TEAM SECTION - Renders the dynamic team member component. */}
      {/* ========================================================= */}
      <TeamSection />

      {/* ========================================================= */}
      {/* SERVICES SECTION - Dynamically lists the firm's legal services. */}
      {/* ========================================================= */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Our Legal Services</h2>
          {/* Conditionally render the services if the data fetch was successful and data exists. */}
          {servicesSuccess && services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 text-sm">{service.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // If data is not yet available, display skeleton loaders to indicate loading.
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
            </div>
          )}
          {/* Display a user-friendly error message if the data fetch failed. */}
          {!servicesSuccess && (
            <p className="text-center text-red-600 mt-8">Failed to load services. Please try again later.</p>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS SECTION - Shows client feedback and a submission form. */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">What Our Clients Say</h2>
          {/* Conditionally render testimonials if available. */}
          {testimonialsSuccess && testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial.id} className="flex flex-col h-full shadow-md">
                  <CardContent className="p-6 flex-grow">
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.rating || 0 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />)}
                      {Array.from({ length: 5 - (testimonial.rating || 0) }).map((_, i) => <Star key={i + 5} className="h-5 w-5 text-gray-300" />)}
                    </div>
                    <p className="text-gray-700 italic mb-4">{`“${testimonial.comment}”`}</p>
                    <p className="font-semibold text-gray-900">- {testimonial.client_name}</p>
                    <p className="text-sm text-gray-500">{new Date(testimonial.created_at!).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Show a fallback message if no testimonials have been approved for display.
            <p className="text-center text-gray-600 mb-12">
              No testimonials yet. Be the first to share your experience with MBS Advocates!
            </p>
          )}
          {/* The form for users to submit new testimonials. */}
          <div className="max-w-lg mx-auto mb-8">
            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT SECTION - Provides a contact form and direct contact details. */}
      {/* ========================================================= */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
          <div className="grid grid-cols-1 gap-12">
            <ContactForm />
            <div className="space-y-8">
              <p className="text-lg text-gray-700">
                We are here to help. Please reach out to us with your legal inquiries, and our experienced team will get back to you promptly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span>Plot 26, Wampewo Avenue, Bakwanye House Level 2, West Wing, Opp. Hotel Africana, P.O.Box 111165, Kampala, Uganda</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span>+256 772 843 238, +256 702 672 369</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>info@mbsadvocates.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>mbsadvocatessolicitors@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <X className="h-5 w-5 text-gray-600" />
                  <span>
                    <a href="https://x.com/mbsLawyers" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                      @mbsLawyers
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LOCATION SECTION - An embedded Google Map for physical directions. */}
      {/* ========================================================= */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Find Us on the Map</h2>
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7590000000005!2d32.589000000000004!3d0.31500000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM%C2%B°MTgnNTQuMCJOIDMy%C2%B°MzUnMjAuNCJF!5e0!3m2!1sen!2sug!4v1678912345678!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MBS Advocates Office Location - Kampala, Uganda"
            />
          </div>
        </div>
      </section>
    </div>
  );
}