"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"

interface SliderProps {
  name: string
  label?: string
  min?: number
  max?: number
}

export function Slider({ name, label, min = 0, max = 100 }: SliderProps) {
  const { attributes, updateAttribute } = useInnerLab()
  const value = attributes[name] || 0

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className={clsx("font-medium capitalize", "text-gray-800 dark:text-gray-200")}>{label || name}</span>
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
