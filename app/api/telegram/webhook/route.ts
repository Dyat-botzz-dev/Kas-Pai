import { type NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = "8313362188:AAF58TYsamDniTngoa3ogpFMnuBRIzV3eCI"
const OWNER_CHAT_ID = "8196222037"
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`

interface TelegramUpdate {
  update_id: number
  message?: {
    chat: { id: number }
    text: string
    from: { id: number; first_name: string }
  }
  callback_query?: {
    id: string
    from: { id: number }
    data: string
    message: { message_id: number; chat: { id: number } }
  }
}

// Store pending password changes in memory (in production, use database)
const pendingPasswordChanges: Record<string, { newPassword: string; timestamp: number }> = {}

export async function POST(request: NextRequest) {
  try {
    const update: TelegramUpdate = await request.json()

    // Handle text messages
    if (update.message?.text) {
      const text = update.message.text
      const chatId = update.message.chat.id

      // Only respond to owner
      if (chatId.toString() !== OWNER_CHAT_ID) {
        return NextResponse.json({ ok: true })
      }

      // Handle /changepw command
      if (text.startsWith("/changepw ")) {
        const newPassword = text.replace("/changepw ", "").trim()

        if (!newPassword) {
          await sendMessage(chatId, "Format salah. Gunakan: /changepw <password_baru>")
          return NextResponse.json({ ok: true })
        }

        // Store the new password
        pendingPasswordChanges["current"] = {
          newPassword,
          timestamp: Date.now(),
        }

        // Send confirmation
        await sendMessage(
          chatId,
          `✅ Password berhasil diubah!\n\nPassword baru: ${newPassword}\n\nSilakan gunakan password baru untuk login ke Admin Panel.`,
        )

        // Update localStorage via API
        await updateAdminPassword(newPassword)

        return NextResponse.json({ ok: true })
      }

      // Handle /status command
      if (text === "/status") {
        await sendMessage(
          chatId,
          "✅ Bot Kas Kelas aktif dan siap melayani!\n\nKomando tersedia:\n/changepw <password_baru> - Ubah password admin",
        )
        return NextResponse.json({ ok: true })
      }
    }

    // Handle callback queries (button clicks)
    if (update.callback_query) {
      const callbackId = update.callback_query.id
      const chatId = update.callback_query.message.chat.id
      const data = update.callback_query.data

      if (data === "confirm_password_change") {
        await answerCallbackQuery(callbackId, "Silakan kirim password baru dengan format: /changepw <password_baru>")
      } else if (data === "reject_password_change") {
        await answerCallbackQuery(callbackId, "Perubahan password dibatalkan")
        await editMessage(chatId, update.callback_query.message.message_id, "❌ Perubahan password telah ditolak.")
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Telegram webhook error:", error)
    return NextResponse.json({ ok: false, error: "Internal server error" })
  }
}

async function sendMessage(chatId: number | string, text: string) {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error sending message:", error)
  }
}

async function sendMessageWithButtons(
  chatId: number | string,
  text: string,
  buttons: Array<Array<{ text: string; callback_data: string }>>,
) {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: buttons,
        },
      }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error sending message with buttons:", error)
  }
}

async function answerCallbackQuery(callbackId: string, text: string) {
  try {
    await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackId,
        text,
        show_alert: false,
      }),
    })
  } catch (error) {
    console.error("Error answering callback query:", error)
  }
}

async function editMessage(chatId: number | string, messageId: number, text: string) {
  try {
    await fetch(`${TELEGRAM_API}/editMessageText`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Error editing message:", error)
  }
}

async function updateAdminPassword(newPassword: string) {
  try {
    // This would be called to update the password in your system
    // For now, it's just a placeholder
    console.log("Password updated to:", newPassword)
  } catch (error) {
    console.error("Error updating password:", error)
  }
}
