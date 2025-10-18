"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, HelpCircle, MessageSquare } from "lucide-react"

export default function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-md-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <HelpCircle className="h-6 w-6 text-primary" />
            Pusat Bantuan Kas Kelas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Selamat datang di pusat bantuan Kas Kelas! Di sini kamu bisa menemukan jawaban atas pertanyaan umum seputar penggunaan aplikasi. Jika masih ada pertanyaan, hubungi admin kelasmu.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Cara menambahkan pembayaran baru?</AccordionTrigger>
              <AccordionContent>
                Untuk menambahkan pembayaran baru:
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Buka menu <strong>Riwayat Bayar</strong>.</li>
                  <li>Klik tombol "Tambah Pembayaran".</li>
                  <li>Isi detail seperti jumlah, tanggal, dan deskripsi.</li>
                  <li>Simpan, dan pembayaran akan tercatat!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Bagaimana cara membuat rencana belanja?</AccordionTrigger>
              <AccordionContent>
                Untuk membuat rencana belanja:
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Navigasi ke menu <strong>Rencana Belanja</strong>.</li>
                  <li>Klik "Tambah Rencana".</li>
                  <li>Masukkan item, perkiraan biaya, dan prioritas.</li>
                  <li>Simpan untuk melihat rencana di daftar.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Apa itu fitur Kenang-Kenangan?</AccordionTrigger>
              <AccordionContent>
                Fitur <strong>Kenang-Kenangan</strong> memungkinkan kamu untuk menyimpan momen spesial kelas, seperti foto atau catatan acara. Cukup buka menu tersebut, unggah file, dan tambahkan deskripsi untuk dibagikan dengan teman sekelas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Bagaimana jika saya lupa kata sandi admin?</AccordionTrigger>
              <AccordionContent>
                Jika kamu admin dan lupa kata sandi, hubungi tim dukungan kami melalui email atau fitur kontak di aplikasi. Pastikan kamu menyediakan informasi verifikasi untuk memulihkan akun.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 p-4 bg-secondary rounded-lg flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Butuh bantuan lebih lanjut?</h3>
              <p className="text-muted-foreground">
                Kirim pesan ke admin kelas atau hubungi tim dukungan kami di{" "}
                <a href="mailto:support@kaskelas.app" className="text-primary hover:underline">
                  support@kaskelas.app
                </a>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Pastikan data yang dimasukkan akurat untuk menjaga transparansi kas kelas.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}