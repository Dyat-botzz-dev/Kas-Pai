import { type NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = "8313362188:AAF58TYsamDniTngoa3ogpFMnuBRIzV3eCI"
const OWNER_CHAT_ID = "8196222037"
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (type === "forgot_password") {
      await sendForgotPasswordNotification(data)
    } else if (type === "payment_reminder") {
      await sendPaymentReminder(data)
    } else if (type === "new_event") {
      await sendEventNotification(data)
    }

    return NextResponse.json({ ok: true, message: "Notification sent" })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ ok: false, error: "Failed to send notification" }, { status: 500 })
  }
}

async function sendForgotPasswordNotification(data: {
  adminName?: string
  timestamp?: string
}) {
  const message = `
🔐 <b>Permintaan Ubah Password Admin</b>

Ada permintaan untuk mengubah password Admin Panel Kas Kelas.

<b>Waktu:</b> ${data.timestamp || new Date().toLocaleString("id-ID")}

Silakan pilih aksi:
- Tekan <b>Konfirmasi</b> untuk melanjutkan
- Tekan <b>Tolak</b> untuk membatalkan

Jika Anda mengkonfirmasi, silakan kirim password baru dengan format:
<code>/changepw password_baru</code>
  `.trim()

  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "✅ Konfirmasi",
                callback_data: "confirm_password_change",
              },
              {
                text: "❌ Tolak",
                callback_data: "reject_password_change",
              },
            ],
          ],
        },
      }),
    })
  } catch (error) {
    console.error("Error sending forgot password notification:", error)
  }
}

async function sendPaymentReminder(data: {
  studentName: string
  amount: number
}) {
  const message = `
💳 <b>Pengingat Pembayaran Kas</b>

Siswa: <b>${data.studentName}</b>
Nominal: <b>Rp ${data.amount.toLocaleString("id-ID")}</b>

Silakan catat pembayaran ini di Admin Panel.
  `.trim()

  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Error sending payment reminder:", error)
  }
}

async function sendEventNotification(data: {
  eventName: string
  date: string
  location: string
}) {
  const message = `
🎉 <b>Acara Kelas Baru</b>

Nama: <b>${data.eventName}</b>
Tanggal: <b>${data.date}</b>
Lokasi: <b>${data.location}</b>

Silakan kelola acara ini di Admin Panel.
  `.trim()

  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Error sending event notification:", error)
  }
}
