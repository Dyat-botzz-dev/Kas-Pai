"use client"

import { HelpCircle, Mail, MessageSquare } from "lucide-react"

export function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pusat Bantuan</h1>
          <p className="text-muted-foreground text-lg">
            Temukan jawaban atas pertanyaan umum atau hubungi kami untuk bantuan lebih lanjut.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Pertanyaan Umum</h2>
          <div className="space-y-4">
            <div className="bg-secondary/50 p-6 rounded-lg shadow-md-light">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Bagaimana cara menambah transaksi baru?</h3>
                  <p className="text-muted-foreground mt-2">
                    Untuk menambah transaksi, buka halaman "Riwayat Bayar", klik tombol "Tambah Transaksi", lalu isi detail seperti jumlah dan deskripsi.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/50 p-6 rounded-lg shadow-md-light">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Bagaimana cara mengedit rencana belanja?</h3>
                  <p className="text-muted-foreground mt-2">
                    Navigasi ke "Rencana Belanja", pilih item yang ingin diedit, lalu klik ikon pensil untuk memperbarui detailnya.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/50 p-6 rounded-lg shadow-md-light">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Apa yang harus dilakukan jika lupa kata sandi?</h3>
                  <p className="text-muted-foreground mt-2">
                    Klik "Lupa Kata Sandi" di halaman login, lalu ikuti petunjuk untuk mereset kata sandi melalui email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Hubungi Kami</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary/50 p-6 rounded-lg shadow-md-light flex items-start gap-4">
              <Mail className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Email Support</h3>
                <p className="text-muted-foreground mt-2">
                  Kirim pertanyaan Anda ke{" "}
                  <a href="mailto:support@kaskelas.com" className="text-primary hover:underline">
                    support@kaskelas.com
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-secondary/50 p-6 rounded-lg shadow-md-light flex items-start gap-4">
              <MessageSquare className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Live Chat</h3>
                <p className="text-muted-foreground mt-2">
                  Gunakan fitur live chat di pojok kanan bawah untuk bantuan langsung (tersedia 09:00-17:00 WIB).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Sumber Daya Lain</h2>
          <p className="text-muted-foreground">
            Lihat{" "}
            <a href="/panduan" className="text-primary hover:underline">
              Panduan Pengguna
            </a>{" "}
            kami untuk informasi lebih detail tentang penggunaan aplikasi Kas Kelas.
          </p>
        </div>
      </div>
    </div>
  )
}
