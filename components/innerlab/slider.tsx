"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { Sparkles, Brain, Lightbulb, Target, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AttributeName } from "@/types"

// Mapeo de atributos a iconos
const attributeIcons = {
  creativity: Sparkles,
  logic: Brain,
  intuition: Lightbulb,
  focus: Target,
} as const

interface SliderProps {
  name: AttributeName
  label?: string
  min?: number
  max?: number
}

export function Slider({ name, label, min = 0, max = 100 }: SliderProps) {
  const { attributes, updateAttribute } = useInnerLab()
  const value = attributes[name] || 0
  const [error, setError] = useState<string | null>(null)

  // Obtener el ícono correspondiente al atributo
  const Icon = attributeIcons[name] || Sparkles

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number.parseInt(e.target.value)
    if (rawValue < min || rawValue > max) {
      setError(`El valor debe estar entre ${min} y ${max}.`)
    } else {
      setError(null)
    }
    updateAttribute(name, rawValue)
  }

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-blue-500" />
          <span className={clsx("text-sm font-medium capitalize", "text-gray-800 dark:text-gray-200")}>{label || name}</span>
        </div>
        <span
          className={clsx(
            "text-xs font-mono px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded",
            "text-gray-600 dark:text-gray-300",
          )}
        >
          {value}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className={clsx(
            "w-full h-1 appearance-none bg-transparent",
            "[&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1",
            "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500",
            "[&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:hover:bg-blue-600 [&::-webkit-slider-thumb]:active:bg-blue-700",
            "[&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-1",
            "[&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:dark:bg-gray-700",
            "[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-blue-500",
            "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:hover:bg-blue-600",
            "[&::-moz-range-thumb]:active:bg-blue-700",
            "[&::-ms-track]:h-1 [&::-ms-track]:bg-transparent [&::-ms-track]:border-transparent",
            "[&::-ms-fill-lower]:bg-blue-500 [&::-ms-fill-upper]:bg-gray-200",
            "[&::-ms-fill-upper]:dark:bg-gray-700 [&::-ms-thumb]:h-3",
            "[&::-ms-thumb]:w-3 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-blue-500",
            "[&::-ms-thumb]:cursor-pointer [&::-ms-thumb]:mt-0 [&::-ms-thumb]:appearance-none"
          )}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(value / max) * 100}%, #e5e7eb ${(value / max) * 100}%, #e5e7eb 100%)`,
            WebkitAppearance: 'none',
            height: '4px',
            borderRadius: '9999px',
            outline: 'none',
          }}
        />
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
