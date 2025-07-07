"use client"

import { useState, useEffect } from "react"

interface BlogPost {
  title: string
  content: string
  author: string
  role: string
  date: string
}

export default function Blog() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null)

  // Load user and blogs (with mock data on first load)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setCurrentUser({ name: user.name, role: user.role })
    }

    const storedBlogs = localStorage.getItem("blogs")

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs))
    } else {
      // Inject mock blogs on first visit
      const mockBlogs: BlogPost[] = [
        {
          title: "5 Tips for a Healthy Pregnancy",
          content:
            "Stay hydrated, eat balanced meals, get regular checkups, rest well, and reduce stress. Your journey matters!",
          author: "Dr. Meera Sharma",
          role: "doctor",
          date: "2024-11-02 10:15 AM",
        },
        {
          title: "My First Trimester Journey",
          content:
            "Nausea, fatigue, and mood swings were tough, but journaling and light yoga really helped me stay grounded.",
          author: "Ananya Patel",
          role: "patient",
          date: "2024-11-08 3:30 PM",
        },
        {
          title: "Importance of Vaccinations During Pregnancy",
          content:
            "Vaccines protect you and your baby. Talk to your healthcare provider about flu shots, Tdap, and more.",
          author: "Dr. Ravi Kumar",
          role: "doctor",
          date: "2024-11-15 9:00 AM",
        },
      ]

      setBlogs(mockBlogs)
      localStorage.setItem("blogs", JSON.stringify(mockBlogs))
    }
  }, [])

  // Handle new blog submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      alert("Please log in to post a blog.")
      return
    }

    const newBlog: BlogPost = {
      title,
      content,
      author: currentUser.name,
      role: currentUser.role,
      date: new Date().toLocaleString(),
    }

    const updated = [newBlog, ...blogs]
    setBlogs(updated)
    localStorage.setItem("blogs", JSON.stringify(updated))

    setTitle("")
    setContent("")
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 mt-40">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Blogs</h1>

      <form onSubmit={handleSubmit} className="mb-10 bg-white shadow p-6 rounded-md space-y-4">
        <h2 className="text-xl font-semibold">Write a Blog</h2>

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          placeholder="Your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Post Blog
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet. Be the first to post!</p>
      ) : (
        blogs.map((blog, i) => (
          <div key={i} className="mb-6 p-4 border rounded-md shadow-sm bg-white">
            <h3 className="text-lg font-bold">{blog.title}</h3>
            <div className="text-sm text-gray-500">
              by {blog.author} ({blog.role}) on {blog.date}
            </div>
            <p className="mt-2 whitespace-pre-wrap">{blog.content}</p>
          </div>
        ))
      )}
    </div>
  )
}
