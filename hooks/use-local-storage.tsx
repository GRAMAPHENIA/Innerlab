"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false)
  
  // Estado para almacenar nuestro valor
  // Siempre inicializar con initialValue para evitar hidratación incorrecta
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Efecto que se ejecuta solo en el cliente después de la hidratación
  useEffect(() => {
    setIsClient(true)
    
    try {
      // Obtener de local storage por clave
      const item = window.localStorage.getItem(key)
      // Parsear el JSON almacenado o, si no existe, usar initialValue
      const value = item ? JSON.parse(item) : initialValue
      setStoredValue(value)
    } catch (error) {
      // Si hay un error, mantener initialValue
      console.error(error)
    }
  }, [key, initialValue])

  // useEffect para actualizar localStorage cuando el estado cambia
  useEffect(() => {
    if (!isClient) return
    
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue, isClient])

  return [storedValue, setStoredValue] as const
}