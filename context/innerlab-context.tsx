"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { InnerLabContextType, InnerLabState } from "@/types"

const InnerLabContext = createContext<InnerLabContextType | undefined>(undefined)

const initialState: InnerLabState = {
  selectedIdentity: null,
  attributes: {
    creativity: 50,
    logic: 50,
    intuition: 50,
    focus: 50,
  },
  traits: {
    analytical: false,
    innovative: false,
    collaborative: false,
    independent: false,
  },
}

export function InnerLabProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InnerLabState>(initialState)

  const selectIdentity = (identity: string) => {
    setState((prev) => ({ ...prev, selectedIdentity: identity }))
  }

  const updateAttribute = (name: string, value: number) => {
    setState((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [name]: value },
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
