"use client"

import { useState } from "react"
import Link from "next/link"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [role, setRole] = useState<"patient" | "doctor">("patient")

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const savedUser = JSON.parse(localStorage.getItem("user") || "{}")

  if (!savedUser.email || !savedUser.password || !savedUser.role) {
    alert("No registered user found. Please sign up first.")
    return
  }

  if (
    formData.email === savedUser.email &&
    formData.password === savedUser.password &&
    role === savedUser.role
  ) {
    localStorage.setItem("token", "demo_token_value")
    localStorage.setItem("role", role)

    alert(`Login successful as ${role}!`)
    window.location.href = `/`
  } else {
    alert("Invalid email, password, or role mismatch.")
  }
}


  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <div className="card">
        {/* Role Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border-color)",
            marginBottom: "1.5rem",
          }}
        >
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
                      ? "#780d2c" // doc
                      : "var(--primary-color)" // patient
                    : "#f0f0f0", // light gray when inactive
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
              {tab === "patient" ? "Patient Login" : "Doctor Login"}
            </button>

          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: role === "doctor" ? "#780d2c" : "var(--primary-color)", marginBottom: "0.5rem" }}>
            Sign in to your NurtureWell account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full mb-1"
            style={{
              backgroundColor: role === "doctor" ? "#780d2c" : "var(--primary-color)",
              color: "#fff",
              padding: "0.75rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>

          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Link href="/forgot-password" legacyBehavior>
              <a style={{ color: "var(--primary-color)", textDecoration: "none" }}>
                Forgot your password?
              </a>
            </Link>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "1rem 0",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              Don't have an account?
            </p>
            <Link href="/signup" legacyBehavior>
              <a className="btn btn-secondary">Create Account</a>
            </Link>
          </div>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Or sign in with
          </p>
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

      <div
        style={{
          textAlign: "center",
          marginTop: "2rem",
          color: "var(--text-light)",
          fontSize: "0.9rem",
        }}
      >
        <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
