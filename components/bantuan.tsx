"use client"

import { useState, useEffect } from "react"
import { getMemories } from "@/lib/supabase-utils"

interface Memory {
  id: string
  title: string
  date: string
  event_name: string
  image_url: string | null
  description: string | null
}

export function Memories() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMemories = async () => {
      try {
        setLoading(true)
        const data = await getMemories()
        setMemories(data)
      } catch (error) {
        console.error("Error loading memories:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMemories()

    // Setup real-time subscription
    const { getSupabaseClient } = require("@/lib/supabase")
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("memories-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "memories" }, () => {
        loadMemories()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-primary">⏳</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Kenang-Kenangan Kelas</h2>
        <p className="text-slate-600 dark:text-slate-400">Koleksi momen berharga dari berbagai acara kelas</p>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden h-48 bg-slate-200 dark:bg-slate-700">
              <img
                src={memory.image_url || "/placeholder.svg"}
                alt={memory.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">{memory.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{memory.event_name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{memory.description}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">📅 {formatDate(memory.date)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <span className="font-semibold">ℹ️ Info:</span> Foto dan video dari acara kelas dapat diunggah Oleh Admin.
           Semua kenang-kenangan akan ditampilkan di sini secara real-time.
        </p>
      </div>
    </div>
  )
}
