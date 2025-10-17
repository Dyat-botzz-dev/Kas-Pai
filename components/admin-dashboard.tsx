"use client"

import type React from "react"

import { useState } from "react"
import { StudentManagement } from "./admin/student-management"
import { PaymentManagement } from "./admin/payment-management"
import { SpendingManagement } from "./admin/spending-management"
import { EventManagement } from "./admin/event-management"
import { MemoryManagement } from "./admin/memory-management"
import { Users, CreditCard, ShoppingCart, Calendar, ImageIcon } from "lucide-react"

type AdminTab = "students" | "payments" | "spending" | "events" | "memories"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("students")

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "students", label: "Siswa", icon: <Users size={18} /> },
    { id: "payments", label: "Pembayaran", icon: <CreditCard size={18} /> },
    { id: "spending", label: "Belanja", icon: <ShoppingCart size={18} /> },
    { id: "events", label: "Acara", icon: <Calendar size={18} /> },
    { id: "memories", label: "Kenang-Kenangan", icon: <ImageIcon size={18} /> },
  ]

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-accent to-primary rounded-xl p-8 text-primary-foreground shadow-lg-light">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-primary-foreground/80">Kelola semua data kas kelas dari sini</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold transition-smooth hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-smooth flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md-light"
                : "bg-card text-muted-foreground border border-border hover:bg-secondary"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "students" && <StudentManagement />}
        {activeTab === "payments" && <PaymentManagement />}
        {activeTab === "spending" && <SpendingManagement />}
        {activeTab === "events" && <EventManagement />}
        {activeTab === "memories" && <MemoryManagement />}
      </div>
    </div>
  )
}
