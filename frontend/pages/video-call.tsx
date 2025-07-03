import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import VideoCall from "../app/pages/VideoCall"

export default function VideoCallPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <VideoCall />
      </main>
      <Footer />
    </div>
  )
}
