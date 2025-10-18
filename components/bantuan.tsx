"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, AlertCircle } from "lucide-react"

export default function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
      <Card className="border border-border shadow-md-light">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Bantuan Kas Kelas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <p className="text-sm sm:text-base text-muted-foreground">
            Temukan jawaban untuk pertanyaan umum tentang aplikasi Kas Kelas di sini. Kalau masih bingung, hubungi admin kelasmu ya!
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm sm:text-base">Gimana cara catat pembayaran?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Pilih menu <strong>Riwayat Bayar</strong> di navigasi.</li>
                  <li>Klik tombol "Tambah Pembayaran".</li>
                  <li>Isi nominal, tanggal, dan keterangan.</li>
                  <li>Klik simpan, selesai deh!</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm sm:text-base">Cara bikin rencana belanja?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Buka menu <strong>Rencana Belanja</strong>.</li>
                  <li>Klik "Tambah Rencana".</li>
                  <li>Masukkan nama item, estimasi biaya, dan prioritas.</li>
                  <li>Simpan, dan rencana akan muncul di daftar.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm sm:text-base">Fitur Kenang-Kenangan buat apa?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Fitur <strong>Kenang-Kenangan</strong> buat nyimpan momen spesial kelas, seperti foto acara atau catatan seru. Tinggal buka menu itu, upload file, tambah keterangan, dan share sama temen!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm sm:text-base">Lupa kata sandi admin, apa kabar?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Kalau kamu admin dan lupa kata sandi, hubungi tim dukungan lewat email di{" "}
                <a href="mailto:support@kaskelas.app" className="text-primary hover:underline">
                  support@kaskelas.app
                </a>{" "}
                dengan info akunmu untuk verifikasi.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="p-4 bg-secondary rounded-lg flex items-start gap-3">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Masih ada pertanyaan?</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Chat admin kelas atau email kami di{" "}
                <a href="mailto:support@kaskelas.app" className="text-primary hover:underline">
                  support@kaskelas.app
                </a>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>Pastikan semua data yang dimasukkan bener biar kas kelas tetap transparan.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}