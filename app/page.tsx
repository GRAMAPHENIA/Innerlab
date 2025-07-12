"use client"
import { useState } from 'react';
import { InnerLab } from "@/components/innerlab"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Settings, Users, LayoutDashboard } from "lucide-react"

// Componente de Modal
const ConfigModal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Configuración</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-4">
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-default">
            <LayoutDashboard className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div className="absolute left-0 top-full mt-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Laboratorio de configuración de identidad creativa
            <div className="absolute -top-1 left-3 w-3 h-3 transform rotate-45 bg-gray-900"></div>
          </div>
        </div>
        
        <div className="z-40">
          <ThemeToggle />
        </div>
      </div>

      {/* Barra de navegación flotante en la parte inferior */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
          <div className="relative group">
            <button 
              onClick={() => setIsIdentityOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label="Identidad creativa"
            >
              <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Identidad
              <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
            </span>
          </div>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="relative group">
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
              aria-label="Configuración"
            >
              <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Ajustes
              <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
            </span>
          </div>
        </div>
      </nav>

      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto pt-16 pb-24">
        <InnerLab>
          {/* Configuración en modal */}
          <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna de sliders */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Atributos</h3>
                <div className="space-y-6">
                  <InnerLab.Slider name="creativity" label="Creatividad" />
                  <InnerLab.Slider name="logic" label="Lógica" />
                  <InnerLab.Slider name="intuition" label="Intuición" />
                  <InnerLab.Slider name="focus" label="Enfoque" />
                </div>
              </div>

              {/* Columna de toggles */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Rasgos</h3>
                <div className="space-y-4">
                  <InnerLab.Toggle name="analytical" label="Analítico" />
                  <InnerLab.Toggle name="innovative" label="Innovador" />
                  <InnerLab.Toggle name="collaborative" label="Colaborativo" />
                  <InnerLab.Toggle name="independent" label="Independiente" />
                </div>
              </div>
            </div>
          </ConfigModal>

          {/* Modal de Identidad Creativa */}
          <ConfigModal isOpen={isIdentityOpen} onClose={() => setIsIdentityOpen(false)}>
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Identidad Creativa</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <InnerLab.Option name="explorer" />
                <InnerLab.Option name="architect" />
                <InnerLab.Option name="artist" />
                <InnerLab.Option name="innovator" />
                <InnerLab.Option name="collaborator" />
                <InnerLab.Option name="strategist" />
                <InnerLab.Option name="catalyst" />
                <InnerLab.Option name="empath" />
              </div>
            </div>
          </ConfigModal>

          {/* Vista previa */}
          <InnerLab.Preview />
        </InnerLab>
        </div>
      </div>
    </div>
  )
}
