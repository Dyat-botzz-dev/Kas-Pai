"use client"

import { HelpCircle, Mail, MessageSquare } from "lucide-react"

export function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pusat Bantuan PAI-KAS</h1>
          <p className="text-muted-foreground text-lg">
            Butuh bantuan? Di sini kamu bisa temukan panduan, FAQ, dan cara menghubungi tim pengelola sistem kas PAI.
          </p>
        </div>

        {/*  FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Bagaimana cara membayar kas?</h3>
                  <p className="text-muted-foreground mt-2">
                    Pembayaran kas dapat dilakukan melalui bendahara kelas atau langsung melalui menu{" "}
                    <span className="font-semibold">“Pembayaran Kas”</span> di website. Pastikan jumlah dan tanggal sesuai.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Bagaimana cara melihat riwayat pembayaran?</h3>
                  <p className="text-muted-foreground mt-2">
                    Masuk ke halaman <span className="font-semibold">“Riwayat Kas”</span>. Semua transaksi kamu akan tercatat di sana,
                    lengkap dengan tanggal dan statusnya.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Bagaimana kalau ada kesalahan nominal?</h3>
                  <p className="text-muted-foreground mt-2">
                    Segera hubungi bendahara atau admin melalui fitur chat atau email agar data bisa dikoreksi sebelum
                    laporan akhir diproses.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <HelpCircle className="text-primary mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-foreground">Apakah data transaksi saya aman?</h3>
                  <p className="text-muted-foreground mt-2">
                    Ya. Semua data disimpan di database <span className="font-semibold">Supabase</span> dengan autentikasi
                    dan proteksi enkripsi. Hanya pengguna yang terverifikasi yang bisa mengakses data kas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Butuh Bantuan Langsung?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm flex items-start gap-4">
              <Mail className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Email Admin</h3>
                <p className="text-muted-foreground mt-2">
                  Kirim pertanyaan kamu ke{" "}
                  <a href="mailto:admin@pai-kas.online" className="text-primary hover:underline">
                    admin@pai-kas.online
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm flex items-start gap-4">
              <MessageSquare className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Live Chat / WhatsApp</h3>
                <p className="text-muted-foreground mt-2">
                  Chat langsung dengan pengelola kas melalui WhatsApp atau fitur live chat di pojok kanan bawah
                  (aktif 09:00–17:00 WIB).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Panduan Pengguna</h2>
          <p className="text-muted-foreground">
            Untuk langkah-langkah lebih detail, buka{" "}
            <a href="/panduan" className="text-primary hover:underline">
              halaman panduan
            </a>{" "}
            agar kamu bisa menggunakan semua fitur PAI-KAS dengan maksimal.
          </p>
        </div>
      </div>
    </div>
  )
}