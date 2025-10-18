"use client"

export default function PanduanPaymentDev() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">🧭 Panduan Developer: PaymentHistory</h1>

      <section className="space-y-3">
        <p className="text-slate-700 dark:text-slate-300">
          Komponen <code>PaymentHistory</code> digunakan untuk menampilkan daftar pembayaran dari tabel <code>payments</code> di Supabase.
          Data diambil dengan fungsi <code>getPayments()</code> dari <code>lib/supabase-utils.ts</code>.
        </p>

        <h2 className="text-xl font-semibold mt-4">Struktur Data</h2>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-auto">
{`interface Payment {
  id: string
  student_name: string
  amount: number
  date: string
  day: string
  notes: string | null
}`}
        </pre>

        <h2 className="text-xl font-semibold mt-4">Lifecycle dan Realtime</h2>
        <ul className="list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>Saat komponen dimount, <code>loadPayments()</code> dijalankan untuk memuat data awal.</li>
          <li>Realtime subscription dibuat menggunakan Supabase channel <code>payments-changes</code>.</li>
          <li>Event apapun (INSERT, UPDATE, DELETE) di tabel <code>payments</code> akan memicu reload data otomatis.</li>
          <li>Pada unmount, subscription dibersihkan dengan <code>unsubscribe()</code>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">UI dan Warna Hari</h2>
        <p className="text-slate-700 dark:text-slate-300">
          Fungsi <code>getDayColor()</code> memberi warna berbeda per hari agar daftar transaksi mudah dibaca.
        </p>

        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-auto">
{`Senin → Biru
Selasa → Ungu
Rabu → Pink
Kamis → Oranye`}
        </pre>

        <h2 className="text-xl font-semibold mt-4">Tips Debugging</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>Pastikan file <code>@/lib/supabase</code> mengekspor fungsi <code>getSupabaseClient()</code> dengan benar.</li>
          <li>Gunakan <code>console.error</code> untuk melacak error loading data.</li>
          <li>Jika data tidak muncul, cek izin tabel di Supabase (Row Level Security dan Policies).</li>
        </ul>
      </section>
    </div>
  )
}