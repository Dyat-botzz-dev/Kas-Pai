"use client"

import { useRealtimeData } from "@/hooks/use-realtime-data"
import { Users, CheckCircle, XCircle, TrendingUp } from "lucide-react"

interface Student {
  id: string
  name: string
  status: "lunas" | "belum"
  totalPaid: number
  lastPaymentDate: string | null
}

interface Payment {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string
}

export function StudentList() {
  const { students, payments, loading } = useRealtimeData()

  const getStatusColor = (status: string) => {
    return status === "lunas"
      ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
      : "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      year: "numeric",
      month: "short",
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

  const totalStudents = students.length
  const lunasCount = students.filter((s) => s.status === "lunas").length
  const belumCount = totalStudents - lunasCount
  const totalCollected = students.reduce((sum, s) => sum + s.totalPaid, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-6 shadow-md-light hover-lift border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Siswa</p>
              <p className="text-3xl font-bold text-foreground mt-2">{totalStudents}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md-light hover-lift border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Sudah Lunas</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{lunasCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md-light hover-lift border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Belum Lunas</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{belumCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-950 rounded-lg">
              <XCircle className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-md-light hover-lift border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Total Terkumpul</p>
              <p className="text-3xl font-bold text-primary mt-2">Rp {(totalCollected / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="text-primary" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-card rounded-xl shadow-md-light border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nama Siswa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tanggal Bayar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Bayar</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="border-b border-border hover:bg-secondary transition-smooth">
                  <td className="px-6 py-4 text-sm text-muted-foreground">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{student.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}
                    >
                      {student.status === "lunas" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {student.status === "lunas" ? "Lunas" : "Belum Lunas"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(student.lastPaymentDate)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">
                    Rp {student.totalPaid.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
<div className="bg-primary/5 border border-primary/20 rounded-xl p-4 shadow-sm-light text-sm text-foreground space-y-2">
  <p>
    <span className="font-semibold">ℹ️ Info:</span> Pembayaran kas dilakukan setiap Senin–Kamis dengan nominal Rp 2.000 per minggu.
  </p>
  <p>
    <span className="font-semibold">⚠️ Warning:</span> Web ini masih dalam pengembangan (beta). Jika ada bug atau masalah, harap lapor ke dev di +62 877-1820-3240.
  </p>
</div>
    </div>
  )
}
