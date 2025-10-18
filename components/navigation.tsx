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
  const [showHelp, setShowHelp] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "payment", label: "Riwayat Bayar", icon: "💳" },
    { id: "spending", label: "Rencana Belanja", icon: "🛒" },
    { id: "event", label: "Rencana Acara", icon: "🎉" },
    { id: "memories", label: "Kenang-Kenangan", icon: "📸" },
    { id: "help", label: "Bantuan", icon: "❓" },
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
                onClick={() => {
                  if (item.id === "help") setShowHelp(true)
                  else onPageChange(item.id)
                }}
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
                  if (item.id === "help") setShowHelp(true)
                  else onPageChange(item.id)
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

      {/* Modal Bantuan */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] animate-in fade-in">
          <div className="bg-background border border-border rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-3">❓ Bantuan & Panduan</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Berikut beberapa pertanyaan umum dan panduan singkat:
            </p>

            <ul className="space-y-3 text-sm">
              <li>
                <strong>💸 Cara Bayar Kas:</strong> Setiap Senin–Kamis Rp2.000 lewat bendahara atau sistem online.
              </li>
              <li>
                <strong>⏰ Lupa Bayar:</strong> Bayar ganda minggu berikutnya, sistem akan mencatat keterlambatan.
              </li>
              <li>
                <strong>🔐 Akses Admin:</strong> Hanya ketua kelas dan bendahara.
              </li>
              <li>
                <strong>🐞 Ada Bug?</strong> Hubungi developer via{" "}
                <a
                  href="https://wa.me/6287718203240"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}