# Changelog

Semua perubahan penting pada project ini akan didokumentasikan di file ini.

## [1.0.0] - 2024-01-17

### Added
- ✨ Integrasi Supabase untuk cloud database
- ✨ Real-time updates menggunakan Supabase Realtime
- ✨ Public dashboard untuk melihat data kas kelas
- ✨ Admin panel untuk mengelola semua data
- ✨ Dark mode support
- ✨ Responsive design untuk mobile dan desktop
- ✨ Data migration tool dari local storage ke Supabase
- ✨ Row Level Security (RLS) untuk keamanan data
- ✨ Real-time subscriptions untuk semua tabel

### Features
- 📊 Dashboard dengan statistik pembayaran
- 💳 Riwayat pembayaran kas
- 🛒 Rencana pengeluaran dengan tracking
- 🎉 Jadwal acara kelas
- 📸 Galeri kenang-kenangan
- ⚙️ Admin panel dengan CRUD operations
- 🔐 Admin login dengan credentials
- 🌙 Dark/Light theme toggle
- 📱 Mobile responsive UI

### Database
- students table dengan status tracking
- payments table dengan date dan day tracking
- spendings table dengan estimated vs actual cost
- events table dengan budget tracking
- memories table untuk galeri foto

### Documentation
- README.md - Project overview
- SUPABASE_SETUP.md - Setup guide lengkap
- API_REFERENCE.md - API documentation
- CHANGELOG.md - This file
- QUICKSTART.md - Quick start guide

### Security
- Row Level Security (RLS) enabled
- Public read access untuk semua data
- Authenticated write access untuk admin
- Service role key untuk server-side operations

---

## Future Roadmap

### v1.1.0 (Planned)
- [ ] Export data ke Excel/PDF
- [ ] Email notifications untuk pembayaran
- [ ] SMS reminders
- [ ] Advanced analytics dan charts
- [ ] User authentication dengan Supabase Auth
- [ ] Multiple class support

### v1.2.0 (Planned)
- [ ] Mobile app (React Native)
- [ ] Offline support
- [ ] File upload untuk memories
- [ ] Comments dan discussions
- [ ] Audit log untuk semua changes

---

## Support

Untuk pertanyaan atau issues, buka issue di GitHub.
