"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-zinc-800/50 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors shadow-sm"
      title="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-4 h-4 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-300" />
      )}
    </button>
  );
}
