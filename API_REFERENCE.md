# API Reference

Dokumentasi lengkap untuk semua fungsi dan API yang tersedia di aplikasi Class Fund Tracker.

## Supabase Client

### `getSupabaseClient()`

Mendapatkan singleton instance dari Supabase client.

\`\`\`typescript
import { getSupabaseClient } from "@/lib/supabase"

const supabase = getSupabaseClient()
\`\`\`

**Returns**: Supabase client instance

---

## Students API

### `getStudents()`

Mengambil semua data siswa.

\`\`\`typescript
import { getStudents } from "@/lib/supabase-utils"

const students = await getStudents()
\`\`\`

**Returns**: \`Promise<Student[]>\`

### `addStudent(name: string)`

Menambahkan siswa baru.

\`\`\`typescript
const student = await addStudent("Nama Siswa")
\`\`\`

**Parameters**:
- \`name\` (string): Nama siswa

**Returns**: \`Promise<Student | null>\`

### `updateStudent(id: string, updates: Partial<Student>)`

Mengupdate data siswa.

\`\`\`typescript
await updateStudent("uuid", { status: "lunas" })
\`\`\`

**Parameters**:
- \`id\` (string): ID siswa
- \`updates\` (Partial<Student>): Data yang ingin diupdate

**Returns**: \`Promise<Student | null>\`

### `deleteStudent(id: string)`

Menghapus siswa.

\`\`\`typescript
await deleteStudent("uuid")
\`\`\`

**Parameters**:
- \`id\` (string): ID siswa

**Returns**: \`Promise<boolean>\`

---

## Payments API

### `getPayments()`

Mengambil semua data pembayaran.

\`\`\`typescript
import { getPayments } from "@/lib/supabase-utils"

const payments = await getPayments()
\`\`\`

**Returns**: \`Promise<Payment[]>\`

### `addPayment(payment: Omit<Payment, "id" | "created_at" | "updated_at">)`

Menambahkan pembayaran baru.

\`\`\`typescript
await addPayment({
  student_name: "Ade Rahmawati",
  amount: 2000,
  date: "2024-01-15",
  day: "Senin",
  notes: "Pembayaran kas minggu pertama"
})
\`\`\`

**Parameters**:
- \`payment\` (object): Data pembayaran

**Returns**: \`Promise<Payment | null>\`

### `deletePayment(id: string)`

Menghapus pembayaran.

\`\`\`typescript
await deletePayment("uuid")
\`\`\`

**Parameters**:
- \`id\` (string): ID pembayaran

**Returns**: \`Promise<boolean>\`

---

## Spendings API

### `getSpendings()`

Mengambil semua data pengeluaran.

\`\`\`typescript
import { getSpendings } from "@/lib/supabase-utils"

const spendings = await getSpendings()
\`\`\`

**Returns**: \`Promise<Spending[]>\`

### `addSpending(spending: Omit<Spending, "id" | "created_at" | "updated_at">)`

Menambahkan pengeluaran baru.

\`\`\`typescript
await addSpending({
  item: "Snack untuk acara",
  estimated_cost: 50000,
  actual_cost: 45000,
  status: "completed",
  date: "2024-01-15",
  notes: "Beli di toko A"
})
\`\`\`

**Returns**: \`Promise<Spending | null>\`

### `updateSpending(id: string, updates: Partial<Spending>)`

Mengupdate pengeluaran.

\`\`\`typescript
await updateSpending("uuid", { actual_cost: 45000, status: "completed" })
\`\`\`

**Returns**: \`Promise<Spending | null>\`

### `deleteSpending(id: string)`

Menghapus pengeluaran.

\`\`\`typescript
await deleteSpending("uuid")
\`\`\`

**Returns**: \`Promise<boolean>\`

---

## Events API

### `getEvents()`

Mengambil semua data acara.

\`\`\`typescript
import { getEvents } from "@/lib/supabase-utils"

const events = await getEvents()
\`\`\`

**Returns**: \`Promise<Event[]>\`

### `addEvent(event: Omit<Event, "id" | "created_at" | "updated_at">)`

Menambahkan acara baru.

\`\`\`typescript
await addEvent({
  name: "Gathering Kelas",
  date: "2024-02-15",
  location: "Taman Kota",
  description: "Gathering akhir tahun",
  budget: 500000,
  status: "planning"
})
\`\`\`

**Returns**: \`Promise<Event | null>\`

### `updateEvent(id: string, updates: Partial<Event>)`

Mengupdate acara.

\`\`\`typescript
await updateEvent("uuid", { status: "confirmed" })
\`\`\`

**Returns**: \`Promise<Event | null>\`

### `deleteEvent(id: string)`

Menghapus acara.

\`\`\`typescript
await deleteEvent("uuid")
\`\`\`

**Returns**: \`Promise<boolean>\`

---

## Memories API

### `getMemories()`

Mengambil semua data kenang-kenangan.

\`\`\`typescript
import { getMemories } from "@/lib/supabase-utils"

const memories = await getMemories()
\`\`\`

**Returns**: \`Promise<Memory[]>\`

### `addMemory(memory: Omit<Memory, "id" | "created_at" | "updated_at">)`

Menambahkan kenang-kenangan baru.

\`\`\`typescript
await addMemory({
  title: "Foto Gathering",
  date: "2024-02-15",
  event_name: "Gathering Kelas",
  image_url: "https://example.com/photo.jpg",
  description: "Foto bersama di taman"
})
\`\`\`

**Returns**: \`Promise<Memory | null>\`

### `deleteMemory(id: string)`

Menghapus kenang-kenangan.

\`\`\`typescript
await deleteMemory("uuid")
\`\`\`

**Returns**: \`Promise<boolean>\`

---

## Hooks

### \`useRealtimeData()\`

Hook untuk mengambil data dengan real-time updates.

\`\`\`typescript
import { useRealtimeData } from "@/hooks/use-realtime-data"

export function MyComponent() {
  const { students, payments, loading } = useRealtimeData()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {students.map(student => (
        <div key={student.id}>{student.name}</div>
      ))}
    </div>
  )
}
\`\`\`

**Returns**:
\`\`\`typescript
{
  students: Student[]
  payments: Payment[]
  loading: boolean
}
\`\`\`

---

## Type Definitions

\`\`\`typescript
type Student = {
  id: string
  name: string
  status: "lunas" | "belum"
  last_payment_date: string | null
  total_paid: number
  created_at: string
  updated_at: string
}

type Payment = {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
  created_at: string
  updated_at: string
}

type Spending = {
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

type Event = {
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

type Memory = {
  id: string
  title: string
  date: string
  event_name: string
  image_url: string | null
  description: string | null
  created_at: string
  updated_at: string
}
\`\`\`

---

## Best Practices

1. **Always handle errors**: Cek return value untuk null
2. **Use hooks**: Gunakan \`useRealtimeData()\` untuk real-time updates
3. **Batch operations**: Gunakan Promise.all() untuk multiple operations
4. **Validate input**: Validasi data sebelum mengirim ke database

---

## Support

Untuk bantuan lebih lanjut, lihat [Supabase Documentation](https://supabase.com/docs)
