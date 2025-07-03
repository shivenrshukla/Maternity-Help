import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import HealthTracker from "../app/pages/HealthTracker"

export default function HealthTrackerPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <HealthTracker />
      </main>
      <Footer />
    </div>
  )
}
