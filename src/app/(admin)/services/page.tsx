/**
 * Admin Services Page (Server Component)
 * ====================================
 *
 * This page will allow administrators to manage legal services offered by the firm.
 *
 * NOTE: This is a basic placeholder. Full CRUD functionality will be implemented later.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServices } from "@/actions/services" // Re-use existing action
import type { Service } from "@/lib/schema"

/**
 * Admin Services Page
 *
 * Displays a list of legal services for management.
 */
export default async function AdminServicesPage() {
  const { data: services, success } = await getServices()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manage Services</h2>
      <p className="text-gray-600">Add, edit, or remove legal service offerings.</p>

      <Card>
        <CardHeader>
          <CardTitle>All Services ({success ? services.length : "Error"})</CardTitle>
        </CardHeader>
        <CardContent>
          {success && services.length > 0 ? (
            <ul className="space-y-4">
              {services.map((service: Service) => (
                <li key={service.id} className="border-b pb-2 last:border-b-0">
                  <p className="font-semibold">{service.title}</p>
                  <p className="text-gray-700 text-sm">{service.description}</p>
                  {/* Add edit/delete buttons here later */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">{success ? "No services found." : "Error loading services."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
