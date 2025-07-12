"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { Sparkles, Brain, Lightbulb, Target } from "lucide-react"

// Mapeo de atributos a iconos
const attributeIcons = {
  creativity: Sparkles,
  logic: Brain,
  intuition: Lightbulb,
  focus: Target
} as const

interface SliderProps {
  name: string
  label?: string
  min?: number
  max?: number
}

export function Slider({ name, label, min = 0, max = 100 }: SliderProps) {
  const { attributes, updateAttribute } = useInnerLab()
  const value = attributes[name] || 0

  // Obtener el ícono correspondiente al atributo
  const Icon = attributeIcons[name as keyof typeof attributeIcons] || Sparkles;
  
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-blue-500" />
          <span className={clsx("font-medium capitalize", "text-gray-800 dark:text-gray-200")}>{label || name}</span>
        </div>
        <span className={clsx("text-sm font-mono", "text-gray-600 dark:text-gray-400")}>{value}</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => updateAttribute(name, Number.parseInt(e.target.value))}
          className={clsx(
            "w-full h-2 rounded-lg appearance-none cursor-pointer",
            "bg-gray-200 dark:bg-gray-700",
            "slider",
          )}
        />
        <div
          className={clsx(
            "absolute top-0 h-2 rounded-lg pointer-events-none",
            "bg-gradient-to-r from-blue-500 to-blue-400",
          )}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}
