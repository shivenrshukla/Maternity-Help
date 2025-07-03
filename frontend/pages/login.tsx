import Navbar from "../components/nurturewell/Navbar"
import Footer from "../components/nurturewell/Footer"
import Login from "../components/nurturewell/pages/Login"

export default function LoginPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Login />
      </main>
      <Footer />
    </div>
  )
}
