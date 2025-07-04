"use client"

import { useState } from "react"
import Link from "next/link"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const res = await fetch(`http://localhost:8001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      alert(data.message || "Login failed")
    } else {
      // Store token in localStorage or cookie
      localStorage.setItem("token", data.token)
      alert("Login successful!")
      window.location.href = "/" // or wherever
    }
  } catch (err) {
    alert("Something went wrong. Please try again.")
  }
}


  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-light)" }}>Sign in to your NurtureWell account</p>
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

          <button type="submit" className="btn btn-primary w-full mb-1">
            Sign In
          </button>

          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Link href="/forgot-password" legacyBehavior>
              <a style={{ color: "var(--primary-color)", textDecoration: "none" }}>
                Forgot your password?
              </a>
            </Link>
          </div>

          <div style={{ textAlign: "center", padding: "1rem 0", borderTop: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Don't have an account?</p>
            <Link href="/signup" legacyBehavior>
              <a className="btn btn-secondary">Create Account</a>
            </Link>
          </div>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>Or sign in with</p>
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
        <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
