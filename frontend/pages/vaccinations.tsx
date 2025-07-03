import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import VaccinationReminders from "../app/pages/VaccinationReminders"

export default function VaccinationsPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <VaccinationReminders />
      </main>
      <Footer />
    </div>
  )
}
