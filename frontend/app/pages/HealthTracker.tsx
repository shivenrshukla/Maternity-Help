"use client"

import type React from "react"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

interface HealthEntry {
  id: number
  date: string
  weight: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  glucose: number
  fetalMovement: string
  notes?: string
}

export default function HealthTracker() {
  const [entries, setEntries] = useState<HealthEntry[]>([
    {
      id: 1,
      date: "2024-01-01",
      weight: 62,
      bloodPressureSystolic: 118,
      bloodPressureDiastolic: 78,
      glucose: 95,
      fetalMovement: "Active",
    },
    {
      id: 2,
      date: "2024-01-08",
      weight: 63,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
      glucose: 92,
      fetalMovement: "Active",
    },
    {
      id: 3,
      date: "2024-01-15",
      weight: 64,
      bloodPressureSystolic: 122,
      bloodPressureDiastolic: 82,
      glucose: 88,
      fetalMovement: "Very Active",
    },
    {
      id: 4,
      date: "2024-01-22",
      weight: 65,
      bloodPressureSystolic: 119,
      bloodPressureDiastolic: 79,
      glucose: 90,
      fetalMovement: "Active",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    glucose: "",
    fetalMovement: "Active",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEntry: HealthEntry = {
      id: Date.now(),
      date: formData.date,
      weight: Number.parseFloat(formData.weight),
      bloodPressureSystolic: Number.parseInt(formData.bloodPressureSystolic),
      bloodPressureDiastolic: Number.parseInt(formData.bloodPressureDiastolic),
      glucose: Number.parseInt(formData.glucose),
      fetalMovement: formData.fetalMovement,
      notes: formData.notes,
    }

    setEntries([...entries, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    setFormData({
      date: new Date().toISOString().split("T")[0],
      weight: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      glucose: "",
      fetalMovement: "Active",
      notes: "",
    })
    setShowForm(false)
  }

  const weightData = entries.map((entry) => ({
    date: entry.date,
    weight: entry.weight,
  }))

  const bpData = entries.map((entry) => ({
    date: entry.date,
    systolic: entry.bloodPressureSystolic,
    diastolic: entry.bloodPressureDiastolic,
  }))

  const glucoseData = entries.map((entry) => ({
    date: entry.date,
    glucose: entry.glucose,
  }))

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Health Tracker</h1>
        <p className="page-subtitle">Monitor your health vitals and progress</p>
      </div>

      <div className="flex-between mb-2">
        <div className="dashboard-stats" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-number">{entries.length}</div>
            <div className="stat-label">Total Entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{entries[entries.length - 1]?.weight || 0} kg</div>
            <div className="stat-label">Current Weight</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {entries[entries.length - 1]?.bloodPressureSystolic || 0}/
              {entries[entries.length - 1]?.bloodPressureDiastolic || 0}
            </div>
            <div className="stat-label">Latest BP</div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add New Entry
        </button>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="card-title">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#D14D72" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">Blood Pressure Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bpData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="systolic" stroke="#D14D72" strokeWidth={2} />
              <Line type="monotone" dataKey="diastolic" stroke="#FFABAB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">Glucose Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={glucoseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="glucose" fill="#FCC8D1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title">Recent Entries</h3>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {entries
              .slice(-5)
              .reverse()
              .map((entry) => (
                <div key={entry.id} className="list-item">
                  <div>
                    <strong>{entry.date}</strong>
                    <p>
                      Weight: {entry.weight}kg | BP: {entry.bloodPressureSystolic}/{entry.bloodPressureDiastolic} |
                      Glucose: {entry.glucose}
                    </p>
                    <p>Fetal Movement: {entry.fetalMovement}</p>
                    {entry.notes && <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>{entry.notes}</p>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add Health Entry</h3>
              <button className="modal-close" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Glucose (mg/dL)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.glucose}
                    onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Systolic BP</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.bloodPressureSystolic}
                    onChange={(e) => setFormData({ ...formData, bloodPressureSystolic: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Diastolic BP</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.bloodPressureDiastolic}
                    onChange={(e) => setFormData({ ...formData, bloodPressureDiastolic: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Fetal Movement</label>
                <select
                  className="form-select"
                  value={formData.fetalMovement}
                  onChange={(e) => setFormData({ ...formData, fetalMovement: e.target.value })}
                >
                  <option value="Very Active">Very Active</option>
                  <option value="Active">Active</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                  <option value="None">None</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about your health today..."
                />
              </div>

              <div className="flex gap-1">
                <button type="submit" className="btn btn-primary">
                  Add Entry
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
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
