"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  // Al cargar, verificamos si había preferencia guardada
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
    setIsLight(!isLight);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[999] p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 shadow-xl transition-all duration-300 backdrop-blur-md flex items-center justify-center group"
      title={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Luz"}
    >
      {isLight ? (
        <Moon className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-500 group-hover:rotate-45" />
      )}
    </button>
  );
}
