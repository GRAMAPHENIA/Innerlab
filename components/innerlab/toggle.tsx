"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"

interface ToggleProps {
  name: string
  label?: string
}

export function Toggle({ name, label }: ToggleProps) {
  const { traits, toggleTrait } = useInnerLab()
  const isEnabled = traits[name] || false

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <span className={clsx("font-medium capitalize", "text-gray-800 dark:text-gray-200")}>{label || name}</span>

      <button
        onClick={() => toggleTrait(name)}
        className={clsx(
          "relative w-12 h-6 rounded-full transition-colors duration-300",
          isEnabled ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600",
        )}
        aria-label={`Toggle ${name}`}
      >
        <div
          className={clsx(
            "absolute top-0.5 w-5 h-5 rounded-full bg-white",
            "transition-transform duration-300 shadow-sm",
            isEnabled ? "translate-x-6" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  )
}
