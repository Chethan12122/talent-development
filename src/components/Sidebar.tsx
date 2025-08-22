"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Trophy, BarChart3, Calendar, Menu, X, MapPin } from "lucide-react"

const Sidebar = () => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const event = new CustomEvent("sidebarToggle", {
      detail: { isCollapsed },
    })
    window.dispatchEvent(event)
  }, [isCollapsed])

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/teams", icon: Trophy, label: "Teams" },
    { path: "/users", icon: Users, label: "Users" },
    { path: "/performance", icon: BarChart3, label: "Performance" },
    { path: "/leagues", icon: Calendar, label: "Leagues" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X size={22} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)} />}

      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            {!isCollapsed && <img src="/images/logo.png" alt="Talent Development Logo" className="logo" />}
            {!isCollapsed && <span className="logo-text">Talent Development</span>}
          </div>
          <button className="collapse-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            <Menu size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setIsMobileOpen(false)}
                title={isCollapsed ? item.label : ""}
              >
                <Icon size={20} className="nav-icon" />
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            )
          })}

          {/* Venue & Referees Section */}
          {!isCollapsed && (
            <div className="nav-item venue-info">
              <MapPin size={20} className="nav-icon" />
              <div className="nav-label">
                <div><strong>Venue:</strong> Ajjarkad Ground</div>
                <div style={{ marginTop: "4px" }}><strong>Referees:</strong></div>
                <ul style={{ marginLeft: "12px" }}>
                  <li>Rohan</li>
                  <li>Prajwal</li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
