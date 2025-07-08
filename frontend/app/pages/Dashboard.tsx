"use client"

import { Link } from "react-router-dom"

export default function Dashboard() {
  const upcomingAppointments = [
    { id: 1, type: "Prenatal Checkup", date: "2024-01-15", doctor: "Dr. Sarah Johnson" },
    { id: 2, type: "Vaccination", date: "2024-01-20", doctor: "Dr. Mike Chen" },
    { id: 3, type: "Ultrasound", date: "2024-01-25", doctor: "Dr. Emily Davis" },
  ]

  const recentPosts = [
    { id: 1, title: "Tips for morning sickness", author: "Sarah M.", replies: 12 },
    { id: 2, title: "Best prenatal vitamins?", author: "Jessica L.", replies: 8 },
    { id: 3, title: "Exercise during pregnancy", author: "Maria K.", replies: 15 },
  ]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Welcome back, Sarah!</h1>
        <p className="page-subtitle">Heres your maternal health overview</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">28</div>
          <div className="stat-label">Weeks Pregnant</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3</div>
          <div className="stat-label">Upcoming Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Vaccinations Complete</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">95%</div>
          <div className="stat-label">Health Score</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Upcoming Appointments</h3>
            <Link to="/appointments" className="btn btn-secondary">
              View All
            </Link>
          </div>
          <div>
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="list-item">
                <div>
                  <strong>{appointment.type}</strong>
                  <p>
                    {appointment.date} - {appointment.doctor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Vaccination Reminders</h3>
            <Link to="/vaccinations" className="btn btn-secondary">
              Manage
            </Link>
          </div>
          <div>
            <div className="alert alert-warning">
              <strong>Reminder:</strong> Tdap vaccination due in 2 weeks
            </div>
            <div className="alert alert-success">
              <strong>Complete:</strong> Flu shot administered last month
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Health Tracker</h3>
            <Link to="/health-tracker" className="btn btn-secondary">
              Track Now
            </Link>
          </div>
          <div>
            <p>
              <strong>Last Weight:</strong> 65 kg (2 days ago)
            </p>
            <p>
              <strong>Blood Pressure:</strong> 120/80 mmHg (1 week ago)
            </p>
            <p>
              <strong>Fetal Movement:</strong> Active (Today)
            </p>
            <Link to="/health-tracker" className="btn btn-primary mt-1">
              Add New Entry
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Community Activity</h3>
            <Link to="/community" className="btn btn-secondary">
              Join Discussion
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <div key={post.id} className="list-item">
                <div>
                  <strong>{post.title}</strong>
                  <p>
                    by {post.author} • {post.replies} replies
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-3 mt-2">
        <Link to="/find-care" className="card text-center">
          <h3 className="card-title">Find Care</h3>
          <p>Locate nearby hospitals and doctors</p>
        </Link>

        <Link to="/video-call" className="card text-center">
          <h3 className="card-title">Video Consultation</h3>
          <p>Connect with healthcare providers</p>
        </Link>

        <Link to="/sos" className="card text-center">
          <h3 className="card-title">Emergency SOS</h3>
          <p>Quick access to emergency services</p>
        </Link>
      </div>
    </div>
  )
}
