"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  // Pasar la función de estado inicial a useState para que la lógica solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Obtener de local storage por clave
      const item = window.localStorage.getItem(key)
      // Parsear el JSON almacenado o, si no existe, usar initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Si hay un error, también usar initialValue
      console.error(error)
      return initialValue
    }
  })

  // useEffect para actualizar localStorage cuando el estado cambia
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      // Una implementación más avanzada podría manejar el error
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}