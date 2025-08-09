// Exportamos todos los componentes relacionados con la gamificación

export { Achievements } from "./achievements"
export { Challenges } from "./challenges"

// Componente principal que combina todos los elementos de gamificación
import { Achievements } from "./achievements"
import { Challenges } from "./challenges"

export function GamificationDashboard() {
  return (
    <div className="space-y-12">
      <Achievements />
      <Challenges />
    </div>
  )
}