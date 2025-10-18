"use client"

import { useState, useEffect } from "react"
import { Navigation } from "./navigation"
import { StudentList } from "./student-list"
import { PaymentHistory } from "./payment-history"
import { SpendingPlan } from "./spending-plan"
import { EventPlan } from "./event-plan"
import { Memories } from "./memories"
import { Bantuan } from "./bantuan"
import { AdminPanel } from "./admin-panel"
import { useTheme } from "./theme-provider"

type Page = "dashboard" | "payment" | "spending" | "event" | "memories" | "admin"

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [isAdmin, setIsAdmin] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)
  }, [])

  const handleAdminLogin = () => {
    setIsAdmin(true)
    localStorage.setItem("isAdmin", "true")
    setCurrentPage("admin")
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.setItem("isAdmin", "false")
    setCurrentPage("dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isAdmin={isAdmin}
        onAdminLogout={handleAdminLogout}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Punya data lama di local storage?</p>
            <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
              Pindahkan semua data ke Supabase untuk akses yang lebih baik dan real-time updates.
            </p>
          </div>
          <a
            href="/migrate"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap ml-4"
          >
            Migrasi Data
          </a>
        </div>

        {currentPage === "dashboard" && <StudentList />}
        {currentPage === "payment" && <PaymentHistory />}
        {currentPage === "spending" && <SpendingPlan />}
        {currentPage === "event" && <EventPlan />}
        {currentPage === "memories" && <Memories />}
        {currentPage === "bantuan" && <Bantuan />}
        {currentPage === "admin" && isAdmin && <AdminPanel onLogout={handleAdminLogout} />}
        {currentPage === "admin" && !isAdmin && (
          <AdminPanel onLogout={handleAdminLogout} onLoginSuccess={handleAdminLogin} />
        )}
      </main>
    </div>
  )
}
