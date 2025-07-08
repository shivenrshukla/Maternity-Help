"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
interface Post {
  id: number
  title: string
  content: string
  author: string
  date: string
  replies: number
  likes: number
  category: string
  isLiked: boolean
}

interface Reply {
  id: number
  postId: number
  content: string
  author: string
  date: string
}

export default function Community() {
    const router = useRouter()
    useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) {
    router.push("/login")
  }
}, [router]) // ✅ include router
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Tips for dealing with morning sickness",
      content: "I'm 8 weeks pregnant and struggling with severe morning sickness. What has worked for you?",
      author: "Sarah M.",
      date: "2024-01-10",
      replies: 12,
      likes: 8,
      category: "Pregnancy",
      isLiked: false,
    },
    {
      id: 2,
      title: "Best prenatal vitamins?",
      content: "My doctor recommended prenatal vitamins but there are so many options. Which ones do you recommend?",
      author: "Jessica L.",
      date: "2024-01-09",
      replies: 15,
      likes: 12,
      category: "Nutrition",
      isLiked: true,
    },
    {
      id: 3,
      title: "Exercise during pregnancy - what's safe?",
      content: "I used to be very active before pregnancy. What exercises are safe during the second trimester?",
      author: "Maria K.",
      date: "2024-01-08",
      replies: 9,
      likes: 6,
      category: "Fitness",
      isLiked: false,
    },
    {
      id: 4,
      title: "Preparing for labor - first time mom",
      content: "I'm 35 weeks and getting nervous about labor. Any advice for a first-time mom?",
      author: "Emily R.",
      date: "2024-01-07",
      replies: 23,
      likes: 18,
      category: "Labor & Delivery",
      isLiked: false,
    },
  ])

  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Pregnancy",
  })

  const categories = ["All", "Pregnancy", "Nutrition", "Fitness", "Labor & Delivery", "Postpartum", "Baby Care"]

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()

    const post: Post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: "You",
      date: new Date().toISOString().split("T")[0],
      replies: 0,
      likes: 0,
      category: newPost.category,
      isLiked: false,
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "", category: "Pregnancy" })
    setShowNewPostForm(false)
  }

  const filteredPosts =
    selectedCategory && selectedCategory !== "All" ? posts.filter((post) => post.category === selectedCategory) : posts

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Community</h1>
        <p className="page-subtitle">Connect with other mothers and share experiences</p>
      </div>

      <div className="flex-between mb-2">
        <div className="flex gap-1 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button className="btn btn-primary" onClick={() => setShowNewPostForm(true)}>
          New Post
        </button>
      </div>

      <div className="grid grid-1">
        {filteredPosts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex-between mb-1">
              <div>
                <span
                  style={{
                    backgroundColor: "var(--background-highlight)",
                    color: "var(--primary-color)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {post.category}
                </span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                {post.date} by {post.author}
              </div>
            </div>

            <h3 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>{post.title}</h3>

            <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>{post.content}</p>

            <div className="flex-between">
              <div className="flex gap-1">
                <button
                  className={`btn ${post.isLiked ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => handleLike(post.id)}
                >
                  {post.isLiked ? "❤️" : "🤍"} {post.likes}
                </button>
                <button className="btn btn-secondary">💬 {post.replies} Replies</button>
                <button className="btn btn-secondary">📤 Share</button>
              </div>

              <button className="btn btn-primary">View Discussion</button>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="card text-center">
          <h3>No posts found</h3>
          <p>No posts in the selected category. Be the first to start a discussion!</p>
        </div>
      )}

      {showNewPostForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create New Post</h3>
              <button className="modal-close" onClick={() => setShowNewPostForm(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitPost}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  className="form-textarea"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-1">
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
