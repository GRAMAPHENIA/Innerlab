"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { BarChart, Zap, Users, User } from "lucide-react"

// Mapeo de rasgos a iconos
const traitIcons = {
  analytical: BarChart,
  innovative: Zap,
  collaborative: Users,
  independent: User
} as const

interface ToggleProps {
  name: string
  label?: string
}

export function Toggle({ name, label }: ToggleProps) {
  const { traits, toggleTrait } = useInnerLab()
  const isEnabled = traits[name] || false

  // Obtener el ícono correspondiente al rasgo
  const Icon = traitIcons[name as keyof typeof traitIcons] || Users;
  
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-500" />
        <span className={clsx("font-medium capitalize", "text-gray-800 dark:text-gray-200")}>{label || name}</span>
      </div>

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
