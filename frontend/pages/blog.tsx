import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import Blog from "../app/pages/Blog"

export default function BlogPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
