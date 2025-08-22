"use client"

import { Trophy, Users, School, Target, ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import { schools, students, leagues } from "../data/mockData"

const Dashboard = () => {
  const [isLeagueExpanded, setIsLeagueExpanded] = useState(false)

  // Calculate top 10 schools by points
  const topSchools = [...schools].sort((a, b) => b.points - a.points).slice(0, 10)

  // Calculate top 10 students by points
  const topStudents = [...students].sort((a, b) => b.points - a.points).slice(0, 10)

  const totalStudents = students.length
  const totalSchools = schools.length
  const avgPoints = Math.round(schools.reduce((sum, school) => sum + school.points, 0) / schools.length)

  // Helper function to format date consistently
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      timeZone: 'UTC' // This ensures consistent formatting across server/client
    }
    return date.toLocaleDateString('en-GB', options) // DD/MM/YYYY format
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-images">
          <div className="header-left">
            <img src="/images/logo.png" alt="logo" className="header-image rounded-full" />
          </div>
          <div className="header-center">
          <img src="/images/karnatakaathlet.png" alt="Karnataka Athletic Association" className="header-image header-center-image" />
          </div>
          <div className="header-right">
            <img src="/images/gparam.png" alt="G. Parameshwara" className="header-image rounded-full" />
            <p className="text-sm font-medium text-gray-700">G. Parameshwara</p>
            <p className="text-xs text-gray-600">Minister of Home Affairs of Karnataka</p>
          </div>
        </div>
        <h1 className="dashboard-title">Talent Development Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <School size={40} color="#667eea" />
          <div className="stat-number">{totalSchools}</div>
          <div className="stat-label">Total Schools</div>
        </div>
        <div className="stat-card">
          <Users size={40} color="#667eea" />
          <div className="stat-number">214</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <Trophy size={40} color="#667eea" />
          <div className="stat-number">{avgPoints}</div>
          <div className="stat-label">Average Points</div>
        </div>
        <div className="stat-card">
          <Target size={40} color="#667eea" />
          <div className="stat-number">4</div>
          <div className="stat-label">Competition Groups</div>
        </div>
      </div>

      <div className="leaderboards">
        {/* Top 10 Schools Leaderboard */}
        <div className="card">
          <h2 className="card-title">🏆 Top 10 Schools</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>School Name</th>
                  <th>Points</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {topSchools.map((school, index) => (
                  <tr key={school.id}>
                    <td>#{index + 1}</td>
                    <td>{school.name}</td>
                    <td>
                      <strong>{school.points}</strong>
                    </td>
                    <td>
                      <span className="group-badge">{school.group}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 10 Students Leaderboard */}
        <div className="card">
          <h2 className="card-title">🌟 Top 10 Students</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>School</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>#{index + 1}</td>
                    <td>{student.name}</td>
                    <td className="school-name">{student.schoolName}</td>
                    <td>
                      <strong>{student.points}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

<div className="card league-section">
  <h2 className="card-title flex items-center gap-2">
    <Calendar size={24} />
    League Details
  </h2>

  <div className="league-content">
    <div className="venue-info-card">
      <MapPin size={20} />
      <div>
        <strong>Venue:</strong> Ajjarkad Ground
        <br />
        <strong>Referees:</strong> Muhammad Kaif, Gautam, Vishwas
      </div>
    </div>

    <div className="leagues-grid">
      {leagues.map((league) => (
        <div key={league.id} className={`league-card ${league.status}`}>
          <div className="league-card-header">
            <h3>{league.name}</h3>
            <span className={`status-badge ${league.status}`}>
              {league.status === "completed" ? "✅ Completed" : "⏳ Upcoming"}
            </span>
          </div>

          <div className="league-info">
            <p>
              <strong>Group:</strong> {league.group}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(league.date)}
            </p>
            <p>
              <strong>Schools:</strong> {league.schools.length}
            </p>
          </div>

          <div className="participating-schools">
            <h4>Participating Schools:</h4>
            <ul>
              {league.schools.map((school, index) => (
                <li key={index}>{school}</li>
              ))}
            </ul>
          </div>

          {league.status === "completed" && league.results && (
            <div className="league-results">
              <h4>Results:</h4>
              <div className="results-table">
                {league.results.map((result) => (
                  <div key={result.rank} className="result-row">
                    <span className="rank">#{result.rank}</span>
                    <span className="school">{result.school}</span>
                    <span className="points">{result.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

    </div>
  )
}

export default Dashboard