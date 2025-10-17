"use client"

import { useEffect, useState } from "react"
import { AdminPanel } from "@/components/admin-panel"
import { ThemeProvider } from "@/components/theme-provider"

export default function BendaharaPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <p className="text-foreground/60 font-medium">Memuat Panel Bendahara...</p>
          </div>
        </div>
      ) : (
        <AdminPanel />
      )}
    </ThemeProvider>
  )
}
