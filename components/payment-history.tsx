"use client"

import { useState, useEffect } from "react"
import { getPayments } from "@/lib/supabase-utils"

interface Payment {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
}

export function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true)
        const data = await getPayments()
        setPayments(data)
      } catch (error) {
        console.error("Error loading payments:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPayments()

    // Setup real-time subscription
    const { getSupabaseClient } = require("@/lib/supabase")
    const supabase = getSupabaseClient()

    const subscription = supabase
      .channel("payments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => {
        loadPayments()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const getDayColor = (day: string) => {
    const colors: Record<string, string> = {
      Senin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Selasa: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Rabu: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Kamis: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[day] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-primary">⏳</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Pembayaran</p>
            <p className="text-4xl font-bold mt-2">Rp {totalPayments.toLocaleString("id-ID")}</p>
            <p className="text-blue-100 text-sm mt-2">{payments.length} transaksi</p>
          </div>
          <div className="text-6xl opacity-20">💳</div>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-lg">💵</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{payment.student_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{payment.notes || "Tanpa catatan"}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600 dark:text-green-400">
                  +Rp {payment.amount.toLocaleString("id-ID")}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-end">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDayColor(payment.day)}`}>
                    {payment.day}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(payment.date)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
