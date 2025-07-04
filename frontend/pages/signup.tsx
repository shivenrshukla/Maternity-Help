import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import Signup from "../app/pages/Signup"


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
