"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MapPin } from "lucide-react"
import { students, schools } from "../data/mockData"
import { X } from "lucide-react"

const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [studentList, setStudentList] = useState(students)
  const [formData, setFormData] = useState({
    name: "",
    schoolName: "",
    std: "",
    age: "",
    schoolContact: "",
    personalContact: "",
    place: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStudent = {
      id: studentList.length + 1,
      ...formData,
      age: Number.parseInt(formData.age),
      points: Math.floor(Math.random() * 30) + 70, // Random points between 70-100
      ipoints: Math.floor(Math.random() * 10) + 10, // Add ipoints, e.g. random between 10-19
      schoolId: schools.find((s) => s.name === formData.schoolName)?.id || 1,
    }
    setStudentList([...studentList, newStudent])
    setFormData({
      name: "",
      schoolName: "",
      std: "",
      age: "",
      schoolContact: "",
      personalContact: "",
      place: "",
    })
    setShowAddModal(false)
  }

  const sortedStudents = [...studentList].sort((a, b) => b.points - a.points)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333" }}>Users Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} style={{ marginRight: "8px" }} />
          Add Student
        </button>
      </div>

      {/* Student Leaderboard */}
      <div className="card">
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Student Leaderboard</h2>
        
        {/* Desktop Table - Hidden on Mobile */}
        <div style={{ display: "none" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student Name</th>
                <th>School</th>
                <th>Class</th>
                <th>Age</th>
                <th>Location</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>#{index + 1}</td>
                  <td>{student.name}</td>
                  <td style={{ fontSize: "12px", color: "#666" }}>{student.schoolName}</td>
                  <td>{student.std}</td>
                  <td>{student.age}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <MapPin size={14} style={{ marginRight: "4px", color: "#666" }} />
                      {student.place}
                    </div>
                  </td>
                  <td>
                    <strong>{student.points}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div style={{ display: "block" }}>
          {sortedStudents.map((student, index) => (
            <div
              key={student.id}
              style={{
                border: "1px solid #e1e5e9",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header Row */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start",
                marginBottom: "12px" 
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      backgroundColor: "#667eea",
                      color: "white",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    #{index + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ 
                      margin: "0", 
                      fontSize: "16px", 
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "2px"
                    }}>
                      {student.name}
                    </h3>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#666",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {student.schoolName}
                    </div>
                  </div>
                </div>
                <div style={{ 
                  textAlign: "right",
                  flexShrink: 0
                }}>
                  <div style={{ 
                    fontSize: "20px", 
                    fontWeight: "bold", 
                    color: "#667eea",
                    lineHeight: 1
                  }}>
                    {student.points}
                  </div>
                  <div style={{ 
                    fontSize: "10px", 
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Points
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "12px",
                marginBottom: "12px" 
              }}>
                <div>
                  <div style={{ 
                    fontSize: "11px", 
                    color: "#666", 
                    marginBottom: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px" 
                  }}>
                    Class
                  </div>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    {student.std}
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: "11px", 
                    color: "#666", 
                    marginBottom: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px" 
                  }}>
                    Age
                  </div>
                  <div style={{ 
                    fontSize: "14px", 
                    fontWeight: "500",
                    color: "#333"
                  }}>
                    {student.age} years
                  </div>
                </div>
              </div>

              {/* Location Row */}
              <div style={{ 
                borderTop: "1px solid #f0f0f0", 
                paddingTop: "12px"
              }}>
                <div style={{ 
                  fontSize: "11px", 
                  color: "#666", 
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px" 
                }}>
                  Location
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "14px",
                  color: "#333"
                }}>
                  <MapPin size={14} style={{ marginRight: "6px", color: "#667eea", flexShrink: 0 }} />
                  <span style={{ 
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {student.place}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
          <h2 style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Add New Student
            <X size={24} style={{ cursor: "pointer" }} onClick={() => setShowAddModal(false)} />
          </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>School Name</label>
                <select
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  required
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Class/Standard</label>
                <select
                  value={formData.std}
                  onChange={(e) => setFormData({ ...formData, std: e.target.value })}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  min="13"
                  max="19"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>School Contact Number</label>
                <input
                  type="tel"
                  value={formData.schoolContact}
                  onChange={(e) => setFormData({ ...formData, schoolContact: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Personal Contact Number</label>
                <input
                  type="tel"
                  value={formData.personalContact}
                  onChange={(e) => setFormData({ ...formData, personalContact: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Place</label>
                <input
                  type="text"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .card div[style*="display: none"] {
            display: block !important;
          }
          .card div[style*="display: block"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Users