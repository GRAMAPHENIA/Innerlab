"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { InnerLabContextType, InnerLabState } from "@/types"
import { validateRange } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"

const InnerLabContext = createContext<InnerLabContextType | undefined>(undefined)

const initialState: InnerLabState = {
  selectedIdentity: null,
  attributes: {
    creativity: 0,
    logic: 0,
    intuition: 0,
    focus: 0,
  },
  traits: {
    analytical: false,
    innovative: false,
    collaborative: false,
    independent: false,
  },
}

export function InnerLabProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useLocalStorage<InnerLabState>(
    "innerlab-state",
    initialState,
  )

  const selectIdentity = (identity: string) => {
    setState((prev) => ({ ...prev, selectedIdentity: identity }))
  }

  const updateAttribute = (name: string, value: number) => {
    const { value: validatedValue } = validateRange(value, 0, 100)
    setState((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [name]: validatedValue },
    }))
  }

  const toggleTrait = (name: string) => {
    setState((prev) => ({
      ...prev,
      traits: { ...prev.traits, [name]: !prev.traits[name] },
    }))
  }

  const reset = () => {
    setState(initialState)
  }

  return (
    <InnerLabContext.Provider
      value={{
        ...state,
        selectIdentity,
        updateAttribute,
        toggleTrait,
        reset,
      }}
    >
      {children}
    </InnerLabContext.Provider>
  )
}

export function useInnerLab() {
  const context = useContext(InnerLabContext)
  if (context === undefined) {
    throw new Error("useInnerLab must be used within an InnerLabProvider")
  }
  return context
}
