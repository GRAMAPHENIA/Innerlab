"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { Sparkles } from "lucide-react" // Icono por defecto
import * as LucideIcons from "lucide-react"
import type { Identity } from "@/types"

type IconName = keyof typeof LucideIcons

interface OptionProps {
  identity: Identity
}

export function Option({ identity }: OptionProps) {
  const { selectedIdentity, selectIdentity } = useInnerLab()
  const { name, description, icon } = identity
  const isSelected = selectedIdentity === name

  // Búsqueda dinámica del icono. Si no se encuentra, usa 'Sparkles'.
  const IconComponent = (LucideIcons[icon as IconName] as React.ElementType) || Sparkles

  return (
    <button
      onClick={() => selectIdentity(name)}
      className={clsx(
        "group relative p-6 rounded-2xl",
        "border-2 transition-all duration-300",
        "hover:scale-105 hover:shadow-lg",
        isSelected
          ? ["border-blue-500 dark:border-blue-400", "bg-blue-50 dark:bg-blue-900/20", "shadow-lg shadow-blue-500/20"]
          : [
              "border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-800/50",
              "hover:border-gray-300 dark:hover:border-gray-600",
            ],
      )}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={clsx(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "transition-colors duration-300",
            isSelected
              ? ["bg-blue-500 dark:bg-blue-400", "text-white"]
              : [
                  "bg-gray-100 dark:bg-gray-700",
                  "text-gray-600 dark:text-gray-300",
                  "group-hover:bg-gray-200 dark:group-hover:bg-gray-600",
                ],
          )}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div>
          <h3
            className={clsx(
              "font-medium capitalize mb-1",
              isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200",
            )}
          >
            {name}
          </h3>
          <p className={clsx("text-sm leading-tight", "text-gray-600 dark:text-gray-400")}>
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}
