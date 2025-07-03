"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          NurtureWell
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" className={isActive("/") ? "active" : ""}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/vaccinations" className={isActive("/vaccinations") ? "active" : ""}>
              Vaccinations
            </Link>
          </li>
          <li>
            <Link href="/health-tracker" className={isActive("/health-tracker") ? "active" : ""}>
              Health Tracker
            </Link>
          </li>
          <li>
            <Link href="/find-care" className={isActive("/find-care") ? "active" : ""}>
              Find Care
            </Link>
          </li>
          <li>
            <Link href="/community" className={isActive("/community") ? "active" : ""}>
              Community
            </Link>
          </li>
          <li>
            <Link href="/video-call" className={isActive("/video-call") ? "active" : ""}>
              Video Call
            </Link>
          </li>
          <li>
            <Link href="/marketplace" className={isActive("/marketplace") ? "active" : ""}>
              Marketplace
            </Link>
          </li>
          <li>
            <Link href="/symptoms-checker" className={isActive("/symptoms-checker") ? "active" : ""}>
              Symptoms
            </Link>
          </li>
          <li>
            <Link href="/sos" className={isActive("/sos") ? "active" : ""}>
              SOS
            </Link>
          </li>
          <li>
            <Link href="/nutrition" className={isActive("/nutrition") ? "active" : ""}>
              Nutrition
            </Link>
          </li>
          <li>
            <Link href="/login" className={isActive("/login") ? "active" : ""}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
