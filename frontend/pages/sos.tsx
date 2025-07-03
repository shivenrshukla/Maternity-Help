import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import SOS from "../app/pages/SOS"

export default function SOSPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <SOS />
      </main>
      <Footer />
    </div>
  )
}
