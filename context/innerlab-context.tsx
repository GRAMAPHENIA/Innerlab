"use client"

import { createContext, useContext, type ReactNode } from "react"
import type {
  InnerLabContextType,
  InnerLabState,
  AttributeName,
  TraitName,
  Identity,
} from "@/types"
import { validateRange } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"

const InnerLabContext = createContext<InnerLabContextType | undefined>(undefined)

const initialState: InnerLabState = {
  identities: [],
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

  const addIdentity = (identity: Identity) => {
    setState((prev) => ({
      ...prev,
      identities: [...prev.identities, identity],
    }))
  }

  const selectIdentity = (identity: string) => {
    setState((prev) => ({ ...prev, selectedIdentity: identity }))
  }

  const updateAttribute = (name: AttributeName, value: number) => {
    const { value: validatedValue } = validateRange(value, 0, 100)
    setState((prev) => ({
      ...prev,
      attributes: { ...prev.attributes, [name]: validatedValue },
    }))
  }

  const toggleTrait = (name: TraitName) => {
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
        addIdentity,
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
