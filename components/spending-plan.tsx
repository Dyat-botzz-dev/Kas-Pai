"use client"

import { useState, useEffect } from "react"
import { getSpendings } from "@/lib/supabase-utils"

interface Spending {
  id: string
  item: string
  estimated_cost: number
  actual_cost: number
  status: "planned" | "purchased" | "completed"
  date: string
  notes: string | null
}

export function SpendingPlan() {
  const [spendings, setSpendings] = useState<Spending[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSpendings = async () => {
      try {
        setLoading(true)
        const data = await getSpendings()
        setSpendings(data)
      } catch (error) {
        console.error("Error loading spendings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSpendings()

    // Setup real-time subscription
    const { getSupabaseClient } = require("@/lib/supabase")
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("spendings-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "spendings" }, () => {
        loadSpendings()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      purchased: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      planned: "Direncanakan",
      purchased: "Dibeli",
      completed: "Selesai",
    }
    return labels[status] || status
  }

  const totalEstimated = spendings.reduce((sum, s) => sum + s.estimated_cost, 0)
  const totalActual = spendings.reduce((sum, s) => sum + s.actual_cost, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-primary">⏳</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Estimasi Total</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            Rp {totalEstimated.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Pengeluaran Aktual</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            Rp {totalActual.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Sisa Anggaran</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            Rp {(totalEstimated - totalActual).toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Spending List */}
      <div className="space-y-3">
        {spendings.map((spending) => (
          <div
            key={spending.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{spending.item}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(spending.status)}`}>
                    {getStatusLabel(spending.status)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{spending.notes}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tanggal: {new Date(spending.date).toLocaleDateString("id-ID")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Estimasi: Rp {spending.estimated_cost.toLocaleString("id-ID")}
                </p>
                {spending.actual_cost > 0 && (
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Aktual: Rp {spending.actual_cost.toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
