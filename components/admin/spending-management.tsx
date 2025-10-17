"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import { getSpendings, addSpending, updateSpending, deleteSpending } from "@/lib/supabase-utils"
import { getSupabaseClient } from "@/lib/supabase"

interface Spending {
  id: string
  item: string
  estimated_cost: number
  actual_cost: number
  status: "planned" | "purchased" | "completed"
  date: string
  notes: string | null
}

export function SpendingManagement() {
  const [spendings, setSpendings] = useState<Spending[]>([])
  const [newSpending, setNewSpending] = useState({
    item: "",
    estimated_cost: 0,
    actual_cost: 0,
    status: "planned" as const,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()

    // Setup real-time subscription
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("spendings-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "spendings" }, () => {
        loadData()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadData = async () => {
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

  const handleAddSpending = async () => {
    if (!newSpending.item.trim()) return

    try {
      const spending = {
        item: newSpending.item,
        estimated_cost: newSpending.estimated_cost,
        actual_cost: newSpending.actual_cost,
        status: newSpending.status,
        date: newSpending.date,
        notes: newSpending.notes || null,
      }

      await addSpending(spending)
      setNewSpending({
        item: "",
        estimated_cost: 0,
        actual_cost: 0,
        status: "planned",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      })
      loadData()
    } catch (error) {
      console.error("Error adding spending:", error)
    }
  }

  const handleDeleteSpending = async (id: string) => {
    if (confirm("Yakin ingin menghapus pengeluaran ini?")) {
      try {
        await deleteSpending(id)
        loadData()
      } catch (error) {
        console.error("Error deleting spending:", error)
      }
    }
  }

  const handleUpdateSpending = async (id: string, updates: Partial<Spending>) => {
    try {
      await updateSpending(id, updates)
      loadData()
    } catch (error) {
      console.error("Error updating spending:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-primary">⏳</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Spending Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tambah Pengeluaran</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newSpending.item}
            onChange={(e) => setNewSpending({ ...newSpending, item: e.target.value })}
            placeholder="Nama barang/jasa"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newSpending.estimated_cost}
            onChange={(e) =>
              setNewSpending({
                ...newSpending,
                estimated_cost: Number.parseInt(e.target.value) || 0,
              })
            }
            placeholder="Estimasi biaya"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newSpending.actual_cost}
            onChange={(e) =>
              setNewSpending({
                ...newSpending,
                actual_cost: Number.parseInt(e.target.value) || 0,
              })
            }
            placeholder="Biaya aktual"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newSpending.status}
            onChange={(e) =>
              setNewSpending({
                ...newSpending,
                status: e.target.value as "planned" | "purchased" | "completed",
              })
            }
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="planned">Direncanakan</option>
            <option value="purchased">Dibeli</option>
            <option value="completed">Selesai</option>
          </select>
          <input
            type="date"
            value={newSpending.date}
            onChange={(e) => setNewSpending({ ...newSpending, date: e.target.value })}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newSpending.notes}
            onChange={(e) => setNewSpending({ ...newSpending, notes: e.target.value })}
            placeholder="Catatan"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddSpending}
          className="mt-4 w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Tambah Pengeluaran
        </button>
      </div>

      {/* Spendings List */}
      <div className="space-y-3">
        {spendings.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">Belum ada pengeluaran yang dicatat</p>
          </div>
        ) : (
          spendings.map((spending) => (
            <div
              key={spending.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{spending.item}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{spending.notes}</p>
                </div>
                <button
                  onClick={() => handleDeleteSpending(spending.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Estimasi</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Rp {spending.estimated_cost.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Aktual</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Rp {spending.actual_cost.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Status</p>
                  <select
                    value={spending.status}
                    onChange={(e) =>
                      handleUpdateSpending(spending.id, {
                        status: e.target.value as "planned" | "purchased" | "completed",
                      })
                    }
                    className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs"
                  >
                    <option value="planned">Direncanakan</option>
                    <option value="purchased">Dibeli</option>
                    <option value="completed">Selesai</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
