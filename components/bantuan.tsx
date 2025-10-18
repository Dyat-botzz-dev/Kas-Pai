import React from "react";

export default function Bantuan() {
  const helpItems = [
    {
      q: "Bagaimana cara membayar kas?",
      a: "Pembayaran kas dapat dilakukan setiap Senin–Kamis sebesar Rp2.000 melalui bendahara kelas atau sistem online yang tersedia.",
    },
    {
      q: "Bagaimana jika saya lupa membayar?",
      a: "Tenang, sistem akan mencatat keterlambatan. Kamu bisa membayar ganda minggu berikutnya.",
    },
    {
      q: "Siapa yang bisa mengakses panel admin?",
      a: "Hanya ketua kelas dan bendahara yang memiliki hak akses admin.",
    },
    {
      q: "Ada bug atau masalah?",
      a: "Laporkan langsung ke developer melalui WhatsApp: +62 877-1820-3240 atau menu ‘Lapor Bug’ di bawah.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">❓ Bantuan & Panduan</h1>
          <p className="mt-2 text-primary-foreground/80">
            Panduan lengkap untuk menggunakan sistem kas kelas
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pertanyaan Umum</h2>
          <p className="text-muted-foreground mb-6">
            Berikut adalah jawaban atas pertanyaan umum terkait sistem kas kelas.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {helpItems.map((item, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-5 bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Butuh Bantuan Lebih Lanjut?</h2>
          <p className="text-muted-foreground mb-6">
            Jika kamu memiliki pertanyaan lain atau menemukan masalah, hubungi kami!
          </p>
          <a
            href="https://wa.me/6287718203240"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            💬 Hubungi Developer
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2025 Sistem Kas Kelas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
