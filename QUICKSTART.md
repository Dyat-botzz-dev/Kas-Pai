# Quick Start Guide

Panduan cepat untuk memulai menggunakan Class Fund Tracker.

## 5 Menit Setup

### 1. Clone & Install (1 menit)
\`\`\`bash
git clone <repository-url>
cd class-fund-tracker
npm install
\`\`\`

### 2. Setup Supabase (2 menit)
1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Copy credentials ke `.env.local`:
\`\`\`env
SUPABASE_NEXT_PUBLIC_SUPABASE_URL=SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=your_key
\`\`\`

### 3. Create Database (1 menit)
1. Buka Supabase Dashboard → SQL Editor
2. Copy isi `scripts/01-create-tables.sql`
3. Paste dan Run

### 4. Run App (1 menit)
\`\`\`bash
npm run dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000) ✨

---

## First Steps

### 1. Lihat Dashboard
- Halaman utama menampilkan statistik kas kelas
- Lihat daftar siswa dan status pembayaran

### 2. Login Admin
- Klik "Admin" di menu
- Username: `kaskelasA`
- Password: `KAS-PAI A`

### 3. Tambah Data
- Tambah siswa baru
- Catat pembayaran
- Buat rencana pengeluaran
- Jadwalkan acara

### 4. Lihat Real-time Updates
- Buka 2 tab browser
- Ubah data di satu tab
- Lihat update otomatis di tab lain

---

## Common Tasks

### Menambah Siswa
1. Login ke Admin Panel
2. Tab "Siswa"
3. Isi nama siswa
4. Klik "Tambah"

### Catat Pembayaran
1. Admin Panel → Tab "Pembayaran"
2. Pilih nama siswa
3. Isi jumlah dan tanggal
4. Klik "Catat Pembayaran"

### Lihat Riwayat Pembayaran
1. Dashboard → "Riwayat Bayar"
2. Lihat semua pembayaran yang tercatat
3. Lihat total pembayaran

---

## Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Buat file `.env.local`
- Tambahkan credentials
- Restart `npm run dev`

### Data tidak muncul
- Cek Supabase Dashboard → Table Editor
- Verifikasi tabel sudah dibuat
- Cek browser console untuk errors

### Real-time tidak bekerja
- Buka 2 tab browser
- Ubah data di satu tab
- Refresh tab lain jika perlu

---

## Resources

- 📖 [Full Documentation](./README.md)
- 🔧 [Setup Guide](./SUPABASE_SETUP.md)
- 📚 [API Reference](./API_REFERENCE.md)

Happy coding! 🚀
