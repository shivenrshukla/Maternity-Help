"use client"

import type React from "react"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Vaccination {
  id: number
  name: string
  dueDate: string
  status: "upcoming" | "completed" | "overdue"
  notes?: string
}

export default function VaccinationReminders() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [])
  
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([
    {
      id: 1,
      name: "Tdap (Tetanus, Diphtheria, Pertussis)",
      dueDate: "2024-01-20",
      status: "upcoming",
      notes: "Recommended between 27-36 weeks",
    },
    { id: 2, name: "Flu Shot", dueDate: "2023-12-15", status: "completed", notes: "Annual vaccination" },
    { id: 3, name: "COVID-19 Booster", dueDate: "2024-02-01", status: "upcoming" },
    { id: 4, name: "Hepatitis B", dueDate: "2023-11-01", status: "overdue", notes: "Please schedule immediately" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingVaccination, setEditingVaccination] = useState<Vaccination | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    dueDate: "",
    status: "upcoming" as const,
    notes: "",
  })

  const handleAdd = () => {
    setEditingVaccination(null)
    setFormData({ name: "", dueDate: "", status: "upcoming", notes: "" })
    setShowModal(true)
  }

  const handleEdit = (vaccination: Vaccination) => {
    setEditingVaccination(vaccination)
    setFormData({
      name: vaccination.name,
      dueDate: vaccination.dueDate,
      status: vaccination.status,
      notes: vaccination.notes || "",
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this vaccination reminder?")) {
      setVaccinations(vaccinations.filter((v) => v.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingVaccination) {
      setVaccinations(vaccinations.map((v) => (v.id === editingVaccination.id ? { ...v, ...formData } : v)))
    } else {
      const newVaccination: Vaccination = {
        id: Date.now(),
        ...formData,
      }
      setVaccinations([...vaccinations, newVaccination])
    }

    setShowModal(false)
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

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Vaccination Reminders</h1>
        <p className="page-subtitle">Keep track of your vaccination schedule</p>
      </div>

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
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Reminder
          </button>
        </div>

        <div>
          {vaccinations.map((vaccination) => (
            <div key={vaccination.id} className="list-item">
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
                {vaccination.notes && (
                  <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{vaccination.notes}</p>
                )}
              </div>
              <div className="list-actions">
                <button className="btn btn-secondary" onClick={() => handleEdit(vaccination)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(vaccination.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingVaccination ? "Edit" : "Add"} Vaccination Reminder</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
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
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
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
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
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
