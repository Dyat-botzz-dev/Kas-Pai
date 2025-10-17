"use client"

import { useState } from "react"
import { migrateDataToSupabase } from "@/scripts/02-migrate-data"

export default function MigrationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleMigrate = async () => {
    try {
      setIsLoading(true)
      setStatus("loading")
      setMessage("Memulai migrasi data...")

      await migrateDataToSupabase()

      setStatus("success")
      setMessage("Migrasi data berhasil! Semua data telah dipindahkan ke Supabase.")
    } catch (error) {
      setStatus("error")
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`)
      console.error("Migration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 max-w-md w-full border border-slate-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Data Migration</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Pindahkan semua data dari local storage ke Supabase</p>

        <div className="space-y-4">
          {status === "idle" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Klik tombol di bawah untuk memulai migrasi data. Proses ini akan memindahkan semua data dari local
                storage ke Supabase database.
              </p>
            </div>
          )}

          {status === "loading" && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin">⏳</div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{message}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200 font-semibold">✓ {message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200">{message}</p>
            </div>
          )}

          <button
            onClick={handleMigrate}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            {isLoading ? "Sedang Migrasi..." : "Mulai Migrasi Data"}
          </button>

          <a
            href="/"
            className="w-full px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold transition-all text-center"
          >
            Kembali ke Dashboard
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Data yang akan dimigrasikan:</h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <li>✓ Data Siswa</li>
            <li>✓ Data Pembayaran</li>
            <li>✓ Data Pengeluaran</li>
            <li>✓ Data Acara</li>
            <li>✓ Data Kenang-Kenangan</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
