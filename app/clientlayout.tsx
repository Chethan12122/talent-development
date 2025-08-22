"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "../src/components/Sidebar"
import "../src/index.css"

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // <CHANGE> Adding effect to listen for sidebar collapse state
  useEffect(() => {
    const handleSidebarToggle = (event: CustomEvent) => {
      setIsCollapsed(event.detail.isCollapsed)
    }

    window.addEventListener("sidebarToggle", handleSidebarToggle as EventListener)

    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle as EventListener)
    }
  }, [])

  return (
    <div className="app">
      <Sidebar />
      {/* <CHANGE> Adding dynamic class for responsive main content */}
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`} id="main-content">
        {children}
      </div>
    </div>
  )
}
