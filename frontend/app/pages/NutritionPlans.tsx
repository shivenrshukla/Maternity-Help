"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface MealPlan {
  id: number
  week: number
  trimester: number
  meals: {
    breakfast: string[]
    lunch: string[]
    dinner: string[]
    snacks: string[]
  }
  nutrients: {
    calories: number
    protein: number
    calcium: number
    iron: number
    folicAcid: number
  }
}

interface NutritionTip {
  id: number
  trimester: number
  title: string
  description: string
  category: string
}

export default function NutritionPlans() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const [selectedTrimester, setSelectedTrimester] = useState(2)
  const selectedWeek = 28 // removed unused setSelectedWeek

  const mealPlans: MealPlan[] = [
    {
      id: 1,
      week: 28,
      trimester: 2,
      meals: {
        breakfast: [
          "Whole grain oatmeal with berries and nuts",
          "Greek yogurt with granola",
          "Scrambled eggs with spinach and whole wheat toast",
          "Smoothie with banana, spinach, and protein powder",
        ],
        lunch: [
          "Grilled chicken salad with mixed greens",
          "Quinoa bowl with roasted vegetables",
          "Lentil soup with whole grain bread",
          "Turkey and avocado wrap",
        ],
        dinner: [
          "Baked salmon with sweet potato and broccoli",
          "Lean beef stir-fry with brown rice",
          "Grilled chicken with quinoa and asparagus",
          "Vegetarian chili with cornbread",
        ],
        snacks: [
          "Apple slices with almond butter",
          "Carrot sticks with hummus",
          "Greek yogurt with berries",
          "Mixed nuts and dried fruit",
        ],
      },
      nutrients: {
        calories: 2200,
        protein: 85,
        calcium: 1200,
        iron: 27,
        folicAcid: 600,
      },
    },
  ]

  const nutritionTips: NutritionTip[] = [
    {
      id: 1,
      trimester: 1,
      title: "Focus on Folic Acid",
      description:
        "Essential for preventing birth defects. Found in leafy greens, citrus fruits, and fortified cereals.",
      category: "Vitamins",
    },
    {
      id: 2,
      trimester: 1,
      title: "Combat Morning Sickness",
      description: "Try ginger tea, small frequent meals, and bland foods like crackers and toast.",
      category: "Symptoms",
    },
    {
      id: 3,
      trimester: 2,
      title: "Increase Calcium Intake",
      description: "Your baby's bones are developing. Include dairy, leafy greens, and fortified foods.",
      category: "Minerals",
    },
    {
      id: 4,
      trimester: 2,
      title: "Iron-Rich Foods",
      description: "Prevent anemia with lean meats, beans, spinach, and iron-fortified cereals.",
      category: "Minerals",
    },
    {
      id: 5,
      trimester: 3,
      title: "Prepare for Breastfeeding",
      description: "Continue healthy eating habits and stay hydrated for successful breastfeeding.",
      category: "Preparation",
    },
    {
      id: 6,
      trimester: 3,
      title: "Manage Heartburn",
      description: "Eat smaller meals, avoid spicy foods, and don't lie down immediately after eating.",
      category: "Symptoms",
    },
  ]

  const currentMealPlan = mealPlans.find((plan) => plan.week === selectedWeek) || mealPlans[0]
  const currentTips = nutritionTips.filter((tip) => tip.trimester === selectedTrimester)

  const downloadPDF = (type: string) => {
    alert(`Downloading ${type} PDF...`)
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Nutrition & Diet Plans</h1>
        <p className="page-subtitle">Personalized nutrition guidance for your pregnancy journey</p>
      </div>

      {/* Trimester Selection */}
      <div className="card mb-2">
        <h3 className="card-title">Select Your Trimester</h3>
        <div className="flex gap-1">
          {[1, 2, 3].map((trimester) => (
            <button
              key={trimester}
              className={`btn ${selectedTrimester === trimester ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSelectedTrimester(trimester)}
            >
              Trimester {trimester}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-2">
        {/* Meal Plan */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Week {selectedWeek} Meal Plan</h3>
            <button className="btn btn-secondary" onClick={() => downloadPDF("meal-plan")}>
              📄 Download PDF
            </button>
          </div>

          {["breakfast", "lunch", "dinner", "snacks"].map((type) => (
            <div key={type} style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>
                {type === "breakfast"
                  ? "🌅 Breakfast"
                  : type === "lunch"
                  ? "🌞 Lunch"
                  : type === "dinner"
                  ? "🌙 Dinner"
                  : "🍎 Snacks"}
              </h4>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {currentMealPlan.meals[type as keyof typeof currentMealPlan.meals].map((item, i) => (
                  <li key={i} style={{ marginBottom: "0.25rem" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nutrition Info */}
        <div className="card">
          <h3 className="card-title">Daily Nutritional Targets</h3>
          {[
            { label: "Calories", value: currentMealPlan.nutrients.calories, unit: "kcal", color: "var(--primary-color)", width: "85%" },
            { label: "Protein", value: currentMealPlan.nutrients.protein, unit: "g", color: "var(--accent-color)", width: "90%" },
            { label: "Calcium", value: currentMealPlan.nutrients.calcium, unit: "mg", color: "var(--background-highlight)", width: "75%" },
            { label: "Iron", value: currentMealPlan.nutrients.iron, unit: "mg", color: "#28a745", width: "80%" },
            { label: "Folic Acid", value: currentMealPlan.nutrients.folicAcid, unit: "mcg", color: "#ffc107", width: "95%" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <div className="flex-between">
                <span>{item.label}</span>
                <strong>{item.value} {item.unit}</strong>
              </div>
              <div style={{ width: "100%", height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", marginTop: "0.25rem" }}>
                <div style={{ width: item.width, height: "100%", backgroundColor: item.color, borderRadius: "4px" }}></div>
              </div>
            </div>
          ))}
          <button className="btn btn-primary w-full mt-1">📊 View Detailed Nutrition Report</button>
        </div>
      </div>

      {/* Tips */}
      <div className="card mt-2">
        <div className="card-header">
          <h3 className="card-title">Trimester {selectedTrimester} Nutrition Tips</h3>
          <button className="btn btn-secondary" onClick={() => downloadPDF("nutrition-tips")}>
            📄 Download Tips PDF
          </button>
        </div>
        <div className="grid grid-2">
          {currentTips.map((tip) => (
            <div
              key={tip.id}
              style={{
                padding: "1rem",
                backgroundColor: "var(--light-background)",
                borderRadius: "var(--border-radius)",
                marginBottom: "1rem",
              }}
            >
              <div className="flex-between" style={{ marginBottom: "0.5rem" }}>
                <h4 style={{ color: "var(--primary-color)" }}>{tip.title}</h4>
                <span
                  style={{
                    backgroundColor: "var(--background-highlight)",
                    color: "var(--primary-color)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  {tip.category}
                </span>
              </div>
              <p style={{ color: "var(--text-light)" }}>{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recipes */}
      <div className="card">
        <h3 className="card-title">Healthy Recipe Suggestions</h3>
        <div className="grid grid-3">
          {[
            { emoji: "🥗", title: "Quinoa Power Bowl", desc: "High in protein and fiber" },
            { emoji: "🐟", title: "Baked Salmon", desc: "Rich in omega-3 fatty acids" },
            { emoji: "🥤", title: "Green Smoothie", desc: "Packed with vitamins and minerals" },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                backgroundColor: "var(--light-background)",
                borderRadius: "var(--border-radius)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{r.emoji}</div>
              <h4 style={{ color: "var(--primary-color)" }}>{r.title}</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>{r.desc}</p>
              <button className="btn btn-secondary">View Recipe</button>
            </div>
          ))}
        </div>
      </div>

      {/* Hydration */}
      <div className="card">
        <h3 className="card-title">Daily Hydration Goal</h3>
        <div className="flex-between" style={{ marginBottom: "1rem" }}>
          <span>Water Intake Today</span>
          <strong>6 / 8 glasses</strong>
        </div>
        <div style={{ width: "100%", height: "20px", backgroundColor: "#e0e0e0", borderRadius: "10px", marginBottom: "1rem" }}>
          <div style={{ width: "75%", height: "100%", backgroundColor: "#17a2b8", borderRadius: "10px" }}></div>
        </div>
        <div className="flex gap-1">
          <button className="btn btn-primary">💧 Add Glass</button>
          <button className="btn btn-secondary">📊 View History</button>
        </div>
      </div>
    </div>
  )
}
