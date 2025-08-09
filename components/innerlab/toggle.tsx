"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { BarChart, Zap, Users, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useIsMobile } from "@/hooks/use-mobile"
import { TraitName } from "@/types"

// Mapeo de rasgos a iconos
const traitIcons = {
  analytical: BarChart,
  innovative: Zap,
  collaborative: Users,
  independent: User
} as const

// Mapeo de rasgos a descripciones para tooltips
const traitDescriptions = {
  analytical: "Enfoque metódico y basado en datos para resolver problemas",
  innovative: "Capacidad para pensar de manera creativa y proponer soluciones originales",
  collaborative: "Preferencia por trabajar en equipo y compartir ideas",
  independent: "Capacidad para trabajar de forma autónoma y tomar decisiones propias"
} as const

// Mapeo de rasgos a beneficios cuando están activados
const traitBenefits = {
  analytical: [
    "Mejora la toma de decisiones basada en datos",
    "Aumenta la precisión en la resolución de problemas",
    "Favorece el pensamiento estructurado"
  ],
  innovative: [
    "Fomenta soluciones originales a problemas complejos",
    "Impulsa la generación de ideas disruptivas",
    "Promueve enfoques no convencionales"
  ],
  collaborative: [
    "Facilita el intercambio de conocimientos",
    "Mejora la comunicación en equipo",
    "Potencia el aprendizaje colectivo"
  ],
  independent: [
    "Aumenta la autonomía en la toma de decisiones",
    "Desarrolla la confianza en las propias capacidades",
    "Mejora la gestión del tiempo personal"
  ]
} as const

interface ToggleProps {
  name: TraitName
  label?: string
}

export function Toggle({ name, label }: ToggleProps) {
  const { traits, toggleTrait } = useInnerLab()
  const isEnabled = traits[name] || false
  const isMobile = useIsMobile()

  // Obtener el ícono correspondiente al rasgo
  const Icon = traitIcons[name] || Users;
  
  return (
    <div className="group">
      <HoverCard openDelay={200} closeDelay={100}>
        <div className={clsx(
          "flex items-center justify-between p-4 rounded-xl",
          "bg-white dark:bg-gray-800/50 border", 
          "transition-all duration-300",
          isEnabled 
            ? "border-blue-300 dark:border-blue-700 shadow-md" 
            : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800/50 hover:shadow-md"
        )}>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-3 cursor-help">
              <div className={clsx(
                "p-1.5 rounded-full transition-all duration-300",
                isEnabled 
                  ? "bg-blue-100 dark:bg-blue-900/30" 
                  : "bg-gray-100 dark:bg-gray-700/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
              )}>
                <Icon className={clsx(
                  "w-5 h-5 transition-all duration-300",
                  isEnabled 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-300"
                )} />
              </div>
              <span className={clsx(
                "font-medium capitalize transition-all duration-300", 
                isEnabled 
                  ? "text-blue-700 dark:text-blue-300" 
                  : "text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              )}>
                {label || name}
              </span>
            </div>
          </HoverCardTrigger>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toggleTrait(name)}
                  className={clsx(
                    "relative w-12 h-6 rounded-full transition-all duration-300",
                    isEnabled ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
                    "hover:shadow-md active:shadow-inner"
                  )}
                  aria-label={`Toggle ${name}`}
                >
                  <div
                    className={clsx(
                      "absolute top-0.5 w-5 h-5 rounded-full bg-white",
                      "transition-all duration-300 shadow-sm",
                      isEnabled ? "translate-x-6" : "translate-x-0.5",
                      "hover:scale-105 active:scale-95"
                    )}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "top"} className="py-1 px-2 text-xs">
                {isEnabled ? "Desactivar rasgo" : "Activar rasgo"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <HoverCardContent side={isMobile ? "bottom" : "right"} className="p-4 w-72">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">{label || name}</h4>
            <p className="text-sm text-muted-foreground">{traitDescriptions[name]}</p>
            
            <div className="pt-1">
              <div className="text-xs font-medium">
                Estado: <span className={isEnabled ? "text-green-500" : "text-gray-500"}>
                  {isEnabled ? "Activado" : "Desactivado"}
                </span>
              </div>
              
              {isEnabled && (
                <div className="mt-2">
                  <p className="text-xs font-medium mb-1">Beneficios:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {traitBenefits[name].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-1">•</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
