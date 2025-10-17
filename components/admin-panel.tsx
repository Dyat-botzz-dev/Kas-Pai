"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "./admin-login"
import { AdminDashboard } from "./admin-dashboard"

interface AdminPanelProps {
  onLogout: () => void
  onLoginSuccess?: () => void
}

export function AdminPanel({ onLogout, onLoginSuccess }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken")
    if (adminToken) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    onLoginSuccess?.()
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("adminToken")
    onLogout()
  }

  return isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />
}
