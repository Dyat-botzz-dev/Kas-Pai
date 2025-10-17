"use client"

import { useState, useEffect } from "react"
import { getEvents } from "@/lib/supabase-utils"

interface Event {
  id: string
  name: string
  date: string
  location: string
  description: string | null
  budget: number
  status: "planning" | "confirmed" | "completed"
}

export function EventPlan() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const data = await getEvents()
        setEvents(data)
      } catch (error) {
        console.error("Error loading events:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()

    // Setup real-time subscription
    const { getSupabaseClient } = require("@/lib/supabase")
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("events-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
        loadEvents()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planning: "Perencanaan",
      confirmed: "Terkonfirmasi",
      completed: "Selesai",
    }
    return labels[status] || status
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-primary">⏳</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total Anggaran Acara</p>
            <p className="text-4xl font-bold mt-2">Rp {totalBudget.toLocaleString("id-ID")}</p>
            <p className="text-purple-100 text-sm mt-2">{events.length} acara</p>
          </div>
          <div className="text-6xl opacity-20">🎉</div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{event.name}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {getStatusLabel(event.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>📅</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>📍</span>
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{event.description}</p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">Anggaran</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Rp {event.budget.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
