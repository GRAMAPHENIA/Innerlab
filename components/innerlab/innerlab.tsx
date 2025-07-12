"use client"

import type { ReactNode } from "react"
import { InnerLabProvider } from "@/context/innerlab-context"
import { clsx } from "clsx"

interface InnerLabProps {
  children: ReactNode
  className?: string
}

export function InnerLab({ children, className }: InnerLabProps) {
  return (
    <InnerLabProvider>
      <div
        className={clsx(
          "min-h-screen w-full",
          "bg-gradient-to-br from-gray-50 to-gray-100",
          "dark:from-gray-900 dark:to-gray-800",
          "transition-colors duration-300",
          className,
        )}
      >
        <div className="container mx-auto px-6 py-12">
          <header className="text-center mb-12">
            <h1
              className={clsx(
                "text-4xl md:text-5xl font-light mb-4",
                "text-gray-800 dark:text-gray-100",
                "tracking-wide",
              )}
            >
              InnerLab
            </h1>
            <p className={clsx("text-lg text-gray-600 dark:text-gray-400", "max-w-2xl mx-auto leading-relaxed")}>
              Laboratorio de configuración de identidad creativa
            </p>
          </header>

          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </div>
    </InnerLabProvider>
  )
}
