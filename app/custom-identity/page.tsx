"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useInnerLab } from "@/context/innerlab-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CustomIdentityPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("Sparkles") // Valor por defecto
  const { addIdentity } = useInnerLab()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description) {
      // TODO: Añadir validación y feedback al usuario
      alert("Por favor, completa todos los campos.")
      return
    }

    const newIdentity = {
      name,
      description,
      icon,
    }

    addIdentity(newIdentity)

    // Opcional: Redirigir al usuario a la página principal
    router.push("/")
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crea tu Propia Identidad</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre de la Identidad</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: El Filósofo"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Una breve descripción de esta identidad."
                required
              />
            </div>
            <div>
              <Label htmlFor="icon">Icono (Nombre de Lucide Icon)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="Ej: Brain"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Usa un nombre de icono de{" "}
                <a
                  href="https://lucide.dev/icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Lucide Icons
                </a>
                .
              </p>
            </div>
            <div className="flex justify-between">
              <Button type="submit">Guardar Identidad</Button>
              <Button variant="ghost" asChild>
                <Link href="/">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}