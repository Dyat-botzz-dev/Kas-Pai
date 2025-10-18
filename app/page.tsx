"use client";

import { useState } from "react";
import { Navigation } from "../components/navigation";
import Bantuan from "../components/bantuan";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false); // Ganti dengan logika autentikasi
  const [theme, setTheme] = useState("light");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false); // Logika logout
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const renderPage = () => {
    switch (currentPage) {
      case "help":
        return <Bantuan />;
      case "dashboard":
      default:
        return <div className="p-6">Selamat datang di Dashboard</div>;
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isAdmin={isAdmin}
        onAdminLogout={handleAdminLogout}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main>{renderPage()}</main>
    </div>
  );
}
