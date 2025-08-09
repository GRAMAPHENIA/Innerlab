"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Tipos para el sistema de gamificación
interface Achievement {
  id: string
  title: string
  description: string
  completed: boolean
  icon?: string
}

interface Challenge {
  id: string
  title: string
  description: string
  completed: boolean
  points: number
}

interface GamificationState {
  points: number
  achievements: Achievement[]
  challenges: Challenge[]
  level: number
}

interface GamificationContextType extends GamificationState {
  completeAchievement: (id: string) => void
  completeChallenge: (id: string) => void
  addPoints: (points: number) => void
  resetProgress: () => void
}

const initialState: GamificationState = {
  points: 0,
  achievements: [
    {
      id: "first-identity",
      title: "Primera Identidad",
      description: "Crea tu primera identidad personalizada",
      completed: false,
      icon: "🎭"
    },
    {
      id: "trait-master",
      title: "Maestro de Rasgos",
      description: "Activa todos los rasgos en una identidad",
      completed: false,
      icon: "⭐"
    },
    {
      id: "balanced",
      title: "Equilibrado",
      description: "Crea una identidad con todos los atributos al 50%",
      completed: false,
      icon: "⚖️"
    }
  ],
  challenges: [
    {
      id: "create-three-identities",
      title: "Coleccionista",
      description: "Crea tres identidades diferentes",
      completed: false,
      points: 100
    },
    {
      id: "max-creativity",
      title: "Genio Creativo",
      description: "Crea una identidad con creatividad al máximo",
      completed: false,
      points: 50
    }
  ],
  level: 1
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<GamificationState>(
    "gamification-state",
    initialState
  )

  const completeAchievement = (id: string) => {
    setState((prev) => ({
      ...prev,
      achievements: prev.achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, completed: true } : achievement
      ),
    }))
  }

  const completeChallenge = (id: string) => {
    const challenge = state.challenges.find((c) => c.id === id && !c.completed)
    
    if (challenge) {
      setState((prev) => ({
        ...prev,
        points: prev.points + challenge.points,
        challenges: prev.challenges.map((c) =>
          c.id === id ? { ...c, completed: true } : c
        ),
      }))
    }
  }

  const addPoints = (points: number) => {
    setState((prev) => ({
      ...prev,
      points: prev.points + points,
      // Actualizar nivel basado en puntos (1 nivel por cada 100 puntos)
      level: Math.floor((prev.points + points) / 100) + 1,
    }))
  }

  const resetProgress = () => {
    setState(initialState)
  }

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        completeAchievement,
        completeChallenge,
        addPoints,
        resetProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}