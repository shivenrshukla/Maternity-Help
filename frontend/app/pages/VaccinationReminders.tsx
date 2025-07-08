"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Vaccination {
  _id?: string
  name: string
  dueDate: string
  status: "upcoming" | "completed" | "overdue"
  notes?: string
  ageGroup: "birth" | "2-months" | "4-months" | "6-months" | "12-months" | "15-months" | "18-months" | "24-months" | "4-6-years" | "11-12-years" | "pregnancy" | "adult"
  category: "routine" | "catch-up" | "high-risk" | "travel" | "pregnancy"
}

// Comprehensive infant vaccination schedule
const INFANT_VACCINATIONS = [
  // Birth
  { name: "Hepatitis B (1st dose)", ageGroup: "birth", category: "routine", notes: "Given within 24 hours of birth" },
  
  // 2 months
  { name: "DTaP (1st dose)", ageGroup: "2-months", category: "routine", notes: "Diphtheria, Tetanus, Pertussis" },
  { name: "Hib (1st dose)", ageGroup: "2-months", category: "routine", notes: "Haemophilus influenzae type b" },
  { name: "IPV (1st dose)", ageGroup: "2-months", category: "routine", notes: "Inactivated Poliovirus" },
  { name: "PCV13 (1st dose)", ageGroup: "2-months", category: "routine", notes: "Pneumococcal Conjugate" },
  { name: "RV (1st dose)", ageGroup: "2-months", category: "routine", notes: "Rotavirus" },
  
  // 4 months
  { name: "DTaP (2nd dose)", ageGroup: "4-months", category: "routine", notes: "Diphtheria, Tetanus, Pertussis" },
  { name: "Hib (2nd dose)", ageGroup: "4-months", category: "routine", notes: "Haemophilus influenzae type b" },
  { name: "IPV (2nd dose)", ageGroup: "4-months", category: "routine", notes: "Inactivated Poliovirus" },
  { name: "PCV13 (2nd dose)", ageGroup: "4-months", category: "routine", notes: "Pneumococcal Conjugate" },
  { name: "RV (2nd dose)", ageGroup: "4-months", category: "routine", notes: "Rotavirus" },
  
  // 6 months
  { name: "DTaP (3rd dose)", ageGroup: "6-months", category: "routine", notes: "Diphtheria, Tetanus, Pertussis" },
  { name: "Hepatitis B (2nd dose)", ageGroup: "6-months", category: "routine", notes: "Second dose" },
  { name: "Hib (3rd dose)", ageGroup: "6-months", category: "routine", notes: "Haemophilus influenzae type b" },
  { name: "IPV (3rd dose)", ageGroup: "6-months", category: "routine", notes: "Inactivated Poliovirus" },
  { name: "PCV13 (3rd dose)", ageGroup: "6-months", category: "routine", notes: "Pneumococcal Conjugate" },
  { name: "RV (3rd dose)", ageGroup: "6-months", category: "routine", notes: "Rotavirus (if needed)" },
  { name: "Influenza (1st dose)", ageGroup: "6-months", category: "routine", notes: "Annual flu vaccine" },
  
  // 12 months
  { name: "Hepatitis B (3rd dose)", ageGroup: "12-months", category: "routine", notes: "Final dose" },
  { name: "Hib (4th dose)", ageGroup: "12-months", category: "routine", notes: "Haemophilus influenzae type b" },
  { name: "MMR (1st dose)", ageGroup: "12-months", category: "routine", notes: "Measles, Mumps, Rubella" },
  { name: "PCV13 (4th dose)", ageGroup: "12-months", category: "routine", notes: "Pneumococcal Conjugate" },
  { name: "Varicella (1st dose)", ageGroup: "12-months", category: "routine", notes: "Chickenpox" },
  { name: "Hepatitis A (1st dose)", ageGroup: "12-months", category: "routine", notes: "First dose" },
  
  // 15 months
  { name: "DTaP (4th dose)", ageGroup: "15-months", category: "routine", notes: "Diphtheria, Tetanus, Pertussis" },
  
  // 18 months
  { name: "Hepatitis A (2nd dose)", ageGroup: "18-months", category: "routine", notes: "Second dose" },
  
  // 24 months
  { name: "Influenza (Annual)", ageGroup: "24-months", category: "routine", notes: "Annual flu vaccine" },
  
  // 4-6 years
  { name: "DTaP (5th dose)", ageGroup: "4-6-years", category: "routine", notes: "Diphtheria, Tetanus, Pertussis" },
  { name: "IPV (4th dose)", ageGroup: "4-6-years", category: "routine", notes: "Inactivated Poliovirus" },
  { name: "MMR (2nd dose)", ageGroup: "4-6-years", category: "routine", notes: "Measles, Mumps, Rubella" },
  { name: "Varicella (2nd dose)", ageGroup: "4-6-years", category: "routine", notes: "Chickenpox" },
  
  // 11-12 years
  { name: "HPV (1st dose)", ageGroup: "11-12-years", category: "routine", notes: "Human Papillomavirus" },
  { name: "Meningococcal (1st dose)", ageGroup: "11-12-years", category: "routine", notes: "Meningococcal Conjugate" },
  { name: "Tdap Booster", ageGroup: "11-12-years", category: "routine", notes: "Tetanus, Diphtheria, Pertussis" },
  
  // Pregnancy
  { name: "Tdap (Pregnancy)", ageGroup: "pregnancy", category: "pregnancy", notes: "Given during each pregnancy between 27-36 weeks" },
  { name: "Influenza (Pregnancy)", ageGroup: "pregnancy", category: "pregnancy", notes: "Annual flu vaccine during pregnancy" },
  { name: "RSV (Pregnancy)", ageGroup: "pregnancy", category: "routine", notes: "RSV vaccine during pregnancy (32-36 weeks)" },
  
  // Additional vaccines
  { name: "COVID-19", ageGroup: "adult", category: "routine", notes: "As recommended by healthcare provider" },
  { name: "Meningococcal B", ageGroup: "adult", category: "high-risk", notes: "For high-risk individuals" },
]

