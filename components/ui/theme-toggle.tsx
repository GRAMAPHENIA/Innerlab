"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { clsx } from "clsx"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "p-2 rounded-full",
        "hover:bg-gray-200 dark:hover:bg-gray-700",
        "transition-colors flex-shrink-0",
        "text-gray-700 dark:text-gray-400"
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
