import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Dashboard from "./components/pages/Dashboard"

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}
