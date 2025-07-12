"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { User, RotateCcw } from "lucide-react"

export function Preview() {
  const { selectedIdentity, attributes, traits, reset } = useInnerLab()

  // Calcular puntuación total basada en atributos
  const totalScore = Object.values(attributes).reduce((sum, value) => sum + value, 0)
  const averageScore = totalScore / Object.keys(attributes).length

  // Contar traits activos
  const activeTraits = Object.entries(traits).filter(([_, enabled]) => enabled)

  return (
    <div
      className={clsx(
        "p-8 rounded-2xl",
        "bg-white dark:bg-gray-800/50",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg",
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={clsx("text-2xl font-light", "text-gray-800 dark:text-gray-200")}>Vista Previa</h2>

        <button
          onClick={reset}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "text-sm font-medium",
            "bg-gray-100 dark:bg-gray-700",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-200 dark:hover:bg-gray-600",
            "transition-colors duration-200",
          )}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Avatar y identidad */}
        <div className="text-center">
          <div
            className={clsx(
              "w-24 h-24 mx-auto mb-4 rounded-full",
              "bg-gradient-to-br from-blue-500 to-purple-600",
              "flex items-center justify-center",
              "shadow-lg",
            )}
          >
            <User className="w-12 h-12 text-white" />
          </div>

          <h3 className={clsx("text-xl font-medium mb-2", "text-gray-800 dark:text-gray-200")}>
            {selectedIdentity ? <span className="capitalize">{selectedIdentity}</span> : "Sin identidad seleccionada"}
          </h3>

          <div
            className={clsx(
              "inline-flex items-center px-3 py-1 rounded-full text-sm",
              "bg-blue-100 dark:bg-blue-900/30",
              "text-blue-700 dark:text-blue-300",
            )}
          >
            Nivel: {Math.round(averageScore)}
          </div>
        </div>

        {/* Atributos */}
        <div>
          <h4 className={clsx("font-medium mb-3", "text-gray-700 dark:text-gray-300")}>Atributos</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(attributes).map(([name, value]) => (
              <div
                key={name}
                className={clsx("flex justify-between items-center p-3 rounded-lg", "bg-gray-50 dark:bg-gray-700/50")}
              >
                <span className={clsx("text-sm capitalize", "text-gray-600 dark:text-gray-400")}>{name}</span>
                <span className={clsx("font-mono text-sm", "text-gray-800 dark:text-gray-200")}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traits activos */}
        <div>
          <h4 className={clsx("font-medium mb-3", "text-gray-700 dark:text-gray-300")}>
            Rasgos Activos ({activeTraits.length})
          </h4>
          {activeTraits.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeTraits.map(([name]) => (
                <span
                  key={name}
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm",
                    "bg-green-100 dark:bg-green-900/30",
                    "text-green-700 dark:text-green-300",
                    "capitalize",
                  )}
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <p className={clsx("text-sm italic", "text-gray-500 dark:text-gray-500")}>No hay rasgos activos</p>
          )}
        </div>
      </div>
    </div>
  )
}
