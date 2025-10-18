"use client"

import { useState, useEffect } from "react"

interface HelpItem {
  id: string
  title: string
  content: string
  category: string
  date: string
}

export default function Bantuan() {
  const [helpItems, setHelpItems] = useState<HelpItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulasi fetch data bantuan dari server (bisa diganti Supabase kalau mau)
    const fetchHelpData = async () => {
      try {
        setLoading(true)
        const data: HelpItem[] = [
          {
            id: "1",
            title: "Bagaimana cara membayar kas?",
            content:
              "Pembayaran kas dilakukan setiap Senin–Kamis sebesar Rp2.000 melalui bendahara kelas atau lewat sistem online di menu 'Pembayaran'.",
            category: "Pembayaran",
            date: "2025-10-01",
          },
          {
            id: "2",
            title: "Apa yang terjadi jika saya lupa membayar?",
            content:
              "Sistem akan mencatat keterlambatan secara otomatis. Kamu bisa melunasi minggu berikutnya tanpa kehilangan data pembayaran.",
            category: "Keterlambatan",
            date: "2025-10-05",
          },
          {
            id: "3",
            title: "Siapa yang bisa mengakses panel admin?",
            content:
              "Hanya ketua kelas dan bendahara yang memiliki hak akses admin untuk melihat seluruh data pembayaran dan laporan.",
            category: "Akses Admin",
            date: "2025-10-10",
          },
          {
            id: "4",
            title: "Bagaimana melaporkan bug?",
            content:
              "Jika menemukan masalah atau bug, laporkan melalui menu 'Lapor Bug' atau langsung hubungi developer via WhatsApp: +62 877-1820-3240.",
            category: "Teknis",
            date: "2025-10-15",
          },
        ]
        setHelpItems(data)
      } finally {
        setLoading(false)
      }
    }

    fetchHelpData()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Pembayaran: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Keterlambatan: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Akses Admin": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Teknis: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

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
      {/* Header / Summary */}
      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Panduan Sistem Kas Kelas</p>
            <p className="text-4xl font-bold mt-2">🧭 Bantuan & Panduan</p>
            <p className="text-blue-100 text-sm mt-2">{helpItems.length} topik tersedia</p>
          </div>
          <div className="text-6xl opacity-20">📘</div>
        </div>
      </div>

      {/* Help List */}
      <div className="space-y-3">
        {helpItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.content}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(item.date)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Masih Butuh Bantuan?</h2>
        <p className="text-muted-foreground mb-6">
          Hubungi developer untuk pertanyaan lanjutan atau laporan bug.
        </p>
        <a
          href="https://wa.me/6287718203240"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300"
        >
          💬 Hubungi Developer
        </a>
      </div>
    </div>
  )
}