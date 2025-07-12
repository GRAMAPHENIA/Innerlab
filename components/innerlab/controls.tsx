"use client"

import type { ReactNode } from "react"
import { clsx } from "clsx"

interface ControlsProps {
  children: ReactNode
  className?: string
}

export function Controls({ children, className }: ControlsProps) {
  return (
    <div className={clsx("mb-8", className)}>
      <h2 className={clsx("text-2xl font-light mb-6", "text-gray-800 dark:text-gray-200")}>Configuración</h2>
      <div className={clsx("grid md:grid-cols-2 gap-8")}>{children}</div>
    </div>
  )
}
