"use client"

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
  ]

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">❓ Bantuan & Panduan</h1>
      <p className="text-muted-foreground mb-6">
        Halaman ini berisi pertanyaan umum dan panduan cepat menggunakan sistem kas kelas.
      </p>

      <div className="space-y-4">
        {helpItems.map((item, i) => (
          <div key={i} className="border border-border rounded-xl p-4 bg-card hover:shadow-md transition-smooth">
            <h2 className="font-semibold text-foreground mb-2">{item.q}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://wa.me/6287718203240"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-smooth"
        >
          💬 Hubungi Developer
        </a>
      </div>
    </div>
  )
}