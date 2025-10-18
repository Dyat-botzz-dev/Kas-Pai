"use client"

import { useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: any) => void
  isAdmin: boolean
  onAdminLogout: () => void
  theme: string
  onThemeToggle: () => void
}

export function Navigation({
  currentPage,
  onPageChange,
  isAdmin,
  onAdminLogout,
  theme,
  onThemeToggle,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "payment", label: "Riwayat Bayar", icon: "💳" },
    { id: "spending", label: "Rencana Belanja", icon: "🛒" },
    { id: "event", label: "Rencana Acara", icon: "🎉" },
    { id: "memories", label: "Kenang-Kenangan", icon: "📸" },
    { id: "bantuan", label: "Bantuan", icon: "❓" },
    ...(isAdmin ? [{ id: "admin", label: "Admin Panel", icon: "⚙️" }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm-light">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => onPageChange("dashboard")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md-light group-hover:shadow-lg-light transition-smooth">
              <span className="text-primary-foreground font-bold text-lg">💰</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Kas Kelas</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-smooth flex items-center gap-2 font-medium text-sm ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground shadow-md-light"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-secondary transition-smooth text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isAdmin && (
              <button
                onClick={onAdminLogout}
                className="px-3 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-smooth font-medium hidden sm:block"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-smooth"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-smooth font-medium ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={onAdminLogout}
                className="w-full text-left px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-smooth font-medium"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
              }
