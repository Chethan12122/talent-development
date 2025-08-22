"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MapPin } from "lucide-react"
import { students, schools } from "../data/mockData"

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

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 style={{ marginBottom: "20px" }}>Add New Student</h2>
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
    </div>
  )
}

export default Users
