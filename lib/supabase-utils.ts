import { getSupabaseClient, type Student, type Payment, type Spending, type Event, type Memory } from "./supabase"

const supabase = getSupabaseClient()

// Students
export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase.from("students").select("*").order("name")
  if (error) {
    console.error("Error fetching students:", error)
    return []
  }
  return data || []
}

export async function addStudent(name: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from("students")
    .insert([{ name, status: "belum", total_paid: 0 }])
    .select()
    .single()
  if (error) {
    console.error("Error adding student:", error)
    return null
  }
  return data
}

export async function updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
  const { data, error } = await supabase
    .from("students")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) {
    console.error("Error updating student:", error)
    return null
  }
  return data
}

export async function deleteStudent(id: string): Promise<boolean> {
  const { error } = await supabase.from("students").delete().eq("id", id)
  if (error) {
    console.error("Error deleting student:", error)
    return false
  }
  return true
}

// Payments
export async function getPayments(): Promise<Payment[]> {
  const { data, error } = await supabase.from("payments").select("*").order("date", { ascending: false })
  if (error) {
    console.error("Error fetching payments:", error)
    return []
  }
  return data || []
}

export async function addPayment(payment: Omit<Payment, "id" | "created_at" | "updated_at">): Promise<Payment | null> {
  const { data, error } = await supabase.from("payments").insert([payment]).select().single()
  if (error) {
    console.error("Error adding payment:", error)
    return null
  }
  return data
}

export async function deletePayment(id: string): Promise<boolean> {
  const { error } = await supabase.from("payments").delete().eq("id", id)
  if (error) {
    console.error("Error deleting payment:", error)
    return false
  }
  return true
}

// Spendings
export async function getSpendings(): Promise<Spending[]> {
  const { data, error } = await supabase.from("spendings").select("*").order("date", { ascending: false })
  if (error) {
    console.error("Error fetching spendings:", error)
    return []
  }
  return data || []
}

export async function addSpending(
  spending: Omit<Spending, "id" | "created_at" | "updated_at">,
): Promise<Spending | null> {
  const { data, error } = await supabase.from("spendings").insert([spending]).select().single()
  if (error) {
    console.error("Error adding spending:", error)
    return null
  }
  return data
}

export async function updateSpending(id: string, updates: Partial<Spending>): Promise<Spending | null> {
  const { data, error } = await supabase
    .from("spendings")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) {
    console.error("Error updating spending:", error)
    return null
  }
  return data
}

export async function deleteSpending(id: string): Promise<boolean> {
  const { error } = await supabase.from("spendings").delete().eq("id", id)
  if (error) {
    console.error("Error deleting spending:", error)
    return false
  }
  return true
}

// Events
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false })
  if (error) {
    console.error("Error fetching events:", error)
    return []
  }
  return data || []
}

export async function addEvent(event: Omit<Event, "id" | "created_at" | "updated_at">): Promise<Event | null> {
  const { data, error } = await supabase.from("events").insert([event]).select().single()
  if (error) {
    console.error("Error adding event:", error)
    return null
  }
  return data
}

export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) {
    console.error("Error updating event:", error)
    return null
  }
  return data
}

export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase.from("events").delete().eq("id", id)
  if (error) {
    console.error("Error deleting event:", error)
    return false
  }
  return true
}

// Memories
export async function getMemories(): Promise<Memory[]> {
  const { data, error } = await supabase.from("memories").select("*").order("date", { ascending: false })
  if (error) {
    console.error("Error fetching memories:", error)
    return []
  }
  return data || []
}

export async function addMemory(memory: Omit<Memory, "id" | "created_at" | "updated_at">): Promise<Memory | null> {
  const { data, error } = await supabase.from("memories").insert([memory]).select().single()
  if (error) {
    console.error("Error adding memory:", error)
    return null
  }
  return data
}

export async function deleteMemory(id: string): Promise<boolean> {
  const { error } = await supabase.from("memories").delete().eq("id", id)
  if (error) {
    console.error("Error deleting memory:", error)
    return false
  }
  return true
}
