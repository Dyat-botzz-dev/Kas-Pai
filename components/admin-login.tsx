"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { sendForgotPasswordNotification } from "@/lib/telegram-service"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingNotification, setIsSendingNotification] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const DEFAULT_USERNAME = "kaskelasA"
  const DEFAULT_PASSWORD = "KAS-PAI A"

  useEffect(() => {
    const savedUsername = localStorage.getItem("adminUsername")
    const wasRemembered = localStorage.getItem("adminRememberMe") === "true"
    if (savedUsername && wasRemembered) {
      setUsername(savedUsername)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      localStorage.setItem("adminToken", "authenticated")
      if (rememberMe) {
        localStorage.setItem("adminUsername", username)
        localStorage.setItem("adminRememberMe", "true")
      } else {
        localStorage.removeItem("adminUsername")
        localStorage.removeItem("adminRememberMe")
      }
      onLoginSuccess()
    } else {
      setError("Username atau password salah")
    }

    setIsLoading(false)
  }

  const handleForgotPassword = async () => {
    setIsSendingNotification(true)
    try {
      await sendForgotPasswordNotification()
      alert(
        "Notifikasi lupa password telah dikirim ke owner melalui Telegram Bot.\n\nOwner akan menerima pesan dengan tombol konfirmasi dan tolak.\n\nSetelah dikonfirmasi, owner dapat mengirim password baru dengan format:\n/changepw <password_baru>",
      )
    } catch (error) {
      alert("Gagal mengirim notifikasi. Silakan coba lagi.")
      console.error(error)
    } finally {
      setIsSendingNotification(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Admin Panel</h1>
            <p className="text-slate-600 dark:text-slate-400">Masuk untuk mengelola kas kelas</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                Ingat saya
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Memproses...
                </>
              ) : (
                <>
                  <span>🔓</span>
                  Masuk
                </>
              )}
            </button>

            {/* Forgot Password */}
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isSendingNotification}
              className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-2 disabled:opacity-50"
            >
              {isSendingNotification ? "Mengirim..." : "Lupa Password?"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Demo: Username: <span className="font-mono">kaskelasA</span> | Password:{" "}
              <span className="font-mono">KAS-PAI A</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
