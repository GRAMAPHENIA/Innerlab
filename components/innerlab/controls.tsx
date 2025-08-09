"use client"

import type { ReactNode } from "react"
import { clsx } from "clsx"
import { useInnerLab } from "@/context/innerlab-context"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface ControlsProps {
  children: ReactNode
  className?: string
}

export function Controls({ children, className }: ControlsProps) {
  const { reset } = useInnerLab()

  return (
    <div className={clsx("mb-8", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2
          className={clsx(
            "text-2xl font-light",
            "text-gray-800 dark:text-gray-200",
          )}
        >
          Configuración
        </h2>
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetear
        </Button>
      </div>
      <div className={clsx("grid md:grid-cols-2 gap-8")}>{children}</div>
    </div>
  )
}
