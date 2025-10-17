"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import { getMemories, addMemory, deleteMemory } from "@/lib/supabase-utils"
import { getSupabaseClient } from "@/lib/supabase"

interface Memory {
  id: string
  title: string
  date: string
  event_name: string
  image_url: string | null
  description: string | null
}

export function MemoryManagement() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [newMemory, setNewMemory] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    event_name: "",
    image_url: "",
    description: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()

    // Setup real-time subscription
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("memories-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "memories" }, () => {
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
      const data = await getMemories()
      setMemories(data)
    } catch (error) {
      console.error("Error loading memories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMemory = async () => {
    if (!newMemory.title.trim()) return

    try {
      const memory = {
        title: newMemory.title,
        date: newMemory.date,
        event_name: newMemory.event_name,
        image_url: newMemory.image_url || null,
        description: newMemory.description || null,
      }

      await addMemory(memory)
      setNewMemory({
        title: "",
        date: new Date().toISOString().split("T")[0],
        event_name: "",
        image_url: "",
        description: "",
      })
      loadData()
    } catch (error) {
      console.error("Error adding memory:", error)
    }
  }

  const handleDeleteMemory = async (id: string) => {
    if (confirm("Yakin ingin menghapus kenang-kenangan ini?")) {
      try {
        await deleteMemory(id)
        loadData()
      } catch (error) {
        console.error("Error deleting memory:", error)
      }
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
      {/* Add Memory Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tambah Kenang-Kenangan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newMemory.title}
            onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
            placeholder="Judul"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newMemory.date}
            onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newMemory.event_name}
            onChange={(e) => setNewMemory({ ...newMemory, event_name: e.target.value })}
            placeholder="Nama acara"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newMemory.image_url}
            onChange={(e) => setNewMemory({ ...newMemory, image_url: e.target.value })}
            placeholder="URL gambar"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={newMemory.description}
            onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
            placeholder="Deskripsi"
            className="md:col-span-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddMemory}
          className="mt-4 w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Tambah Kenang-Kenangan
        </button>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {memories.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">Belum ada kenang-kenangan yang ditambahkan</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="relative overflow-hidden h-40 bg-slate-200 dark:bg-slate-700">
                <img
                  src={memory.image_url || "/placeholder.svg"}
                  alt={memory.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">{memory.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{memory.event_name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{memory.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(memory.date).toLocaleDateString("id-ID")}
                  </p>
                  <button
                    onClick={() => handleDeleteMemory(memory.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
