"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import { getPayments, addPayment, deletePayment, getStudents } from "@/lib/supabase-utils"
import { getSupabaseClient } from "@/lib/supabase"

interface Payment {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
}

interface Student {
  id: string
  name: string
  status: "lunas" | "belum"
  last_payment_date: string | null
  total_paid: number
}

export function PaymentManagement() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    amount: 2000,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [filteredStudents, setFilteredStudents] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()

    // Setup real-time subscription
    const supabase = getSupabaseClient()

    const paymentsSubscription = supabase
      .channel("payments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => {
        loadData()
      })
      .subscribe()

    return () => {
      paymentsSubscription.unsubscribe()
    }
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [paymentsData, studentsData] = await Promise.all([getPayments(), getStudents()])
      setPayments(paymentsData)
      setStudents(studentsData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStudentNameChange = (value: string) => {
    setNewPayment({ ...newPayment, studentName: value })
    if (value.trim()) {
      const filtered = students.map((s) => s.name).filter((name) => name.toLowerCase().includes(value.toLowerCase()))
      setFilteredStudents(filtered)
      setShowDropdown(true)
    } else {
      setFilteredStudents([])
      setShowDropdown(false)
    }
  }

  const selectStudent = (name: string) => {
    setNewPayment({ ...newPayment, studentName: name })
    setShowDropdown(false)
    setFilteredStudents([])
  }

  const getDayName = (dateString: string) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const date = new Date(dateString)
    return days[date.getDay()]
  }

  const handleAddPayment = async () => {
    if (!newPayment.studentName.trim()) {
      alert("Pilih nama siswa terlebih dahulu")
      return
    }

    try {
      const payment = {
        student_name: newPayment.studentName,
        amount: newPayment.amount,
        date: newPayment.date,
        day: getDayName(newPayment.date),
        notes: newPayment.notes || null,
      }

      await addPayment(payment)
      setNewPayment({
        studentName: "",
        amount: 2000,
        date: new Date().toISOString().split("T")[0],
        notes: "",
      })
      setShowDropdown(false)
      loadData()
    } catch (error) {
      console.error("Error adding payment:", error)
    }
  }

  const handleDeletePayment = async (id: string) => {
    if (confirm("Yakin ingin menghapus pembayaran ini?")) {
      try {
        await deletePayment(id)
        loadData()
      } catch (error) {
        console.error("Error deleting payment:", error)
      }
    }
  }

  const getDayColor = (day: string) => {
    const colors: Record<string, string> = {
      Senin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Selasa: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Rabu: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Kamis: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[day] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
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
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Pembayaran</p>
            <p className="text-4xl font-bold mt-2">Rp {totalPayments.toLocaleString("id-ID")}</p>
            <p className="text-blue-100 text-sm mt-2">{payments.length} transaksi</p>
          </div>
          <div className="text-6xl opacity-20">💳</div>
        </div>
      </div>

      {/* Add Payment Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Catat Pembayaran Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={newPayment.studentName}
              onChange={(e) => handleStudentNameChange(e.target.value)}
              onFocus={() => newPayment.studentName && setShowDropdown(true)}
              placeholder="Cari nama siswa..."
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {showDropdown && filteredStudents.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredStudents.map((name) => (
                  <button
                    key={name}
                    onClick={() => selectStudent(name)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 text-slate-900 dark:text-white transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="number"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: Number.parseInt(e.target.value) })}
            placeholder="Jumlah"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="date"
            value={newPayment.date}
            onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="text"
            value={newPayment.notes}
            onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
            placeholder="Catatan (opsional)"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <button
          onClick={handleAddPayment}
          className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Catat Pembayaran
        </button>
      </div>

      {/* Payments List */}
      <div className="space-y-3">
        {payments.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">Belum ada pembayaran yang dicatat</p>
          </div>
        ) : (
          payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💵</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{payment.student_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{payment.notes || "Tanpa catatan"}</p>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="font-bold text-lg text-green-600 dark:text-green-400">
                    Rp {payment.amount.toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-2 mt-1 justify-end">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDayColor(payment.day)}`}>
                      {payment.day}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatDate(payment.date)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePayment(payment.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex-shrink-0"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
