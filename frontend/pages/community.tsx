import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import Community from "../app/pages/Community"

export default function CommunityPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Community />
      </main>
      <Footer />
    </div>
  )
}
