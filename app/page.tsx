"use client"

import { useEffect, useState } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { Dashboard } from "@/components/dashboard"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import Bantuan from "@/components/bantuan"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [theme, setTheme] = useState("light")
  const [isAdmin, setIsAdmin] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setCurrentPage("dashboard")
  }

  if (isLoading) return <LoadingScreen />

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-zinc-950 text-white" : "bg-white text-black"
        }`}
      >
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isAdmin={isAdmin}
          onAdminLogout={handleAdminLogout}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />

        <main className="p-6">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "help" && <Bantuan />}
          {/* Tambahkan komponen lain di sini */}
        </main>
      </div>
    </ThemeProvider>
  )
}