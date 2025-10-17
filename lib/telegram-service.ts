// Service untuk mengirim notifikasi ke Telegram

export async function sendForgotPasswordNotification() {
  try {
    const response = await fetch("/api/telegram/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "forgot_password",
        data: {
          timestamp: new Date().toLocaleString("id-ID"),
        },
      }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error sending forgot password notification:", error)
    throw error
  }
}

export async function sendPaymentReminder(studentName: string, amount: number) {
  try {
    const response = await fetch("/api/telegram/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "payment_reminder",
        data: {
          studentName,
          amount,
        },
      }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error sending payment reminder:", error)
    throw error
  }
}

export async function sendEventNotification(eventName: string, date: string, location: string) {
  try {
    const response = await fetch("/api/telegram/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "new_event",
        data: {
          eventName,
          date,
          location,
        },
      }),
    })
    return await response.json()
  } catch (error) {
    console.error("Error sending event notification:", error)
    throw error
  }
}
