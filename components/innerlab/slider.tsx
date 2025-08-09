"use client"

import { useInnerLab } from "@/context/innerlab-context"
import { clsx } from "clsx"
import { Sparkles, Brain, Lightbulb, Target, AlertCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AttributeName } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useIsMobile } from "@/hooks/use-mobile"

// Mapeo de atributos a iconos
const attributeIcons = {
  creativity: Sparkles,
  logic: Brain,
  intuition: Lightbulb,
  focus: Target,
} as const

// Mapeo de atributos a descripciones para tooltips
const attributeDescriptions = {
  creativity: "Capacidad para generar ideas originales y soluciones innovadoras",
  logic: "Habilidad para analizar problemas y tomar decisiones racionales",
  intuition: "Capacidad para entender situaciones sin razonamiento consciente",
  focus: "Habilidad para mantener la atención y concentración en una tarea",
}

// Mapeo de rangos de valores a descripciones cualitativas
const valueDescriptions = {
  creativity: {
    low: "Enfoque práctico y convencional",
    medium: "Balance entre convencional e innovador",
    high: "Altamente creativo e innovador"
  },
  logic: {
    low: "Decisiones basadas en intuición",
    medium: "Balance entre análisis e intuición",
    high: "Análisis profundo y sistemático"
  },
  intuition: {
    low: "Preferencia por datos concretos",
    medium: "Balance entre datos e instinto",
    high: "Gran capacidad intuitiva"
  },
  focus: {
    low: "Atención dispersa en múltiples tareas",
    medium: "Concentración moderada",
    high: "Concentración profunda y sostenida"
  }
}

interface SliderProps {
  name: AttributeName
  label?: string
  min?: number
  max?: number
}

export function Slider({ name, label, min = 0, max = 100 }: SliderProps) {
  const { attributes, updateAttribute } = useInnerLab()
  const value = attributes[name] || 0
  const [error, setError] = useState<string | null>(null)
  const [localValue, setLocalValue] = useState(value)
  const [isDragging, setIsDragging] = useState(false)
  const [showValueTooltip, setShowValueTooltip] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Sincronizar el valor local con el valor del contexto
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value)
    }
  }, [value, isDragging])

  // Obtener el ícono correspondiente al atributo
  const Icon = attributeIcons[name] || Sparkles
  
  // Calcular el color basado en el valor
  const getValueColor = (val: number) => {
    if (val < 30) return "text-red-500 dark:text-red-400"
    if (val < 70) return "text-yellow-500 dark:text-yellow-400"
    return "text-green-500 dark:text-green-400"
  }

  // Obtener la descripción cualitativa basada en el valor
  const getValueDescription = (val: number) => {
    if (val < 30) return valueDescriptions[name].low
    if (val < 70) return valueDescriptions[name].medium
    return valueDescriptions[name].high
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number.parseInt(e.target.value)
    setLocalValue(rawValue)
    
    if (rawValue < min || rawValue > max) {
      setError(`El valor debe estar entre ${min} y ${max}.`)
    } else {
      setError(null)
      // Actualizar en tiempo real para mejor feedback
      updateAttribute(name, rawValue)
    }
  }

  const handleMouseDown = () => {
    setIsDragging(true)
    setShowValueTooltip(true)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
    setShowValueTooltip(false)
    updateAttribute(name, localValue)
  }

  return (
    <div 
      ref={sliderRef}
      className="p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50"
    >
      <div className="flex items-center justify-between mb-3">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-2 cursor-help">
              <div className={clsx(
                "p-1.5 rounded-full transition-all duration-300",
                "bg-blue-100 dark:bg-blue-900/30",
                "group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30"
              )}>
                <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={clsx(
                "text-sm font-medium capitalize", 
                "text-gray-800 dark:text-gray-200",
                "group-hover:text-blue-600 dark:group-hover:text-blue-400"
              )}>
                {label || name}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent side={isMobile ? "bottom" : "right"} className="p-4 w-72">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{label || name}</h4>
              <p className="text-sm text-muted-foreground">{attributeDescriptions[name]}</p>
              <div className="pt-1">
                <div className="text-xs font-medium">Nivel actual: 
                  <span className={getValueColor(localValue)}> {localValue}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{getValueDescription(localValue)}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <TooltipProvider>
          <Tooltip open={showValueTooltip || undefined}>
            <TooltipTrigger asChild>
              <span
                className={clsx(
                  "text-xs font-mono px-2 py-1 rounded-md transition-all duration-300",
                  "bg-gray-100 dark:bg-gray-700",
                  getValueColor(localValue)
                )}
              >
                {localValue}
              </span>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="py-2 px-2 text-xs bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-md rounded-[10px]"
            >
              {getValueDescription(localValue)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onMouseLeave={() => isDragging && setShowValueTooltip(false)}
          onMouseEnter={() => isDragging && setShowValueTooltip(true)}
          className={clsx(
            "w-full h-2 appearance-none bg-transparent",
            "[&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2",
            "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:dark:bg-blue-400",
            "[&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:hover:bg-blue-600 [&::-webkit-slider-thumb]:active:bg-blue-700",
            "[&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95",
            "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:shadow-lg",
            "[&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2",
            "[&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:dark:bg-gray-700",
            "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:dark:bg-blue-400",
            "[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:shadow-lg",
            "[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all",
            "[&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:hover:bg-blue-600",
            "[&::-moz-range-thumb]:active:bg-blue-700 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:active:scale-95",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(localValue / max) * 100}%, #e5e7eb ${(localValue / max) * 100}%, #e5e7eb 100%)`,
            WebkitAppearance: 'none',
            height: '8px',
            borderRadius: '9999px',
            outline: 'none',
          }}
        />
        
        {/* Marcas de valor con etiquetas */}
        <div className="flex justify-between mt-1 px-0.5">
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{min}</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">25</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">50</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">75</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{max}</span>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
