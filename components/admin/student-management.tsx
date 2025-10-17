"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit2, Check, X } from "lucide-react"
import { getStudents, addStudent, updateStudent, deleteStudent } from "@/lib/supabase-utils"
import { getSupabaseClient } from "@/lib/supabase"

interface Student {
  id: string
  name: string
  status: "lunas" | "belum"
  last_payment_date: string | null
  total_paid: number
}

interface Payment {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
}

const DEFAULT_STUDENTS = [
  "Ade Rahmawati",
  "Adril Fadilan",
  "Afifah",
  "Amanda",
  "Asriyanti",
  "Asifa",
  "Bintang Shilky T.",
  "Bulan",
  "Eka Bunga Pratiwi",
  "Febriyanti",
  "Fika",
  "Hafizah Kael",
  "Ica Arianti",
  "Ines Pratiwi",
  "Marisda",
  "Hidayatullah",
  "Muh. Daud Rasyid",
  "Muh. Faruq Dzammar",
  "Muh. Zulkfly",
  "Multi",
  "Nabila Aminuddin",
  "Nanda Fritma A.",
  "Nur Azizanti",
  "Nur Yasmin",
  "Putri Adila",
  "Putri Nur Afifah",
  "Rahmawati",
  "Restu Nur Hasanah",
  "Salsabila",
  "Siti Rahmatia D.",
  "Siti Nurhaseni",
  "Wa Ode Mayanti",
  "Wd. Melani Pratama P.",
  "Wd. Nuzul Rahmadani",
  "Wd. Siti Nurdelia",
]

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [newStudent, setNewStudent] = useState({ name: "" })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()

    // Setup real-time subscription
    const supabase = getSupabaseClient()

    const studentsSubscription = supabase
      .channel("students-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "students" }, () => {
        loadData()
      })
      .subscribe()

    const paymentsSubscription = supabase
      .channel("payments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, () => {
        loadData()
      })
      .subscribe()

    return () => {
      studentsSubscription.unsubscribe()
      paymentsSubscription.unsubscribe()
    }
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [studentsData, paymentsData] = await Promise.all([
        getStudents(),
        (async () => {
          const supabase = getSupabaseClient()
          const { data } = await supabase.from("payments").select("*")
          return data || []
        })(),
      ])

      setStudents(studentsData)
      setPayments(paymentsData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStudentTotalPaid = (studentName: string): number => {
    return payments.filter((p) => p.student_name === studentName).reduce((sum, p) => sum + p.amount, 0)
  }

  const getLastPaymentDate = (studentName: string): string => {
    const studentPayments = payments.filter((p) => p.student_name === studentName)
    if (studentPayments.length === 0) return ""
    return studentPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
  }

  const handleAddStudent = async () => {
    if (!newStudent.name.trim()) return

    try {
      await addStudent(newStudent.name)
      setNewStudent({ name: "" })
      loadData()
    } catch (error) {
      console.error("Error adding student:", error)
    }
  }

  const handleDeleteStudent = async (id: string) => {
    if (confirm("Yakin ingin menghapus siswa ini?")) {
      try {
        await deleteStudent(id)
        loadData()
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  const handleUpdateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      await updateStudent(id, updates)
      loadData()
    } catch (error) {
      console.error("Error updating student:", error)
    }
  }

  const handleSaveEdit = async () => {
    if (editingId && editName.trim()) {
      await handleUpdateStudent(editingId, { name: editName })
      setEditingId(null)
      setEditName("")
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
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

  return (
    <div className="space-y-6">
      {/* Add Student Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tambah Siswa Baru</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ name: e.target.value })}
            placeholder="Nama siswa"
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleAddStudent}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
          >
            Tambah
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border-b border-slate-200 dark:border-slate-600">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Nama</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Total Bayar
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                  Pembayaran Terakhir
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const totalPaid = getStudentTotalPaid(student.name)
                const lastPaymentDate = getLastPaymentDate(student.name)
                const statusColor =
                  totalPaid > 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"

                return (
                  <tr
                    key={student.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {editingId === student.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="font-medium text-slate-900 dark:text-white">{student.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                        {totalPaid > 0 ? "Sudah Bayar" : "Belum Bayar"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        Rp {totalPaid.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(lastPaymentDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {editingId === student.id ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                              title="Simpan"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                              title="Batal"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(student.id)
                                setEditName(student.name)
                              }}
                              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow">
          <p className="text-blue-100 text-sm">Total Siswa</p>
          <p className="text-3xl font-bold mt-2">{students.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow">
          <p className="text-green-100 text-sm">Sudah Bayar</p>
          <p className="text-3xl font-bold mt-2">{students.filter((s) => getStudentTotalPaid(s.name) > 0).length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow">
          <p className="text-orange-100 text-sm">Belum Bayar</p>
          <p className="text-3xl font-bold mt-2">{students.filter((s) => getStudentTotalPaid(s.name) === 0).length}</p>
        </div>
      </div>
    </div>
  )
}
