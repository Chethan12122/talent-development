"use client"

import { useState } from "react"
import { Eye, X } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { students } from "../data/mockData"
import type { PerformanceDetails } from "../data/moc2"

// Import performanceData and assert its type
import performanceData from "../data/moc2"

interface Student {
  id: number
  name: string
  schoolName: string
  std: string
  age: number
  points: number
}


// Define the type for the performanceData object
type PerformanceData = {
  [key: string]: PerformanceDetails | { id: number; [key: string]: any }; // Allow for both types in mockData
};

interface SelectedStudent extends Student {
  performance: PerformanceDetails
}

const Performance = () => {
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent | null>(null)

  const getPerformanceData = (studentId: number): PerformanceDetails => {
    // Type casting to handle the object structure correctly
    const dataObject = performanceData as PerformanceData;
    let data: any = Array.isArray(dataObject)
      ? dataObject.find((item: any) => item.id === studentId)
      : dataObject[studentId.toString()];

    if (data && data.id !== undefined) {
      // Remove id if present
      const { id, ...rest } = data
      data = rest
    }

    return (
      data || {
        agility: Math.floor(Math.random() * 30) + 70,
        squat: Math.floor(Math.random() * 30) + 70,
        mbThrow: Math.floor(Math.random() * 30) + 70,
        jump: Math.floor(Math.random() * 30) + 70,
        speed: Math.floor(Math.random() * 30) + 70,
        details: {
          squatJump: { trial1: 18, trial2: 20, trial3: 19, best: 20, average: 19 },
          tenMSpeed: { time: 2.2, rank: Math.floor(Math.random() * 10) + 1 },
          agilityTest: { time: 13.5, rank: Math.floor(Math.random() * 10) + 1 },
          medicineBallThrow: { distance: 7.2, rank: Math.floor(Math.random() * 10) + 1 },
        },
      }
    )
  }

  const showPerformanceDetails = (student: Student) => {
    setSelectedStudent({
      ...student,
      performance: getPerformanceData(student.id),
    })
  }

  return (
    <div>
      <h1 style={{ marginBottom: "30px", color: "#333" }}>Performance Analysis</h1>

      <div className="card">
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Student Performance Overview</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>School</th>
              <th>Class</th>
              <th>Overall Points</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td style={{ fontSize: "12px", color: "#666" }}>{student.schoolName}</td>
                <td>{student.std}</td>
                <td>
                  <strong>{student.points}</strong>
                </td>
                <td>
                  <Eye
                    size={20}
                    className="eye-icon"
                    onClick={() => showPerformanceDetails(student)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Details Modal */}
      {selectedStudent && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: "800px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
            >
              <h2>Performance Details - {selectedStudent.name}</h2>
              <X size={24} style={{ cursor: "pointer" }} onClick={() => setSelectedStudent(null)} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3>Basic Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                <div>
                  <strong>School:</strong> {selectedStudent.schoolName}
                </div>
                <div>
                  <strong>Class:</strong> {selectedStudent.std}
                </div>
                <div>
                  <strong>Age:</strong> {selectedStudent.age}
                </div>
                <div>
                  <strong>Overall Points:</strong> {selectedStudent.points}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3>Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Agility", value: selectedStudent.performance.agility },
                    { name: "Squat", value: selectedStudent.performance.squat },
                    { name: "MB Throw", value: selectedStudent.performance.mbThrow },
                    { name: "Jump", value: selectedStudent.performance.jump },
                    { name: "Speed", value: selectedStudent.performance.speed },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3>Detailed Test Results</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "15px" }}>
                <div className="card" style={{ margin: 0 }}>
                  <h4>Squat Jump</h4>
                  <div>Trial 1: {selectedStudent.performance.details.squatJump.trial1} cm</div>
                  <div>Trial 2: {selectedStudent.performance.details.squatJump.trial2} cm</div>
                  <div>Trial 3: {selectedStudent.performance.details.squatJump.trial3} cm</div>
                  <div>
                    <strong>Best: {selectedStudent.performance.details.squatJump.best} cm</strong>
                  </div>
                  <div>Average: {selectedStudent.performance.details.squatJump.average} cm</div>
                </div>

                <div className="card" style={{ margin: 0 }}>
                  <h4>10m Speed Test</h4>
                  <div>Time: {selectedStudent.performance.details.tenMSpeed.time} seconds</div>
                  <div>Rank: #{selectedStudent.performance.details.tenMSpeed.rank}</div>
                </div>

                <div className="card" style={{ margin: 0 }}>
                  <h4>Agility Test</h4>
                  <div>Time: {selectedStudent.performance.details.agilityTest.time} seconds</div>
                  <div>Rank: #{selectedStudent.performance.details.agilityTest.rank}</div>
                </div>

                <div className="card" style={{ margin: 0 }}>
                  <h4>Medicine Ball Throw</h4>
                  <div>Distance: {selectedStudent.performance.details.medicineBallThrow.distance} meters</div>
                  <div>Rank: #{selectedStudent.performance.details.medicineBallThrow.rank}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Performance