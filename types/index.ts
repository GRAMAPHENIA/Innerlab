// Tipos principales para la aplicación InnerLab

// Definimos los nombres de los atributos y rasgos como tipos literales
// para evitar errores de tipeo y mejorar el autocompletado.
export type AttributeName = "creativity" | "logic" | "intuition" | "focus"
export type TraitName =
  | "analytical"
  | "innovative"
  | "collaborative"
  | "independent"

export interface Identity {
  name: string
  description: string
  icon: string
}

export interface Attribute {
  name: AttributeName
  value: number
  min: number
  max: number
}

export interface Trait {
  name: TraitName
  enabled: boolean
}

export interface InnerLabState {
  identities: Identity[]
  selectedIdentity: string | null
  attributes: Record<AttributeName, number>
  traits: Record<TraitName, boolean>
}

export interface InnerLabContextType extends InnerLabState {
  addIdentity: (identity: Identity) => void
  selectIdentity: (identity: string) => void
  updateAttribute: (name: AttributeName, value: number) => void
  toggleTrait: (name: TraitName) => void
  reset: () => void
}
