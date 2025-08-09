import { useState } from "react"
import { useGamification } from "@/context/gamification-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function Challenges() {
  const { challenges, completeChallenge, points } = useGamification()
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter === "all") return true
    if (filter === "completed") return challenge.completed
    if (filter === "pending") return !challenge.completed
    return true
  })

  const completedCount = challenges.filter((c) => c.completed).length
  const totalCount = challenges.length
  const progressPercentage = (completedCount / totalCount) * 100
  const totalPointsPossible = challenges.reduce((sum, challenge) => sum + challenge.points, 0)
  const earnedPoints = challenges
    .filter((challenge) => challenge.completed)
    .reduce((sum, challenge) => sum + challenge.points, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Desafíos</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1">
              {earnedPoints} / {totalPointsPossible} pts
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount} de {totalCount} desafíos completados
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

      <div className="grid gap-4 md:grid-cols-2">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className={challenge.completed ? "border-green-500" : "border-gray-200"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <Badge variant="outline">{challenge.points} pts</Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Badge variant={challenge.completed ? "default" : "outline"}>
                  {challenge.completed ? "Completado" : "Pendiente"}
                </Badge>
                {!challenge.completed && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => completeChallenge(challenge.id)}
                  >
                    Completar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}