import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import Login from "../app/pages/Login"

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
