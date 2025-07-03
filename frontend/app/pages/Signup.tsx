"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dueDate: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: string[] = []

    if (formData.password !== formData.confirmPassword) {
      newErrors.push("Passwords do not match")
    }

    if (formData.password.length < 8) {
      newErrors.push("Password must be at least 8 characters long")
    }

    if (!formData.agreeToTerms) {
      newErrors.push("You must agree to the Terms of Service")
    }

    setErrors(newErrors)

    if (newErrors.length === 0) {
      // Mock signup functionality
      alert("Account created successfully! Please check your email for verification.")
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>Join NurtureWell</h1>
          <p style={{ color: "var(--text-light)" }}>Create your account to start your maternal health journey</p>
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
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

          <div className="form-group">
            <label className="form-label">Expected Due Date (Optional)</label>
            <input
              type="date"
              className="form-input"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

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
                <Link to="/terms" style={{ color: "var(--primary-color)" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" style={{ color: "var(--primary-color)" }}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full mb-1">
            Create Account
          </button>

          <div style={{ textAlign: "center", padding: "1rem 0", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Already have an account?</p>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>Or sign up with</p>
          <div className="flex gap-1">
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              📧 Google
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              📘 Facebook
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-light)", fontSize: "0.9rem" }}>
        <p>By creating an account, you agree to receive health tips and updates from NurtureWell</p>
      </div>
    </div>
  )
}
