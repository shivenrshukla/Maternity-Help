import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import FindCare from "../app/pages/FindCare"

export default function FindCarePage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <FindCare />
      </main>
      <Footer />
    </div>
  )
}
