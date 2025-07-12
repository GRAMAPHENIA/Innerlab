"use client"

import type { ReactNode } from "react"
import { clsx } from "clsx"

interface SelectorProps {
  children: ReactNode
  className?: string
}

export function Selector({ children, className }: SelectorProps) {
  return (
    <div className={clsx("mb-8", className)}>
      <h2 className={clsx("text-2xl font-light mb-6", "text-gray-800 dark:text-gray-200")}>Identidad Creativa</h2>
      <div className={clsx("grid grid-cols-2 md:grid-cols-4 gap-4")}>{children}</div>
    </div>
  )
}
