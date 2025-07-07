"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface Doctor {
  id: number
  name: string
  specialty: string
  avatar: string
  isOnline: boolean
  nextAvailable: string
}

export default function VideoCall() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [])
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
  const roomName = selectedDoctor
  ? `nurturewell-${selectedDoctor.id}-${selectedDoctor.name.replace(/\s+/g, "")}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
  : ""


  if (isInCall && selectedDoctor) {

  return (
    <div className="p-4">
      <div className="page-header">
        <h1 className="page-title">Video Consultation</h1>
        <p className="page-subtitle">Connected with {selectedDoctor.name}</p>
      </div>

      <div className="card mb-4">
        <iframe
          src={`https://meet.jit.si/${roomName}`}
          allow="camera; microphone; fullscreen; display-capture"
          style={{
            width: "100%",
            height: "500px",
            border: "0",
            borderRadius: "12px",
          }}
          title="Jitsi Video Call"
        />
      </div>

      <div className="text-center">
        <button className="btn btn-danger" onClick={endCall}>
          📞 End Call
        </button>
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
          <button
            className="btn btn-success w-full"
            onClick={() => {
              const scheduledDoctor = {
                id: 1,
                name: "Dr. Sarah Johnson",
                specialty: "Obstetrician",
                avatar: "👩‍⚕️",
                isOnline: true,
                nextAvailable: "Today at 3:00 PM",
              }
              startCall(scheduledDoctor)
            }}
          >
            📅 Join Scheduled Call
          </button>
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
