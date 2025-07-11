"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Symptom {
  id: string
  name: string
  category: string
}

export default function SymptomsChecker() {
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [additionalInfo, setAdditionalInfo] = useState({
    duration: "",
    severity: "",
    additionalNotes: "",
  })
  const [showResults, setShowResults] = useState(false)

  const symptoms: Symptom[] = [
    { id: "nausea", name: "Nausea/Morning Sickness", category: "Digestive" },
    { id: "fatigue", name: "Fatigue/Tiredness", category: "General" },
    { id: "headache", name: "Headache", category: "Neurological" },
    { id: "backpain", name: "Back Pain", category: "Musculoskeletal" },
    { id: "swelling", name: "Swelling (hands/feet)", category: "Circulatory" },
    { id: "heartburn", name: "Heartburn", category: "Digestive" },
    { id: "constipation", name: "Constipation", category: "Digestive" },
    { id: "dizziness", name: "Dizziness", category: "Neurological" },
    { id: "cramping", name: "Abdominal Cramping", category: "Abdominal" },
    { id: "bleeding", name: "Unusual Bleeding", category: "Reproductive" },
    { id: "contractions", name: "Contractions", category: "Reproductive" },
    { id: "fever", name: "Fever", category: "General" },
    { id: "vomiting", name: "Severe Vomiting", category: "Digestive" },
    { id: "vision", name: "Vision Changes", category: "Neurological" },
    { id: "breathing", name: "Difficulty Breathing", category: "Respiratory" },
  ]

  const categories = Array.from(new Set(symptoms.map((s) => s.category)))

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
  }

  const getRecommendation = () => {
    const urgentSymptoms = ["bleeding", "contractions", "fever", "vomiting", "vision", "breathing"]
    const hasUrgentSymptoms = selectedSymptoms.some((s) => urgentSymptoms.includes(s))

    if (hasUrgentSymptoms) {
      return {
        level: "urgent",
        title: "Seek Immediate Medical Attention",
        message:
          "Based on your symptoms, you should contact your healthcare provider immediately or visit the emergency room.",
        color: "#dc3545",
      }
    } else if (selectedSymptoms.length > 3) {
      return {
        level: "moderate",
        title: "Schedule an Appointment",
        message:
          "You have multiple symptoms that should be discussed with your healthcare provider. Please schedule an appointment.",
        color: "#ffc107",
      }
    } else {
      return {
        level: "mild",
        title: "Monitor Symptoms",
        message:
          "Your symptoms appear to be common during pregnancy. Continue monitoring and mention them at your next appointment.",
        color: "#28a745",
      }
    }
  }

  if (showResults) {
    const recommendation = getRecommendation()

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Symptoms Analysis Results</h1>
          <p className="page-subtitle">AI-powered symptom assessment</p>
        </div>

        <div className="card" style={{ borderLeft: `4px solid ${recommendation.color}` }}>
          <h3 style={{ color: recommendation.color, marginBottom: "1rem" }}>{recommendation.title}</h3>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>{recommendation.message}</p>

          <div className="alert alert-warning">
            <strong>Disclaimer:</strong> This is an AI-powered assessment tool and should not replace professional
            medical advice. Always consult with your healthcare provider for proper diagnosis and treatment.
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <h3 className="card-title">Your Selected Symptoms</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {selectedSymptoms.map((symptomId) => {
                const symptom = symptoms.find((s) => s.id === symptomId)
                return (
                  <li
                    key={symptomId}
                    style={{
                      padding: "0.5rem",
                      backgroundColor: "var(--light-background)",
                      margin: "0.5rem 0",
                      borderRadius: "4px",
                    }}
                  >
                    {symptom?.name}
                  </li>
                )
              })}
            </ul>

            {additionalInfo.duration && (
              <p>
                <strong>Duration:</strong> {additionalInfo.duration}
              </p>
            )}
            {additionalInfo.severity && (
              <p>
                <strong>Severity:</strong> {additionalInfo.severity}
              </p>
            )}
            {additionalInfo.additionalNotes && (
              <p>
                <strong>Additional Notes:</strong> {additionalInfo.additionalNotes}
              </p>
            )}
          </div>

          <div className="card">
            <h3 className="card-title">Recommended Actions</h3>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>Contact your healthcare provider</li>
              <li>Keep a symptom diary</li>
              <li>Stay hydrated and rest</li>
              <li>Monitor symptom changes</li>
              <li>Have emergency contacts ready</li>
            </ul>

            <div className="flex gap-1 mt-2">
              <button className="btn btn-primary">Find Healthcare Provider</button>
              <button className="btn btn-secondary">Call Emergency</button>
            </div>
          </div>
        </div>

        <div className="text-center mt-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowResults(false)
              setSelectedSymptoms([])
              setAdditionalInfo({ duration: "", severity: "", additionalNotes: "" })
            }}
          >
            Start New Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Symptoms Checker</h1>
        <p className="page-subtitle">Get AI-powered insights about your symptoms</p>
      </div>

      <div className="alert alert-warning mb-2">
        <strong>Important:</strong> This tool is for informational purposes only and does not replace professional
        medical advice. In case of emergency, call 112 immediately.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card mb-2">
          <h3 className="card-title">Select Your Symptoms</h3>
          <p style={{ marginBottom: "1.5rem", color: "var(--text-light)" }}>
            Choose all symptoms you are currently experiencing:
          </p>

          {categories.map((category) => (
            <div key={category} style={{ marginBottom: "2rem" }}>
              <h4 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>{category}</h4>
              <div className="grid grid-2">
                {symptoms
                  .filter((symptom) => symptom.category === category)
                  .map((symptom) => (
                    <label
                      key={symptom.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        backgroundColor: selectedSymptoms.includes(symptom.id)
                          ? "var(--background-highlight)"
                          : "var(--light-background)",
                        borderRadius: "var(--border-radius)",
                        cursor: "pointer",
                        border: selectedSymptoms.includes(symptom.id)
                          ? "2px solid var(--primary-color)"
                          : "2px solid transparent",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSymptoms.includes(symptom.id)}
                        onChange={() => toggleSymptom(symptom.id)}
                      />
                      {symptom.name}
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card mb-2">
          <h3 className="card-title">Additional Information</h3>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">How long have you had these symptoms?</label>
              <select
                className="form-select"
                value={additionalInfo.duration}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, duration: e.target.value })}
              >
                <option value="">Select duration</option>
                <option value="less-than-day">Less than a day</option>
                <option value="1-3-days">1-3 days</option>
                <option value="4-7-days">4-7 days</option>
                <option value="1-2-weeks">1-2 weeks</option>
                <option value="more-than-2-weeks">More than 2 weeks</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">How would you rate the severity?</label>
              <select
                className="form-select"
                value={additionalInfo.severity}
                onChange={(e) => setAdditionalInfo({ ...additionalInfo, severity: e.target.value })}
              >
                <option value="">Select severity</option>
                <option value="mild">Mild - Barely noticeable</option>
                <option value="moderate">Moderate - Noticeable but manageable</option>
                <option value="severe">Severe - Significantly affecting daily activities</option>
                <option value="very-severe">Very Severe - Unable to function normally</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Notes (Optional)</label>
            <textarea
              className="form-textarea"
              value={additionalInfo.additionalNotes}
              onChange={(e) => setAdditionalInfo({ ...additionalInfo, additionalNotes: e.target.value })}
              placeholder="Describe any other details about your symptoms, triggers, or concerns..."
              rows={4}
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={selectedSymptoms.length === 0}>
            Analyze Symptoms ({selectedSymptoms.length} selected)
          </button>
        </div>
      </form>
    </div>
  )
}
