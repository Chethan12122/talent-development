"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Calendar, Trophy } from "lucide-react"
import { leagues, schools } from "../data/mockData"

const Leagues = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [leagueList, setLeagueList] = useState(leagues)
  const [formData, setFormData] = useState({
    name: "",
    group: "A" as "A" | "B" | "C" | "D",
    date: "",
    schools: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newLeague = {
      id: leagueList.length + 1,
      name: formData.name,
      group: formData.group,
      date: formData.date,
      status: new Date(formData.date) > new Date() ? ("upcoming" as const) : ("completed" as const),
      schools: formData.schools,
    }
    setLeagueList([...leagueList, newLeague])
    setFormData({ name: "", group: "A", date: "", schools: [] })
    setShowAddModal(false)
  }

  const handleSchoolSelection = (schoolName: string) => {
    if (formData.schools.includes(schoolName)) {
      setFormData({
        ...formData,
        schools: formData.schools.filter((s) => s !== schoolName),
      })
    } else {
      setFormData({
        ...formData,
        schools: [...formData.schools, schoolName],
      })
    }
  }

  const getGroupSchools = (group: string) => {
    return schools.filter((school) => school.group === group)
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333" }}>Leagues Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add League
        </button>
      </div>

      {/* Leagues List */}
      <div style={{ display: "grid", gap: "20px" }}>
        {leagueList.map((league) => (
          <div key={league.id} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "15px",
              }}
            >
              <div>
                <h3 style={{ color: "#333", marginBottom: "5px" }}>{league.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", fontSize: "14px", color: "#666" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Calendar size={16} style={{ marginRight: "5px" }} />
                    {new Date(league.date).toISOString().slice(0, 10)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Trophy size={16} style={{ marginRight: "5px" }} />
                    Group {league.group}
                  </div>
                </div>
              </div>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  backgroundColor: league.status === "completed" ? "#28a745" : "#ffc107",
                  color: league.status === "completed" ? "white" : "#212529",
                }}
              >
                {league.status === "completed" ? "✓ Completed" : "⏳ Upcoming"}
              </span>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <h4 style={{ marginBottom: "10px" }}>Participating Schools:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {league.schools.map((schoolName, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {schoolName}
                  </span>
                ))}
              </div>
            </div>

            {"results" in league && league.results && (
              <div>
                <h4 style={{ marginBottom: "10px" }}>Results:</h4>
                <table className="table" style={{ margin: 0 }}>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>School</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {league.results.map((result) => (
                      <tr key={result.rank}>
                        <td>#{result.rank}</td>
                        <td>{result.school}</td>
                        <td>
                          <strong>{result.points}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add League Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ marginBottom: "20px" }}>Add New League</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>League Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Group</label>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value as "A" | "B" | "C" | "D" })}
                  required
                >
                  <option value="A">Group A</option>
                  <option value="B">Group B</option>
                  <option value="C">Group C</option>
                  <option value="D">Group D</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Select Schools (Group {formData.group})</label>
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  {getGroupSchools(formData.group).map((school) => (
                    <div key={school.id} style={{ marginBottom: "8px" }}>
                      <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={formData.schools.includes(school.name)}
                          onChange={() => handleSchoolSelection(school.name)}
                          style={{ marginRight: "8px" }}
                        />
                        {school.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add League
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leagues
