

/**
 * Home Page Component (Server Component)
 * =====================================
 *
 * This is the main landing page that combines all website sections:
 * - Hero section with branding and CTA
 * - About section with firm information
 * - Team section with member profiles
 * - Services section with legal offerings
 * - Testimonials section with client feedback
 * - Contact section with form and information
 * - Location section with embedded map
 *
 * This is a Server Component that fetches testimonials at build/request time.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageContainer } from "@/components/image-container"
import { Mail, Phone, MapPin, Star, X } from 'lucide-react'
import { ContactForm } from "@/components/contact-form"
import { TestimonialForm } from "@/components/testimonial-form"
import { getApprovedTestimonials } from "@/actions/testimonials"
import { TeamSection } from "@/components/team-section"
import type { Testimonial } from "@/lib/schema"
import Image from "next/image"
import { getServices } from "@/actions/services" // Import the new action for services
import { ServiceCardSkeleton } from "@/components/skeletons" // Import skeleton for services

/**
 * Home Page Server Component
 *
 * Fetches testimonials, team members, and services server-side and renders all page sections.
 */
export default async function Home() {
  // Fetch approved testimonials from database (server-side)
  const { data: testimonials, success: testimonialsSuccess } = await getApprovedTestimonials()

  // Fetch services from database (server-side)
  const { data: services, success: servicesSuccess } = await getServices()

  return (
    <div>
      {/* ========================================================= */}
      {/* HERO SECTION - First impression with strong CTA          */}
      {/* ========================================================= */}
      <section
        id="home"
        className="relative flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 py-16 text-center overflow-hidden"
      >
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Prominent Logo Display */}
          <Image
            src="/images/assets/logo.png" // Updated path
            alt="MBS Advocates - Professional Legal Services"
            width={240}
            height={240}
            className="mx-auto mb-0 object-contain mt-[-4rem]"
            priority
          />

          {/* Main Heading */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            MBS Advocates
          </h1>

          {/* Value Proposition */}
          <p className="mb-8 text-lg text-gray-600 sm:text-xl max-w-3xl mx-auto">
            MBS Advocates is a dynamic and client-focused law firm dedicated to providing exceptional legal services. Founded on principles of integrity, professionalism, and a deep understanding of the law, we strive to deliver practical and effective solutions tailored to our clients' unique needs.
          </p>

          {/* Primary Call-to-Action */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            Schedule Your Free Consultation
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* ABOUT SECTION - Firm background and expertise            */}
      {/* ========================================================= */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">About MBS Advocates</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Firm Description */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                MBS Advocates is a premier full-service Ugandan law firm established in 2022. Our firm represents an amalgamation of the vast experiences and practices of eminent lawyers, creating a modern institution with deep roots in legal practice. We embody the best qualities of the legal profession: tenacious, adaptable, ready for hard work, and committed to our clients' causes.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Our Leadership:</span><br/>
                Our team is led by experienced legal professionals who bring a wealth of knowledge and a meticulous approach to every case.
                Muhangi George (Managing Partner): A highly reputed disputes lawyer known for his strategic and effective representation.<br/>
                Matovu Ronald (Partner): A key partner contributing to the firm's diverse expertise and success.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold">Our Mission:</span><br/>
                To provide high-quality, business-oriented, innovative, and cost-effective legal solutions. We are committed to upholding the highest standards of legal practice, ensuring our clients receive diligent representation and sound advice to achieve favorable outcomes.<br/><br/>
                 <span className="font-bold">Our National and International Reach:</span><br/>
                With a network of high-quality, experienced lawyers, we are well-placed to service the requirements of our clients across Uganda. We are also adequately equipped to handle cross-border transactions, working with an established legal network to give seamless legal service worldwide.
              </p>
            </div>

            {/* Professional Image - Adjusted for better alignment and scaling */}
            {/* Using aspect-w-4 aspect-h-3 to maintain a 4:3 ratio for the image container */}
            <div className="relative w-full aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg">
        <ImageContainer
          src="/images/team/13.jpg" // Using the provided image path
          alt="MBS Advocates professional team at work"
          width={800} // Provide original width for optimization
          height={600} // Provide original height for optimization
          className="w-full h-full object-cover" // Ensure image covers its container
        />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TEAM SECTION - Professional team showcase                */}
      {/* ========================================================= */}
      <TeamSection />

      {/* ========================================================= */}
      {/* SERVICES SECTION - Legal service offerings               */}
      {/* ========================================================= */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Our Legal Services</h2>

          {/* Display Services dynamically or show loading/error */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Loading Skeletons for Services */}
              {Array.from({ length: 6 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          )}
          {!servicesSuccess && (
            <p className="text-center text-red-600 mt-8">Failed to load services. Please try again later.</p>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS SECTION - Client feedback and form          */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Fix: Escape apostrophes for ESLint */}
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">What Our Clients Say</h2>

          {/* Display Approved Testimonials */}
          {testimonialsSuccess && testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial.id} className="flex flex-col h-full shadow-md">
                  <CardContent className="p-6 flex-grow">
                    {/* Star Rating Display */}
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.rating || 0 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                      {Array.from({ length: 5 - (testimonial.rating || 0) }).map((_, i) => (
                        <Star key={i + 5} className="h-5 w-5 text-gray-300" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 italic mb-4">{`“${testimonial.comment}”`}</p>

                    {/* Client Information */}
                    <p className="font-semibold text-gray-900">- {testimonial.client_name}</p>
                    <p className="text-sm text-gray-500">{new Date(testimonial.created_at!).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mb-12">
              No testimonials yet. Be the first to share your experience with MBS Advocates!
            </p>
          )}

          {/* Testimonial Submission Form */}
          <div className="max-w-lg mx-auto mb-8">
            <TestimonialForm />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* CONTACT SECTION - Contact form and information           */}
      {/* ========================================================= */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>

          <div className="grid grid-cols-1 gap-12">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <p className="text-lg text-gray-700">
                We are here to help. Please reach out to us with your legal inquiries, and our experienced team will get
                back to you promptly.
              </p>

              <div className="space-y-4">
                {/* Office Address */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span>
                    Plot 26, Wampewo Avenue, Bakwanye House Level 2, West Wing, Opp. Hotel Africana, P.O.Box 111165,
                    Kampala, Uganda
                  </span>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span>+256 772 843 238, +256 702 672 369</span>
                </div>

                {/* Email Addresses */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>info@mbsadvocates.com</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>mbsadvocatessolicitors@gmail.com</span>
                </div>
                {/* X (Twitter) Account */}
                <div className="flex items-center space-x-3 text-gray-700">
                  <X className="h-5 w-5 text-gray-600" />
                  <span>
                    <a 
                      href="https://x.com/mbsLawyers" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-gray-900 transition-colors"
                    >
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
      {/* LOCATION SECTION - Embedded Google Maps                  */}
      {/* ========================================================= */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">Find Us on the Map</h2>

          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
            {/* Google Maps Embed - Fixed for Firefox compatibility */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7590000000005!2d32.589000000000004!3d0.31500000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM%C2%B0MTgnNTQuMCJOIDMy%C2%B0MzUnMjAuNCJF!5e0!3m2!1sen!2sug!4v1678912345678!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style={{ border: 0 }} // Fixed: Using style prop instead of className for iframe
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              title="MBS Advocates Office Location - Kampala, Uganda" // Added title for accessibility
            />
          </div>
        </div>
      </section>
    </div>
  )
}