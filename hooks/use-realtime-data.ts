"use client"

import { useState, useEffect, useCallback } from "react"
import { getSupabaseClient, type Student, type Payment } from "@/lib/supabase"
import { getStudents, getPayments } from "@/lib/supabase-utils"

export function useRealtimeData() {
  const [students, setStudents] = useState<Student[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [studentsData, paymentsData] = await Promise.all([getStudents(), getPayments()])

      // Calculate totals from payments
      const updatedStudents = studentsData.map((student) => {
        const studentPayments = paymentsData.filter((p) => p.student_name === student.name)
        const totalPaid = studentPayments.reduce((sum, p) => sum + p.amount, 0)
        const lastPaymentDate =
          studentPayments.length > 0
            ? studentPayments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
            : null

        return {
          ...student,
          total_paid: totalPaid,
          last_payment_date: lastPaymentDate,
          status: totalPaid > 0 ? ("lunas" as const) : ("belum" as const),
        }
      })

      setStudents(updatedStudents)
      setPayments(paymentsData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()

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
  }, [loadData])

  return { students, payments, loading }
}
