import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return supabaseClient
}

export type Student = {
  id: string
  name: string
  status: "lunas" | "belum"
  last_payment_date: string | null
  total_paid: number
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type Spending = {
  id: string
  item: string
  estimated_cost: number
  actual_cost: number
  status: "planned" | "purchased" | "completed"
  date: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type Event = {
  id: string
  name: string
  date: string
  location: string
  description: string | null
  budget: number
  status: "planning" | "confirmed" | "completed"
  created_at: string
  updated_at: string
}

export type Memory = {
  id: string
  title: string
  date: string
  event_name: string
  image_url: string | null
  description: string | null
  created_at: string
  updated_at: string
}
