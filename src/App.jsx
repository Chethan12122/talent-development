import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Teams from "./pages/Teams"
import Users from "./pages/Users"
import Performance from "./pages/Performance"
import Leagues from "./pages/Leagues"

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/leagues" element={<Leagues />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
