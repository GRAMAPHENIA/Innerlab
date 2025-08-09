"use client"

import { GamificationDashboard } from "@/components/gamification"

export default function GamificationPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Sistema de Gamificación</h1>
      <GamificationDashboard />
    </main>
  )
}