export default function VaccinationReminders() {
  const router = useRouter()
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [_userId, _setUserId] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // Decode token to get user ID (you might need to adjust this based on your JWT structure)
    // try {
    //   const payload = JSON.parse(atob(token.split('.')[1]))
    //   setUserId(payload.userId || payload.id)
    // } catch (err) {
    //   console.error("Error decoding token:", err)
    //   router.push("/login")
    //   return
    // }

    fetchVaccinations()
  }, [router])

  const fetchVaccinations = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/vaccinations", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch vaccinations")
      }

      const data = await response.json()
      setVaccinations(data)
    } catch (err) {
      console.error("Error fetching vaccinations:", err)
      setError("Failed to load vaccinations")
    } finally {
      setLoading(false)
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [showPresetModal, setShowPresetModal] = useState(false)
  const [editingVaccination, setEditingVaccination] = useState<Vaccination | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    dueDate: string
    status: "upcoming" | "completed" | "overdue"
    notes: string
    ageGroup: "birth" | "2-months" | "4-months" | "6-months" | "12-months" | "15-months" | "18-months" | "24-months" | "4-6-years" | "11-12-years" | "pregnancy" | "adult"
    category: "routine" | "catch-up" | "high-risk" | "travel" | "pregnancy"
  }>({
    name: "",
    dueDate: "",
    status: "upcoming",
    notes: "",
    ageGroup: "birth",
    category: "routine",
  })

  const handleAdd = () => {
    setEditingVaccination(null)
    setFormData({ 
      name: "", 
      dueDate: "", 
      status: "upcoming", 
      notes: "", 
      ageGroup: "birth", 
      category: "routine" 
    })
    setShowModal(true)
  }

  const handleAddPreset = () => {
    setShowPresetModal(true)
  }

  const handleSelectPreset = async (preset: any) => {
    try {
      const token = localStorage.getItem("token")
      const newVaccination = {
        ...preset,
        dueDate: new Date().toISOString().split('T')[0], // Default to today
        status: "upcoming" as const,
      }

      const response = await fetch("/api/vaccinations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVaccination),
      })

      if (!response.ok) {
        throw new Error("Failed to add vaccination")
      }

      const savedVaccination = await response.json()
      setVaccinations([...vaccinations, savedVaccination])
      setShowPresetModal(false)
    } catch (err) {
      console.error("Error adding vaccination:", err)
      setError("Failed to add vaccination")
    }
  }

  const handleEdit = (vaccination: Vaccination) => {
    setEditingVaccination(vaccination)
    setFormData({
      name: vaccination.name,
      dueDate: vaccination.dueDate,
      status: vaccination.status,
      notes: vaccination.notes || "",
      ageGroup: vaccination.ageGroup,
      category: vaccination.category,
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vaccination reminder?")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/vaccinations/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete vaccination")
      }

      setVaccinations(vaccinations.filter((v) => v._id !== id))
    } catch (err) {
      console.error("Error deleting vaccination:", err)
      setError("Failed to delete vaccination")
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingVaccination(null)
    setFormData({ 
      name: "", 
      dueDate: "", 
      status: "upcoming", 
      notes: "", 
      ageGroup: "birth", 
      category: "routine" 
    })
    setError("") // Clear any form errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear any previous errors

    try {
      const token = localStorage.getItem("token")
      
      // Check if token exists
      if (!token) {
        throw new Error("No authentication token found")
      }

      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Vaccination name is required")
      }
      if (!formData.dueDate) {
        throw new Error("Due date is required")
      }

      const url = editingVaccination 
        ? `/api/vaccinations/${editingVaccination._id}`
        : "/api/vaccinations"
      const method = editingVaccination ? "PUT" : "POST"

      console.log("Submitting vaccination:", { 
        url, 
        method, 
        formData,
        editingVaccination: editingVaccination?._id 
      })

      const response = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("API Error:", errorData)
        throw new Error(errorData.message || `Failed to ${editingVaccination ? 'update' : 'add'} vaccination`)
      }

      const savedVaccination = await response.json()
      console.log("Saved vaccination:", savedVaccination)

      if (editingVaccination) {
        setVaccinations(prev => prev.map((v) => 
          v._id === editingVaccination._id ? savedVaccination : v
        ))
      } else {
        setVaccinations(prev => [...prev, savedVaccination])
      }

      handleModalClose()
      
    } catch (err) {
      console.error("Error saving vaccination:", err)
      setError(err instanceof Error ? err.message : `Failed to ${editingVaccination ? 'update' : 'add'} vaccination`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#28a745"
      case "overdue":
        return "#dc3545"
      default:
        return "#ffc107"
    }
  }

  const upcomingCount = vaccinations.filter((v) => v.status === "upcoming").length
  const completedCount = vaccinations.filter((v) => v.status === "completed").length
  const overdueCount = vaccinations.filter((v) => v.status === "overdue").length

  if (loading) {
    return (
      <div className="page-header">
        <h1 className="page-title">Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Vaccination Reminders</h1>
        <p className="page-subtitle">Keep track of your vaccination schedule</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{upcomingCount}</div>
          <div className="stat-label">Upcoming</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{overdueCount}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Your Vaccinations</h3>
          <div className="flex gap-1">
            <button className="btn btn-secondary" onClick={handleAddPreset}>
              Add from Schedule
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add Custom
            </button>
          </div>
        </div>

        <div>
          {vaccinations.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", color: "var(--text-light)" }}>
              No vaccinations added yet. Click Add from Schedule to add standard infant vaccinations.
            </p>
          ) : (
            vaccinations.map((vaccination) => (
              <div key={vaccination._id} className="list-item">
                <div style={{ flex: 1 }}>
                  <div className="flex-between">
                    <strong>{vaccination.name}</strong>
                    <span
                      style={{
                        color: getStatusColor(vaccination.status),
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontSize: "0.8rem",
                      }}
                    >
                      {vaccination.status}
                    </span>
                  </div>
                  <p>Due: {vaccination.dueDate}</p>
                  <p style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
                    {vaccination.ageGroup} • {vaccination.category}
                  </p>
                  {vaccination.notes && (
                    <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{vaccination.notes}</p>
                  )}
                </div>
                <div className="list-actions">
                  <button className="btn btn-secondary" onClick={() => handleEdit(vaccination)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(vaccination._id!)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preset Vaccination Modal */}
      {showPresetModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: "600px", maxHeight: "80vh", overflow: "auto" }}>
            <div className="modal-header">
              <h3>Add Standard Vaccinations</h3>
              <button className="modal-close" onClick={() => setShowPresetModal(false)}>
                ×
              </button>
            </div>

            <div style={{ padding: "1rem" }}>
              <p style={{ marginBottom: "1rem", color: "var(--text-light)" }}>
                Select vaccinations to add to your schedule:
              </p>
              
              {Object.entries(
                INFANT_VACCINATIONS.reduce((groups, vaccine) => {
                  const group = groups[vaccine.ageGroup] || []
                  groups[vaccine.ageGroup] = [...group, vaccine]
                  return groups
                }, {} as Record<string, typeof INFANT_VACCINATIONS>)
              ).map(([ageGroup, vaccines]) => (
                <div key={ageGroup} style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ 
                    textTransform: "capitalize", 
                    marginBottom: "0.5rem",
                    color: "var(--primary-color)",
                    borderBottom: "1px solid var(--border-color)",
                    paddingBottom: "0.25rem"
                  }}>
                    {ageGroup.replace("-", " ")}
                  </h4>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    {vaccines.map((vaccine, index) => (
                      <div 
                        key={index} 
                        style={{
                          padding: "0.75rem",
                          border: "1px solid var(--border-color)",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onClick={() => handleSelectPreset(vaccine)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--light-bg)"
                          e.currentTarget.style.borderColor = "var(--primary-color)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                          e.currentTarget.style.borderColor = "var(--border-color)"
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>{vaccine.name}</div>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                          {vaccine.notes}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingVaccination ? "Edit" : "Add"} Vaccination Reminder</h3>
              <button className="modal-close" onClick={handleModalClose}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Vaccination Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Age Group</label>
                <select
                  className="form-select"
                  value={formData.ageGroup}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value as Vaccination['ageGroup'] })}
                >
                  <option value="birth">Birth</option>
                  <option value="2-months">2 Months</option>
                  <option value="4-months">4 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="12-months">12 Months</option>
                  <option value="15-months">15 Months</option>
                  <option value="18-months">18 Months</option>
                  <option value="24-months">24 Months</option>
                  <option value="4-6-years">4-6 Years</option>
                  <option value="11-12-years">11-12 Years</option>
                  <option value="pregnancy">Pregnancy</option>
                  <option value="adult">Adult</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Vaccination['category'] })}
                >
                  <option value="routine">Routine</option>
                  <option value="catch-up">Catch-up</option>
                  <option value="high-risk">High Risk</option>
                  <option value="travel">Travel</option>
                  <option value="pregnancy">Pregnancy</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Vaccination['status'] })}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes..."
                />
              </div>

              <div className="flex gap-1">
                <button type="submit" className="btn btn-primary">
                  {editingVaccination ? "Update" : "Add"} Reminder
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
