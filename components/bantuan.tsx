"use client"

import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react"

export function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Pusat Bantuan KAS PAI</h1>
          <p className="text-muted-foreground text-lg">
            Butuh bantuan? Di sini kamu bisa menemukan panduan, FAQ, dan kontak resmi tim pengelola sistem kas PAI.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: "Bagaimana cara membayar kas?",
                a: (
                  <>
                    Pembayaran kas dilakukan melalui{" "}
                    <span className="font-semibold">bendahara (Udin / Petot)</span> setiap Senin–Kamis sebesar Rp2.000,
                    atau bisa juga melalui menu{" "}
                    <span className="font-semibold">“Pembayaran Kas”</span> di website. Pastikan nominal dan tanggal sesuai.
                  </>
                ),
              },
              {
                q: "Bagaimana cara melihat riwayat pembayaran?",
                a: (
                  <>
                    Masuk ke halaman <span className="font-semibold">“Riwayat Kas”</span> untuk melihat semua transaksi kamu,
                    lengkap dengan tanggal, nominal, dan statusnya.
                  </>
                ),
              },
              {
                q: "Apa yang harus dilakukan jika ada kesalahan nominal atau bug?",
                a: (
                  <>
                    Jika terkait pembayaran, segera hubungi{" "}
                    <span className="font-semibold">bendahara (Udin / Petot)</span>.
                    Jika berhubungan dengan fitur website, error, atau bug, langsung hubungi{" "}
                    <span className="font-semibold">Developer (Dev Xyz King’s)</span>.
                  </>
                ),
              },
              {
                q: "Apakah data saya aman?",
                a: (
                  <>
                    Ya. Semua data disimpan di <span className="font-semibold">Supabase</span> dengan sistem autentikasi dan enkripsi.
                    Hanya pengguna terverifikasi yang dapat mengakses data.
                  </>
                ),
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary/50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-4">
                  <HelpCircle className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-medium text-foreground">{item.q}</h3>
                    <p className="text-muted-foreground mt-2">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Menggunakan Website */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Tata Cara Menggunakan Website</h2>
          <div className="bg-secondary/50 p-6 rounded-xl shadow-sm space-y-3 text-muted-foreground">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Buka website resmi: <a href="https://kas-pai.vercel.app" className="text-primary hover:underline">kas-pai.vercel.app</a></li>
              <li>Login menggunakan akun yang telah didaftarkan atau buat akun baru jika belum punya.</li>
              <li>Pilih menu <span className="font-semibold">“Pembayaran Kas”</span> untuk setor uang kas secara online.</li>
              <li>Untuk melihat transaksi, buka menu <span className="font-semibold">“Riwayat Kas”</span>.</li>
              <li>Jika ada bug, error, atau fitur yang tidak berfungsi, laporkan ke developer melalui kontak di bawah.</li>
            </ol>
          </div>
        </section>

        {/* Contact Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Kontak Bantuan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Developer */}
            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm flex items-start gap-4">
              <Mail className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Developer (Dev Xyz King’s)</h3>
                <p className="text-muted-foreground mt-2">
                  Email:{" "}
                  <a href="mailto:xyzkings22@gmail.com" className="text-primary hover:underline">
                    xyzkings22@gmail.com
                  </a>
                  <br />
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/6287718203240"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    6287718203240
                  </a>
                </p>
              </div>
            </div>

            {/* Bendahara */}
            <div className="bg-secondary/50 p-6 rounded-xl shadow-sm flex items-start gap-4">
              <Phone className="text-primary mt-1" size={24} />
              <div>
                <h3 className="font-medium text-foreground">Bendahara (Udin & Petot)</h3>
                <p className="text-muted-foreground mt-2">
                  Silakan hubungi bendahara untuk pembayaran kas secara langsung atau laporan nominal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center text-muted-foreground text-sm pt-8">
          <p>
            © {new Date().getFullYear()} PAI-KAS System — Dikelola oleh Dev Xyz King’s. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}