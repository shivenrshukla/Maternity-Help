import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import SymptomsChecker from "../app/pages/SymptomsChecker"

export default function SymptomsCheckerPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <SymptomsChecker />
      </main>
      <Footer />
    </div>
  )
}
