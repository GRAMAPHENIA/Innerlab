// Tipos principales para la aplicación InnerLab
export interface Identity {
  name: string
  description: string
  icon: string
}

export interface Attribute {
  name: string
  value: number
  min: number
  max: number
}

export interface Trait {
  name: string
  enabled: boolean
}

export interface InnerLabState {
  selectedIdentity: string | null
  attributes: Record<string, number>
  traits: Record<string, boolean>
}

export interface InnerLabContextType extends InnerLabState {
  selectIdentity: (identity: string) => void
  updateAttribute: (name: string, value: number) => void
  toggleTrait: (name: string) => void
  reset: () => void
}
