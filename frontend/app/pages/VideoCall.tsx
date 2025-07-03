"use client"

import { useState } from "react"

interface Doctor {
  id: number
  name: string
  specialty: string
  avatar: string
  isOnline: boolean
  nextAvailable: string
}

export default function VideoCall() {
  const [isInCall, setIsInCall] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Obstetrician",
      avatar: "👩‍⚕️",
      isOnline: true,
      nextAvailable: "Available now",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrician",
      avatar: "👨‍⚕️",
      isOnline: false,
      nextAvailable: "Available at 2:00 PM",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialty: "Gynecologist",
      avatar: "👩‍⚕️",
      isOnline: true,
      nextAvailable: "Available now",
    },
  ]

  const startCall = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsInCall(true)
  }

  const endCall = () => {
    setIsInCall(false)
    setSelectedDoctor(null)
  }

  if (isInCall && selectedDoctor) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Video Consultation</h1>
          <p className="page-subtitle">Connected with {selectedDoctor.name}</p>
        </div>

        <div className="card">
          <div
            style={{
              height: "400px",
              backgroundColor: "#000",
              borderRadius: "var(--border-radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              marginBottom: "1rem",
              position: "relative",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{selectedDoctor.avatar}</div>
              <h3>{selectedDoctor.name}</h3>
              <p>{selectedDoctor.specialty}</p>
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "120px",
                  height: "80px",
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid var(--primary-color)",
                }}
              >
                <span style={{ fontSize: "2rem" }}>👤</span>
              </div>
            </div>
          </div>

          <div className="flex-center gap-1">
            <button className="btn btn-secondary">🎤 Mute</button>
            <button className="btn btn-secondary">📹 Camera</button>
            <button className="btn btn-danger" onClick={endCall}>
              📞 End Call
            </button>
            <button className="btn btn-secondary">💬 Chat</button>
            <button className="btn btn-secondary">📋 Notes</button>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title">Call Information</h3>
            <p>
              <strong>Duration:</strong> 00:05:23
            </p>
            <p>
              <strong>Connection:</strong> Excellent
            </p>
            <p>
              <strong>Recording:</strong> Not recording
            </p>
          </div>

          <div className="card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="flex gap-1 flex-wrap">
              <button className="btn btn-secondary">Share Screen</button>
              <button className="btn btn-secondary">Send File</button>
              <button className="btn btn-secondary">Schedule Follow-up</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Video Consultation</h1>
        <p className="page-subtitle">Connect with healthcare providers remotely</p>
      </div>

      <div className="grid grid-2 mb-2">
        <div className="card">
          <h3 className="card-title">Quick Start</h3>
          <p>Start an instant consultation with available doctors</p>
          <button className="btn btn-primary w-full mt-1">🎥 Start Instant Consultation</button>
        </div>

        <div className="card">
          <h3 className="card-title">Scheduled Appointments</h3>
          <p>Join your pre-scheduled video appointments</p>
          <div className="alert alert-warning">
            <strong>Upcoming:</strong> Dr. Johnson at 3:00 PM today
          </div>
          <button className="btn btn-success w-full">📅 Join Scheduled Call</button>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Available Doctors</h3>
        <div className="grid grid-1">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="list-item">
              <div className="flex" style={{ alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "3rem" }}>{doctor.avatar}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>{doctor.name}</h4>
                  <p style={{ color: "var(--text-light)", marginBottom: "0.5rem" }}>{doctor.specialty}</p>
                  <div className="flex" style={{ alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: doctor.isOnline ? "#28a745" : "#dc3545",
                      }}
                    ></span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>{doctor.nextAvailable}</span>
                  </div>
                </div>
              </div>
              <div className="list-actions">
                <button
                  className={`btn ${doctor.isOnline ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => doctor.isOnline && startCall(doctor)}
                  disabled={!doctor.isOnline}
                >
                  {doctor.isOnline ? "📞 Call Now" : "📅 Schedule"}
                </button>
                <button className="btn btn-secondary">💬 Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-3">
        <div className="card text-center">
          <h3 className="card-title">📋 Consultation History</h3>
          <p>View your past video consultations and notes</p>
          <button className="btn btn-secondary">View History</button>
        </div>

        <div className="card text-center">
          <h3 className="card-title">⚙️ Settings</h3>
          <p>Configure camera, microphone, and call preferences</p>
          <button className="btn btn-secondary">Open Settings</button>
        </div>

        <div className="card text-center">
          <h3 className="card-title">❓ Help & Support</h3>
          <p>Get help with video calling features</p>
          <button className="btn btn-secondary">Get Help</button>
        </div>
      </div>
    </div>
  )
}
