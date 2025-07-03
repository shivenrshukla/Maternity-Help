"use client"

import { useState } from "react"

export default function SOS() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [emergencyContacts] = useState([
    { name: "Emergency Services", number: "112", type: "emergency" },
    { name: "Dr. Sarah Johnson", number: "(555) 123-4567", type: "doctor" },
    { name: "Partner - John", number: "(555) 987-6543", type: "family" },
    { name: "Mother - Mary", number: "(555) 456-7890", type: "family" },
    { name: "Poison Control", number: "1-800-222-1222", type: "emergency" },
  ])

  const [userLocation] = useState({
    address: "123 Main Street, Apartment 4B, Downtown",
    coordinates: "40.7128° N, 74.0060° W",
    nearestHospital: "City General Hospital - 2.3 km away",
  })

  const handleEmergencyCall = () => {
    setShowConfirmation(true)
    // In a real app, this would initiate the emergency call
    setTimeout(() => {
      setShowConfirmation(false)
      alert("Emergency call initiated to 112")
    }, 3000)
  }

  const callNumber = (number: string) => {
    // In a real app, this would initiate the phone call
    alert(`Calling ${number}`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ color: "#dc3545" }}>
          Emergency SOS
        </h1>
        <p className="page-subtitle">Quick access to emergency services and contacts</p>
      </div>

      {/* Emergency Call Button */}
      <div
        className="card mb-2"
        style={{ textAlign: "center", backgroundColor: "#fff5f5", border: "2px solid #dc3545" }}
      >
        <h2 style={{ color: "#dc3545", marginBottom: "1rem" }}>Emergency Assistance</h2>
        <button
          className="btn btn-danger"
          onClick={handleEmergencyCall}
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem 3rem",
            backgroundColor: "#dc3545",
            border: "none",
            borderRadius: "50px",
            boxShadow: "0 4px 15px rgba(220, 53, 69, 0.3)",
          }}
        >
          🚨 CALL 112 NOW
        </button>
        <p style={{ marginTop: "1rem", color: "#dc3545", fontWeight: "bold" }}>
          Press for immediate emergency assistance
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal" style={{ textAlign: "center" }}>
            <h3 style={{ color: "#dc3545", marginBottom: "1rem" }}>🚨 Calling Emergency Services</h3>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>Connecting to 112...</p>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #dc3545",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-2">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="card-title" style={{ color: "#dc3545" }}>
            Quick Actions
          </h3>
          <div className="grid grid-1 gap-1">
            <button className="btn btn-danger w-full" onClick={() => callNumber("112")}>
              🚑 Call Ambulance
            </button>
            <button className="btn btn-danger w-full" onClick={() => callNumber("112")}>
              🚒 Call Fire Department
            </button>
            <button className="btn btn-danger w-full" onClick={() => callNumber("112")}>
              👮 Call Police
            </button>
            <button className="btn btn-secondary w-full" onClick={() => callNumber("1-800-222-1222")}>
              ☠️ Poison Control
            </button>
          </div>
        </div>

        {/* Location Information */}
        <div className="card">
          <h3 className="card-title">Your Location</h3>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Address:</strong>
            </p>
            <p style={{ color: "var(--text-light)" }}>{userLocation.address}</p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Coordinates:</strong>
            </p>
            <p style={{ color: "var(--text-light)" }}>{userLocation.coordinates}</p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Nearest Hospital:</strong>
            </p>
            <p style={{ color: "var(--text-light)" }}>{userLocation.nearestHospital}</p>
          </div>
          <button className="btn btn-primary w-full">📍 Share Location</button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card">
        <h3 className="card-title">Emergency Contacts</h3>
        <div>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="list-item">
              <div>
                <div className="flex" style={{ alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>
                    {contact.type === "emergency" ? "🚨" : contact.type === "doctor" ? "👩‍⚕️" : "👨‍👩‍👧‍👦"}
                  </span>
                  <strong>{contact.name}</strong>
                </div>
                <p style={{ color: "var(--text-light)" }}>{contact.number}</p>
              </div>
              <button
                className={`btn ${contact.type === "emergency" ? "btn-danger" : "btn-primary"}`}
                onClick={() => callNumber(contact.number)}
              >
                📞 Call
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Information */}
      <div className="card">
        <h3 className="card-title">Medical Information</h3>
        <div className="grid grid-2">
          <div>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>Personal Details</h4>
            <p>
              <strong>Name:</strong> Sarah Johnson
            </p>
            <p>
              <strong>Age:</strong> 28 years
            </p>
            <p>
              <strong>Blood Type:</strong> O+
            </p>
            <p>
              <strong>Pregnancy:</strong> 28 weeks
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>Medical Conditions</h4>
            <p>
              <strong>Allergies:</strong> Penicillin
            </p>
            <p>
              <strong>Medications:</strong> Prenatal vitamins
            </p>
            <p>
              <strong>Emergency Contact:</strong> John Johnson
            </p>
            <p>
              <strong>Insurance:</strong> Blue Cross Blue Shield
            </p>
          </div>
        </div>
        <button className="btn btn-secondary mt-1">📝 Edit Medical Information</button>
      </div>

      {/* Safety Tips */}
      <div className="card">
        <h3 className="card-title">Emergency Preparedness Tips</h3>
        <div className="grid grid-2">
          <div>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>Before Emergency</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Keep emergency contacts updated</li>
              <li>Know your location at all times</li>
              <li>Have medical information ready</li>
              <li>Keep phone charged</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>During Emergency</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Stay calm and breathe</li>
              <li>Call 112 immediately</li>
              <li>Provide clear location</li>
              <li>Follow dispatcher instructions</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
