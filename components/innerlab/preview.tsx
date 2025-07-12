"use client";

import { useInnerLab } from "@/context/innerlab-context";
import { clsx } from "clsx";
import {
  Fingerprint,
  RotateCcw,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
} from "lucide-react";
import { PersonalityShape } from "./personality-shape";

// Función para obtener el color basado en el porcentaje
const getColorClass = (value: number) => {
  if (value <= 20) return "text-gray-400 dark:text-gray-500";
  if (value <= 40) return "text-blue-400 dark:text-blue-500";
  if (value <= 60) return "text-blue-500 dark:text-blue-400";
  if (value <= 80) return "text-blue-600 dark:text-blue-300";
  return "text-blue-700 dark:text-blue-200";
};

export function Preview() {
  const { selectedIdentity, attributes, traits, reset } = useInnerLab();

  // Calcular puntuación total basada en atributos
  const totalScore = Object.values(attributes).reduce(
    (sum, value) => sum + value,
    0
  );
  const averageScore = totalScore / Object.keys(attributes).length;

  // Contar traits activos
  const activeTraits = Object.entries(traits).filter(([_, enabled]) => enabled);

  return (
    <div
      className={clsx(
        "p-8 rounded-2xl",
        "bg-white dark:bg-gray-800/50",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg"
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className={clsx(
            "text-2xl font-light",
            "text-gray-800 dark:text-gray-200"
          )}
        >
          Vista Previa
        </h2>

        <button
          onClick={reset}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "text-sm font-medium",
            "bg-gray-100 dark:bg-gray-700",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-200 dark:hover:bg-gray-600",
            "transition-colors duration-200 rounded-[5px]"
          )}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Título y nivel */}
        <div className="text-center">
          <h3
            className={clsx(
              "text-2xl font-medium mb-2",
              "text-gray-800 dark:text-gray-200"
            )}
          >
            {selectedIdentity ? (
              <span className="capitalize">{selectedIdentity}</span>
            ) : (
              "Sin identidad seleccionada"
            )}
          </h3>
          <div
            className={clsx(
              "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium",
              "bg-blue-100 dark:bg-blue-900/30",
              "text-blue-700 dark:text-blue-300",
              "shadow-sm"
            )}
          >
            Nivel promedio: {Math.round(averageScore)}%
          </div>
        </div>

        {/* Atributos */}
        <div>
          <h4
            className={clsx(
              "font-medium mb-3",
              "text-gray-700 dark:text-gray-300"
            )}
          >
            Atributos
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(attributes).map(([name, value]) => {
              // Mapeo de atributos a iconos
              const attributeIcons = {
                creativity: Sparkles,
                logic: Brain,
                intuition: Lightbulb,
                focus: Target,
              };

              const Icon =
                attributeIcons[name as keyof typeof attributeIcons] || Sparkles;

              return (
                <div
                  key={name}
                  className={clsx(
                    "flex items-center p-3 rounded-lg",
                    "bg-gray-50 dark:bg-gray-700/50"
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div
                        className={clsx(
                          "text-xs font-medium capitalize",
                          "text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {name}
                      </div>
                    </div>
                    <span
                      className={clsx(
                        "text-3xl font-bold font-mono transition-colors duration-300 leading-none",
                        getColorClass(value)
                      )}
                      style={{
                        textShadow: `0 0 8px rgba(59, 130, 246, ${
                          value / 200
                        })`,
                        opacity: 0.8 + value / 200,
                      }}
                    >
                      {value}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traits activos */}
        <div>
          <h4
            className={clsx(
              "font-medium mb-3",
              "text-gray-700 dark:text-gray-300"
            )}
          >
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
                    "capitalize"
                  )}
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <p
              className={clsx(
                "text-sm italic",
                "text-gray-500 dark:text-gray-500"
              )}
            >
              No hay rasgos activos
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
