"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { Compass, Building2, Palette, Lightbulb, Users, Target, Zap, Heart } from "lucide-react"

const identityIcons = {
  explorer: Compass,
  architect: Building2,
  artist: Palette,
  innovator: Lightbulb,
  collaborator: Users,
  strategist: Target,
  catalyst: Zap,
  empath: Heart,
}

const identityDescriptions = {
  explorer: "Descubre nuevos territorios",
  architect: "Construye estructuras sólidas",
  artist: "Expresa creatividad pura",
  innovator: "Genera ideas revolucionarias",
  collaborator: "Conecta y une equipos",
  strategist: "Planifica el futuro",
  catalyst: "Acelera el cambio",
  empath: "Comprende profundamente",
}

interface OptionProps {
  name: keyof typeof identityIcons
}

export function Option({ name }: OptionProps) {
  const { selectedIdentity, selectIdentity } = useInnerLab()
  const Icon = identityIcons[name]
  const isSelected = selectedIdentity === name

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
          <Icon className="w-6 h-6" />
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
            {identityDescriptions[name]}
          </p>
        </div>
      </div>
    </button>
  )
}
