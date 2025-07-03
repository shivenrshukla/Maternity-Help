import Navbar from "../app/components/Navbar"
import Footer from "../app/components/Footer"
import NutritionPlans from "../app/pages/NutritionPlans"

export default function NutritionPage() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <NutritionPlans />
      </main>
      <Footer />
    </div>
  )
}
