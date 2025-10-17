"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import { getEvents, addEvent, updateEvent, deleteEvent } from "@/lib/supabase-utils"
import { getSupabaseClient } from "@/lib/supabase"

interface Event {
  id: string
  name: string
  date: string
  location: string
  description: string | null
  budget: number
  status: "planning" | "confirmed" | "completed"
}

export function EventManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    description: "",
    budget: 0,
    status: "planning" as const,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()

    // Setup real-time subscription
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("events-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
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
      const data = await getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async () => {
    if (!newEvent.name.trim()) return

    try {
      const event = {
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location,
        description: newEvent.description || null,
        budget: newEvent.budget,
        status: newEvent.status,
      }

      await addEvent(event)
      setNewEvent({
        name: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
        description: "",
        budget: 0,
        status: "planning",
      })
      loadData()
    } catch (error) {
      console.error("Error adding event:", error)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Yakin ingin menghapus acara ini?")) {
      try {
        await deleteEvent(id)
        loadData()
      } catch (error) {
        console.error("Error deleting event:", error)
      }
    }
  }

  const handleUpdateEvent = async (id: string, updates: Partial<Event>) => {
    try {
      await updateEvent(id, updates)
      loadData()
    } catch (error) {
      console.error("Error updating event:", error)
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
      {/* Add Event Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tambah Acara</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Nama acara"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            placeholder="Lokasi"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newEvent.budget}
            onChange={(e) => setNewEvent({ ...newEvent, budget: Number.parseInt(e.target.value) || 0 })}
            placeholder="Anggaran"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Deskripsi"
            className="md:col-span-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddEvent}
          className="mt-4 w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Tambah Acara
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">Belum ada acara yang ditambahkan</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{event.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{event.location}</p>
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{event.description}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Tanggal</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {new Date(event.date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Anggaran</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Rp {event.budget.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Status</p>
                  <select
                    value={event.status}
                    onChange={(e) =>
                      handleUpdateEvent(event.id, {
                        status: e.target.value as "planning" | "confirmed" | "completed",
                      })
                    }
                    className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-xs"
                  >
                    <option value="planning">Perencanaan</option>
                    <option value="confirmed">Terkonfirmasi</option>
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
