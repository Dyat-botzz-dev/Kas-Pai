# Supabase Integration Setup Guide

Panduan lengkap untuk mengintegrasikan Supabase ke aplikasi Class Fund Tracker.

## Langkah 1: Setup Database Tables

1. Buka Supabase Dashboard
2. Pergi ke SQL Editor
3. Jalankan script dari file `scripts/01-create-tables.sql`
4. Tunggu hingga semua tabel berhasil dibuat

## Langkah 2: Konfigurasi Environment Variables

Pastikan environment variables berikut sudah dikonfigurasi di Vercel:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

Anda dapat menemukan nilai-nilai ini di Supabase Dashboard:
- Settings → API → Project URL
- Settings → API → anon public key

## Langkah 3: Migrasi Data dari Local Storage

Aplikasi sudah dilengkapi dengan script migrasi otomatis. Untuk menjalankan migrasi:

1. Buka browser console (F12)
2. Jalankan perintah berikut:

\`\`\`javascript
import { migrateDataToSupabase } from '@/scripts/02-migrate-data'
await migrateDataToSupabase()
\`\`\`

Atau, Anda dapat membuat halaman migrasi khusus dan mengaksesnya sekali.

## Langkah 4: Verifikasi Data

Setelah migrasi selesai:

1. Buka Supabase Dashboard
2. Pergi ke Table Editor
3. Verifikasi bahwa semua data sudah tersimpan di tabel-tabel berikut:
   - `students`
   - `payments`
   - `spendings`
   - `events`
   - `memories`

## Fitur Real-time

Aplikasi sekarang mendukung real-time updates:

- **Public Read Access**: Semua data dapat diakses secara publik (read-only)
- **Real-time Subscriptions**: Perubahan data di admin panel akan langsung terlihat di halaman publik
- **Automatic Sync**: Tidak perlu refresh halaman, data akan update secara otomatis

## Row Level Security (RLS)

Semua tabel sudah dikonfigurasi dengan RLS:

- **Public Read**: Siapa saja dapat membaca data
- **Authenticated Write**: Hanya pengguna yang terautentikasi yang dapat menambah/mengubah/menghapus data

Untuk production, Anda dapat menambahkan autentikasi Supabase untuk membatasi akses write.

## Troubleshooting

### Data tidak muncul setelah migrasi

1. Verifikasi bahwa environment variables sudah benar
2. Cek Supabase Dashboard untuk memastikan data sudah tersimpan
3. Buka browser console dan cek apakah ada error

### Real-time updates tidak bekerja

1. Pastikan Realtime sudah diaktifkan di Supabase Dashboard
2. Cek koneksi internet
3. Buka browser console dan cek apakah ada error

### Error "Relation does not exist"

1. Pastikan semua tabel sudah dibuat dengan menjalankan SQL script
2. Verifikasi nama tabel di Supabase Dashboard

## Struktur Database

### Students Table
\`\`\`sql
- id (UUID, Primary Key)
- name (TEXT, Unique)
- status (TEXT: 'lunas' | 'belum')
- last_payment_date (TIMESTAMP)
- total_paid (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Payments Table
\`\`\`sql
- id (UUID, Primary Key)
- student_name (TEXT, Foreign Key → students.name)
- amount (INTEGER)
- date (DATE)
- day (TEXT)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Spendings Table
\`\`\`sql
- id (UUID, Primary Key)
- item (TEXT)
- estimated_cost (INTEGER)
- actual_cost (INTEGER)
- status (TEXT: 'planned' | 'purchased' | 'completed')
- date (DATE)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Events Table
\`\`\`sql
- id (UUID, Primary Key)
- name (TEXT)
- date (DATE)
- location (TEXT)
- description (TEXT)
- budget (INTEGER)
- status (TEXT: 'planning' | 'confirmed' | 'completed')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
\`\`\`

### Memories Table
\`\`\`sql
- id (UUID, Primary Key)
- title (TEXT)
- date (DATE)
- event_name (TEXT)
- image_url (TEXT)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
