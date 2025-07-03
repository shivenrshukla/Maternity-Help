"use client"

import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
}

export default function Marketplace() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Prenatal Vitamins - Premium Formula",
      price: 29.99,
      category: "Supplements",
      image: "💊",
      rating: 4.8,
      reviews: 156,
      description: "Complete prenatal vitamin with folic acid, iron, and DHA",
      inStock: true,
    },
    {
      id: 2,
      name: "Maternity Support Belt",
      price: 39.99,
      category: "Maternity Wear",
      image: "🎗️",
      rating: 4.5,
      reviews: 89,
      description: "Comfortable support belt for pregnancy back pain relief",
      inStock: true,
    },
    {
      id: 3,
      name: "Baby Monitor with Video",
      price: 149.99,
      category: "Baby Gear",
      image: "📹",
      rating: 4.7,
      reviews: 234,
      description: "HD video baby monitor with smartphone app",
      inStock: false,
    },
    {
      id: 4,
      name: "Nursing Pillow - Organic Cotton",
      price: 49.99,
      category: "Nursing",
      image: "🤱",
      rating: 4.6,
      reviews: 178,
      description: "Ergonomic nursing pillow made with organic materials",
      inStock: true,
    },
    {
      id: 5,
      name: "Pregnancy Journal & Planner",
      price: 24.99,
      category: "Books & Journals",
      image: "📖",
      rating: 4.9,
      reviews: 92,
      description: "Beautiful journal to track your pregnancy journey",
      inStock: true,
    },
    {
      id: 6,
      name: "Stretch Mark Prevention Cream",
      price: 34.99,
      category: "Skincare",
      image: "🧴",
      rating: 4.3,
      reviews: 267,
      description: "Natural cream to prevent and reduce stretch marks",
      inStock: true,
    },
  ])

  const [cart, setCart] = useState<number[]>([])
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    rating: "",
    inStock: false,
  })
  const [sortBy, setSortBy] = useState("name")

  const categories = ["All", "Supplements", "Maternity Wear", "Baby Gear", "Nursing", "Books & Journals", "Skincare"]

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((id) => id !== productId))
  }

  const isInCart = (productId: number) => {
    return cart.includes(productId)
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = !filters.category || filters.category === "All" || product.category === filters.category
      const matchesPrice =
        !filters.priceRange ||
        (filters.priceRange === "under25" && product.price < 25) ||
        (filters.priceRange === "25to50" && product.price >= 25 && product.price <= 50) ||
        (filters.priceRange === "over50" && product.price > 50)
      const matchesRating = !filters.rating || product.rating >= Number.parseFloat(filters.rating)
      const matchesStock = !filters.inStock || product.inStock

      return matchesCategory && matchesPrice && matchesRating && matchesStock
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Marketplace</h1>
        <p className="page-subtitle">Shop for maternal health products and baby essentials</p>
      </div>

      <div className="flex-between mb-2">
        <div className="flex gap-1 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${filters.category === category ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setFilters({ ...filters, category })}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex" style={{ alignItems: "center", gap: "1rem" }}>
          <span>🛒 Cart ({cart.length})</span>
          <button className="btn btn-primary">View Cart</button>
        </div>
      </div>

      <div className="card mb-2">
        <h3 className="card-title">Filters & Sort</h3>
        <div className="grid grid-4">
          <div className="form-group">
            <label className="form-label">Price Range</label>
            <select
              className="form-select"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="">All Prices</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25 - $50</option>
              <option value="over50">Over $50</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Min Rating</label>
            <select
              className="form-select"
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sort By</label>
            <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Availability</label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
              />
              In Stock Only
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>{product.image}</div>
              {!product.inStock && (
                <div
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    display: "inline-block",
                  }}
                >
                  Out of Stock
                </div>
              )}
            </div>

            <h4 style={{ color: "var(--primary-color)", marginBottom: "0.5rem" }}>{product.name}</h4>

            <p style={{ fontSize: "0.9rem", color: "var(--text-light)", marginBottom: "1rem" }}>
              {product.description}
            </p>

            <div className="flex-between" style={{ marginBottom: "1rem" }}>
              <div>
                <div style={{ color: "#ffc107", fontSize: "1rem" }}>{renderStars(product.rating)}</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
                  {product.rating}/5 ({product.reviews} reviews)
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary-color)" }}>
                  ${product.price}
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {isInCart(product.id) ? (
                <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>
                  Remove from Cart
                </button>
              ) : (
                <button
                  className={`btn ${product.inStock ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => product.inStock && addToCart(product.id)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              )}
              <button className="btn btn-secondary">❤️</button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card text-center">
          <h3>No products found</h3>
          <p>Try adjusting your filters to see more products.</p>
        </div>
      )}
    </div>
  )
}
