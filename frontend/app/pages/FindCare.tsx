"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface HealthcareProvider {
  id: number
  name: string
  type: string
  address: string
  phone: string
  rating: number
  distance: string
  specialties: string[]
  availability: string
}

export default function FindCare() {
  const router = useRouter()
  useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
  }
}, [router]) // ✅ include router as dependency

  const [providers] = useState<HealthcareProvider[]>([
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      rating: 4.5,
      distance: "2.3 km",
      specialties: ["Obstetrics", "Gynecology", "Pediatrics"],
      availability: "24/7 Emergency",
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      type: "Obstetrician",
      address: "456 Health Ave, Medical District",
      phone: "(555) 234-5678",
      rating: 4.8,
      distance: "1.8 km",
      specialties: ["Prenatal Care", "High-Risk Pregnancy"],
      availability: "Mon-Fri 9AM-5PM",
    },
    {
      id: 3,
      name: "Women's Health Clinic",
      type: "Clinic",
      address: "789 Care Blvd, Suburb",
      phone: "(555) 345-6789",
      rating: 4.3,
      distance: "3.1 km",
      specialties: ["Family Planning", "Prenatal Care", "Postpartum Care"],
      availability: "Mon-Sat 8AM-6PM",
    },
    {
      id: 4,
      name: "Dr. Michael Chen",
      type: "Pediatrician",
      address: "321 Kids Way, Family District",
      phone: "(555) 456-7890",
      rating: 4.7,
      distance: "2.7 km",
      specialties: ["Newborn Care", "Child Development", "Vaccinations"],
      availability: "Mon-Fri 8AM-6PM",
    },
  ])

  const [filters, setFilters] = useState({
    type: "",
    specialty: "",
    distance: "",
    rating: "",
  })

  const [searchTerm, setSearchTerm] = useState("")

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = !filters.type || provider.type === filters.type
    const matchesSpecialty = !filters.specialty || provider.specialties.includes(filters.specialty)
    const matchesDistance =
      !filters.distance || Number.parseFloat(provider.distance) <= Number.parseFloat(filters.distance)
    const matchesRating = !filters.rating || provider.rating >= Number.parseFloat(filters.rating)

    return matchesSearch && matchesType && matchesSpecialty && matchesDistance && matchesRating
  })

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Find Care</h1>
        <p className="page-subtitle">Locate nearby healthcare providers and facilities</p>
      </div>

      {/* Map Placeholder */}
      <div className="card mb-2">
        <div
          style={{
            height: "300px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #ccc",
            borderRadius: "var(--border-radius)",
          }}
        >
          <div style={{ textAlign: "center", color: "var(--text-light)" }}>
            <h3>Interactive Map</h3>
            <p>Map showing nearby healthcare providers would be displayed here</p>
            <p style={{ fontSize: "0.9rem" }}>Integration with Google Maps or similar service</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-2">
        <h3 className="card-title">Search & Filter</h3>

        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-4">
          <div className="form-group">
            <label className="form-label">Provider Type</label>
            <select
              className="form-select"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="Hospital">Hospital</option>
              <option value="Clinic">Clinic</option>
              <option value="Obstetrician">Obstetrician</option>
              <option value="Pediatrician">Pediatrician</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Specialty</label>
            <select
              className="form-select"
              value={filters.specialty}
              onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
            >
              <option value="">All Specialties</option>
              <option value="Obstetrics">Obstetrics</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Prenatal Care">Prenatal Care</option>
              <option value="High-Risk Pregnancy">High-Risk Pregnancy</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Max Distance (km)</label>
            <select
              className="form-select"
              value={filters.distance}
              onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
            >
              <option value="">Any Distance</option>
              <option value="1">Within 1 km</option>
              <option value="2">Within 2 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Min Rating</label>
            <select
              className="form-select"
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Healthcare Providers ({filteredProviders.length} found)</h3>
        </div>

        <div>
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="list-item">
              <div style={{ flex: 1 }}>
                <div className="flex-between">
                  <div>
                    <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>{provider.name}</h4>
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
                      {provider.type} • {provider.distance} away
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#ffc107", fontSize: "1.2rem" }}>{renderStars(provider.rating)}</div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>{provider.rating}/5</p>
                  </div>
                </div>

                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Address:</strong> {provider.address}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Phone:</strong> {provider.phone}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Specialties:</strong> {provider.specialties.join(", ")}
                </p>
                <p style={{ margin: "0.5rem 0" }}>
                  <strong>Availability:</strong> {provider.availability}
                </p>
              </div>

              <div className="list-actions">
                <button className="btn btn-primary">Call Now</button>
                <button className="btn btn-secondary">Book Appointment</button>
                <button className="btn btn-secondary">Get Directions</button>
              </div>
            </div>
          ))}

          {filteredProviders.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-light)" }}>
              <p>No healthcare providers found matching your criteria.</p>
              <p>Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
