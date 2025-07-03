import Navbar from "../components/nurturewell/Navbar"
import Footer from "../components/nurturewell/Footer"
import Signup from "../components/nurturewell/pages/Signup"

export default function SignupPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Signup />
      </main>
      <Footer />
    </div>
  )
}
