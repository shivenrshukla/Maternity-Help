import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import Marketplace from "../app/pages/Marketplace"

export default function MarketplacePage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Marketplace />
      </main>
      <Footer />
    </div>
  )
}
