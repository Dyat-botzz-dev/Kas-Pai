# Class Fund Tracker - Kas Kelas Digital

Aplikasi web untuk mengelola kas kelas dengan fitur real-time updates menggunakan Supabase.

## Features

✨ **Dashboard Publik**
- Lihat daftar siswa dan status pembayaran
- Riwayat pembayaran kas
- Rencana pengeluaran
- Jadwal acara kelas
- Galeri kenang-kenangan

🔐 **Admin Panel**
- Kelola data siswa
- Catat pembayaran kas
- Kelola pengeluaran
- Atur jadwal acara
- Upload kenang-kenangan

🔄 **Real-time Updates**
- Perubahan data langsung terlihat di semua halaman
- Sinkronisasi otomatis antar tab/browser
- Notifikasi real-time

☁️ **Cloud Database**
- Data tersimpan di Supabase
- Akses dari mana saja
- Backup otomatis

🌙 **Dark Mode**
- Tema gelap untuk kenyamanan mata
- Toggle tema dengan mudah

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn
- Supabase account

### Installation

1. Clone repository
\`\`\`bash
git clone <repository-url>
cd class-fund-tracker
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Setup environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` dan tambahkan:
\`\`\`
SUPABASE_NEXT_PUBLIC_SUPABASE_URL=your_supaSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Setup database
Lihat `SUPABASE_SETUP.md` untuk instruksi lengkap

5. Run development server
\`\`\`bash
npm run dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000)

## Usage

### Public Dashboard
- Akses halaman utama untuk melihat data kas kelas
- Navigasi menggunakan menu di atas
- Lihat statistik pembayaran, pengeluaran, acara, dan kenang-kenangan

### Admin Panel
1. Klik "Admin" di menu navigasi
2. Login dengan credentials:
   - Username: `kaskelasA`
   - Password: `KAS-PAI A`
3. Kelola semua data dari sini

### Migrasi Data
Jika memiliki data lama di local storage:
1. Akses `/migrate`
2. Klik "Mulai Migrasi Data"
3. Tunggu hingga selesai

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Halaman utama
│   ├── migrate/
│   │   └── page.tsx          # Halaman migrasi data
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── dashboard.tsx         # Dashboard utama
│   ├── student-list.tsx      # Daftar siswa
│   ├── payment-history.tsx   # Riwayat pembayaran
│   ├── spending-plan.tsx     # Rencana pengeluaran
│   ├── event-plan.tsx        # Jadwal acara
│   ├── memories.tsx          # Galeri kenang-kenangan
│   ├── admin/
│   │   ├── student-management.tsx
│   │   ├── payment-management.tsx
│   │   ├── spending-management.tsx
│   │   ├── event-management.tsx
│   │   └── memory-management.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── supabase-utils.ts     # Database utilities
├── hooks/
│   └── use-realtime-data.ts  # Real-time data hook
└── scripts/
    ├── 01-create-tables.sql  # Database schema
    └── 02-migrate-data.ts    # Data migration script
\`\`\`

## Database Schema

Lihat `SUPABASE_SETUP.md` untuk detail lengkap schema database.

## Deployment

### Deploy ke Vercel

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Setup environment variables
5. Deploy

### Environment Variables di Vercel

Tambahkan di Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

Kontribusi sangat diterima! Silakan:
1. Fork repository
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

MIT License - lihat file LICENSE untuk detail

## Support

Untuk bantuan atau pertanyaan, silakan buka issue di repository.

## Changelog

Lihat `CHANGELOG.md` untuk history perubahan.
