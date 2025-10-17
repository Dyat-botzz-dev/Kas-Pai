import { getSupabaseClient } from "@/lib/supabase"

export async function migrateDataToSupabase() {
  const supabase = getSupabaseClient()

  try {
    console.log("[v0] Starting data migration...")

    // Get data from localStorage
    const studentsData = localStorage.getItem("students")
    const paymentsData = localStorage.getItem("payments")
    const spendingsData = localStorage.getItem("spendings")
    const eventsData = localStorage.getItem("events")
    const memoriesData = localStorage.getItem("memories")

    // Migrate students
    if (studentsData) {
      const students = JSON.parse(studentsData)
      console.log("[v0] Migrating students:", students.length)

      for (const student of students) {
        const { error } = await supabase.from("students").insert([
          {
            name: student.name,
            status: student.status || "belum",
            total_paid: student.totalPaid || 0,
            last_payment_date: student.lastPaymentDate || null,
          },
        ])
        if (error && !error.message.includes("duplicate")) {
          console.error("[v0] Error migrating student:", error)
        }
      }
    }

    // Migrate payments
    if (paymentsData) {
      const payments = JSON.parse(paymentsData)
      console.log("[v0] Migrating payments:", payments.length)

      for (const payment of payments) {
        const { error } = await supabase.from("payments").insert([
          {
            student_name: payment.studentName,
            amount: payment.amount,
            date: payment.date,
            day: payment.day,
            notes: payment.notes || null,
          },
        ])
        if (error) {
          console.error("[v0] Error migrating payment:", error)
        }
      }
    }

    // Migrate spendings
    if (spendingsData) {
      const spendings = JSON.parse(spendingsData)
      console.log("[v0] Migrating spendings:", spendings.length)

      for (const spending of spendings) {
        const { error } = await supabase.from("spendings").insert([
          {
            item: spending.item,
            estimated_cost: spending.estimatedCost,
            actual_cost: spending.actualCost || 0,
            status: spending.status || "planned",
            date: spending.date,
            notes: spending.notes || null,
          },
        ])
        if (error) {
          console.error("[v0] Error migrating spending:", error)
        }
      }
    }

    // Migrate events
    if (eventsData) {
      const events = JSON.parse(eventsData)
      console.log("[v0] Migrating events:", events.length)

      for (const event of events) {
        const { error } = await supabase.from("events").insert([
          {
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description || null,
            budget: event.budget,
            status: event.status || "planning",
          },
        ])
        if (error) {
          console.error("[v0] Error migrating event:", error)
        }
      }
    }

    // Migrate memories
    if (memoriesData) {
      const memories = JSON.parse(memoriesData)
      console.log("[v0] Migrating memories:", memories.length)

      for (const memory of memories) {
        const { error } = await supabase.from("memories").insert([
          {
            title: memory.title,
            date: memory.date,
            event_name: memory.eventName,
            image_url: memory.imageUrl || null,
            description: memory.description || null,
          },
        ])
        if (error) {
          console.error("[v0] Error migrating memory:", error)
        }
      }
    }

    console.log("[v0] Data migration completed!")
  } catch (error) {
    console.error("[v0] Migration error:", error)
  }
}
