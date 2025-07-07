"use client"

import { useState } from "react"
import Link from "next/link"

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dueDate: "",
    agreeToTerms: false,
    licenseFile: "", // base64 string
    licenseFileName: "", // name for UI
  })

  const [role, setRole] = useState<"patient" | "doctor">("patient")
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push("Enter a valid email address")
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    if (formData.password.length < 8) {
      newErrors.push("Password must be at least 8 characters long")
    }

    if (!formData.agreeToTerms) {
      newErrors.push("You must agree to the Terms of Service")
    }

    if (role === "doctor" && !formData.licenseFile) {
      newErrors.push("Please upload your medical license (PDF)")
    }

    const existingUser = JSON.parse(localStorage.getItem("user") || "{}")
    if (existingUser?.email === formData.email) {
      newErrors.push("User already exists. Please log in.")
    }

    setErrors(newErrors)
    if (newErrors.length > 0) return

    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      dueDate: formData.dueDate,
      role,
      licenseFile: formData.licenseFile,
      licenseFileName: formData.licenseFileName,
    }

    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("role", role)
    localStorage.setItem("token", "demo_token_value")

    alert(`Signup successful as ${role}!`)
    window.location.href = `/login`
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        setFormData((prev) => ({
          ...prev,
          licenseFile: base64,
          licenseFileName: file.name,
        }))
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please upload a valid PDF file.")
    }
  }
  function shortenFileName(name: string, maxLength = 30): string {
  if (name.length <= maxLength) return name
  const ext = name.slice(name.lastIndexOf("."))
  const start = name.slice(0, 12)
  const end = name.slice(-10)
  return `${start}...${end}${ext}`
}

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <div className="card">
        <div style={{ display: "flex", borderBottom: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
          {["patient", "doctor"].map((tab) => (
            <button
              key={tab}
              onClick={() => setRole(tab as "patient" | "doctor")}
              style={{
                flex: 1,
                padding: "1rem",
                border: "none",
                backgroundColor:
                  role === tab
                    ? tab === "doctor"
                      ? "#780d2c"
                      : "var(--primary-color)"
                    : "#f0f0f0",
                color: role === tab ? "white" : "black",
                fontWeight: role === tab ? "bold" : "normal",
                cursor: "pointer",
                transition: "0.3s",
                borderRadius: 
                    tab === "patient"
                      ? "0.5rem 0 0 0.5rem"
                      : "0 0.5rem 0.5rem 0",
              }}
            >
              {tab === "patient" ? "Patient Signup" : "Doctor Signup"}
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: role === "doctor" ? "#780d2c" : "var(--primary-color)" }}>
            Join NurtureWell
          </h1>
          <p style={{ color: "var(--text-light)" }}>
            Create your account to start your {role} journey
          </p>
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          {role === "patient" && (
            <div className="form-group">
              <label className="form-label">Expected Due Date (Optional)</label>
              <input
                type="date"
                className="form-input"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          )}


          {/* Show PDF Upload only for Doctor */}
          {role === "doctor" && (
            <div className="form-group">
              <label className="form-label">Upload Medical License (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                className="form-input"
                onChange={handleFileUpload}
              />
              {formData.licenseFile && (
                <div style={{ color: "green", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  ✅ Uploaded: {shortenFileName(formData.licenseFileName)}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                style={{ marginTop: "0.25rem" }}
              />
              <span style={{ fontSize: "0.9rem" }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "var(--primary-color)" }}>Terms of Service</Link> and{" "}
                <Link href="/privacy" style={{ color: "var(--primary-color)" }}>Privacy Policy</Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mb-1"
            style={{ background: role === "doctor" ? "#780d2c" : "var(--primary-color)" }}
          >
            Create Account
          </button>

          <div style={{ textAlign: "center", padding: "1rem 0", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Already have an account?</p>
            <Link href="/login" className="btn btn-secondary">Sign In</Link>
          </div>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Or sign up with
          </p>
          <div className="flex gap-1">
            <button className="btn btn-secondary" style={{ flex: 1 }}>📧 Google</button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>📘 Facebook</button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-light)", fontSize: "0.9rem" }}>
        <p>By creating an account, you agree to receive health tips and updates from NurtureWell</p>
      </div>
    </div>
  )
}
