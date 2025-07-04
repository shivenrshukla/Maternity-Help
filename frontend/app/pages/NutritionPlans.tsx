"use client"

import { useState } from "react"
import { useEffect } from "react"
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
  }, [])
  const [selectedTrimester, setSelectedTrimester] = useState(2)
  const [selectedWeek, setSelectedWeek] = useState(28)

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
    // Mock download functionality
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
        {/* Weekly Meal Plan */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Week {selectedWeek} Meal Plan</h3>
            <button className="btn btn-secondary" onClick={() => downloadPDF("meal-plan")}>
              📄 Download PDF
            </button>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>🌅 Breakfast</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {currentMealPlan.meals.breakfast.map((meal, index) => (
                <li key={index} style={{ marginBottom: "0.25rem" }}>
                  {meal}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>🌞 Lunch</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {currentMealPlan.meals.lunch.map((meal, index) => (
                <li key={index} style={{ marginBottom: "0.25rem" }}>
                  {meal}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>🌙 Dinner</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {currentMealPlan.meals.dinner.map((meal, index) => (
                <li key={index} style={{ marginBottom: "0.25rem" }}>
                  {meal}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>🍎 Snacks</h4>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {currentMealPlan.meals.snacks.map((snack, index) => (
                <li key={index} style={{ marginBottom: "0.25rem" }}>
                  {snack}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nutritional Information */}
        <div className="card">
          <h3 className="card-title">Daily Nutritional Targets</h3>

          <div style={{ marginBottom: "1rem" }}>
            <div className="flex-between">
              <span>Calories</span>
              <strong>{currentMealPlan.nutrients.calories} kcal</strong>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: "85%",
                  height: "100%",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div className="flex-between">
              <span>Protein</span>
              <strong>{currentMealPlan.nutrients.protein}g</strong>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  backgroundColor: "var(--accent-color)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div className="flex-between">
              <span>Calcium</span>
              <strong>{currentMealPlan.nutrients.calcium}mg</strong>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: "75%",
                  height: "100%",
                  backgroundColor: "var(--background-highlight)",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div className="flex-between">
              <span>Iron</span>
              <strong>{currentMealPlan.nutrients.iron}mg</strong>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "#28a745",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <div className="flex-between">
              <span>Folic Acid</span>
              <strong>{currentMealPlan.nutrients.folicAcid}mcg</strong>
            </div>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "0.25rem",
              }}
            >
              <div
                style={{
                  width: "95%",
                  height: "100%",
                  backgroundColor: "#ffc107",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-1">📊 View Detailed Nutrition Report</button>
        </div>
      </div>

      {/* Trimester-Specific Tips */}
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

      {/* Recipe Suggestions */}
      <div className="card">
        <h3 className="card-title">Healthy Recipe Suggestions</h3>
        <div className="grid grid-3">
          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--light-background)",
              borderRadius: "var(--border-radius)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🥗</div>
            <h4 style={{ color: "var(--primary-color)" }}>Quinoa Power Bowl</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>High in protein and fiber</p>
            <button className="btn btn-secondary">View Recipe</button>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--light-background)",
              borderRadius: "var(--border-radius)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🐟</div>
            <h4 style={{ color: "var(--primary-color)" }}>Baked Salmon</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>Rich in omega-3 fatty acids</p>
            <button className="btn btn-secondary">View Recipe</button>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: "var(--light-background)",
              borderRadius: "var(--border-radius)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🥤</div>
            <h4 style={{ color: "var(--primary-color)" }}>Green Smoothie</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>Packed with vitamins and minerals</p>
            <button className="btn btn-secondary">View Recipe</button>
          </div>
        </div>
      </div>

      {/* Hydration Tracker */}
      <div className="card">
        <h3 className="card-title">Daily Hydration Goal</h3>
        <div className="flex-between" style={{ marginBottom: "1rem" }}>
          <span>Water Intake Today</span>
          <strong>6 / 8 glasses</strong>
        </div>
        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              width: "75%",
              height: "100%",
              backgroundColor: "#17a2b8",
              borderRadius: "10px",
            }}
          ></div>
        </div>
        <div className="flex gap-1">
          <button className="btn btn-primary">💧 Add Glass</button>
          <button className="btn btn-secondary">📊 View History</button>
        </div>
      </div>
    </div>
  )
}
