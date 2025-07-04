"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/vaccinations", label: "Vaccinations", icon: "💉" },
  { path: "/health-tracker", label: "Health Tracker", icon: "📈" },
  { path: "/find-care", label: "Find Care", icon: "🏥" },
  { path: "/community", label: "Community", icon: "👥" },
  { path: "/video-call", label: "Video Call", icon: "📹" },
  { path: "/marketplace", label: "Marketplace", icon: "🛍️" },
  { path: "/symptoms-checker", label: "Symptoms", icon: "🩺" },
  { path: "/sos", label: "SOS", icon: "🚨" },
  { path: "/nutrition", label: "Nutrition", icon: "🥗" },
  { path: "/login", label: "Login", icon: "👤" }
]

export default function Navbar() {
  const [activeRoute, setActiveRoute] = useState("/")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (path: string) => {
    setActiveRoute(path)
  }

  const isActive = (path: string) => activeRoute === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              NurtureWell
            </span>
          </div>
        </div>

        {/* Horizontal Scrollable Nav */}
        <div className="mt-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
          <div className="flex space-x-2 min-w-fit">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
