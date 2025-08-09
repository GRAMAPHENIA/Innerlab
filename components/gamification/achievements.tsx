import { useState } from "react"
import { useGamification } from "@/context/gamification-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Achievements() {
  const { achievements, points, level, challenges } = useGamification()
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === "all") return true
    if (filter === "completed") return achievement.completed
    if (filter === "pending") return !achievement.completed
    return true
  })

  const completedCount = achievements.filter((a) => a.completed).length
  const totalCount = achievements.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Tu Progreso</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1">
              Nivel {level}
            </Badge>
            <span className="text-sm text-muted-foreground">{points} puntos</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount} de {totalCount} logros
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="flex space-x-2">
        <Badge 
          onClick={() => setFilter("all")} 
          className={`cursor-pointer ${filter === "all" ? "bg-primary" : "bg-secondary"}`}
        >
          Todos
        </Badge>
        <Badge 
          onClick={() => setFilter("completed")} 
          className={`cursor-pointer ${filter === "completed" ? "bg-primary" : "bg-secondary"}`}
        >
          Completados
        </Badge>
        <Badge 
          onClick={() => setFilter("pending")} 
          className={`cursor-pointer ${filter === "pending" ? "bg-primary" : "bg-secondary"}`}
        >
          Pendientes
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id} className={achievement.completed ? "border-green-500" : "border-gray-200"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                {achievement.icon && <span className="text-2xl">{achievement.icon}</span>}
              </div>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={achievement.completed ? "default" : "outline"}>
                {achievement.completed ? "Completado" : "Pendiente"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-8">Desafíos</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className={challenge.completed ? "border-green-500" : "border-gray-200"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <Badge variant="outline">{challenge.points} pts</Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={challenge.completed ? "default" : "outline"}>
                {challenge.completed ? "Completado" : "Pendiente"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}