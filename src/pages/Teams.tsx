"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MapPin } from "lucide-react"
import { schools } from "../data/mockData"

const Teams = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [schoolList, setSchoolList] = useState(schools)
  const [formData, setFormData] = useState({
    name: "",
    students: "",
    place: "",
    contact: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSchool = {
      id: schoolList.length + 1,
      name: formData.name,
      place: formData.place,
      students: Number.parseInt(formData.students),
      points: 0,
      group: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)] as "A" | "B" | "C" | "D",
    }
    setSchoolList([...schoolList, newSchool])
    setFormData({ name: "", students: "", place: "", contact: "" })
    setShowAddModal(false)
  }

  const sortedSchools = [...schoolList].sort((a, b) => b.points - a.points)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333" }}>Teams Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add School
        </button>
      </div>

      {/* School Leaderboard */}
      <div className="card">
        <h2 style={{ marginBottom: "20px", color: "#333" }}>School Leaderboard</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>School Name</th>
              <th>Location</th>
              <th>Students</th>
              <th>Points</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {sortedSchools.map((school, index) => (
              <tr key={school.id}>
                <td>#{index + 1}</td>
                <td>{school.name}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MapPin size={14} style={{ marginRight: "4px", color: "#666" }} />
                    {school.place}
                  </div>
                </td>
                <td>{school.students}</td>
                <td>
                  <strong>{school.points}</strong>
                </td>
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "#667eea",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    Group {school.group}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ marginBottom: "20px" }}>Add New School</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>School Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Students</label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Teams
