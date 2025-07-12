"use client"
import { useState } from 'react';
import { InnerLab } from "@/components/innerlab"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Settings, Users } from "lucide-react"

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
    <>
      {/* Botón de tema en la esquina superior derecha */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Barra de navegación flotante en la parte inferior */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-gray-200/30 dark:border-gray-700/30">
          <button 
            onClick={() => setIsIdentityOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label="Identidad creativa"
          >
            <Users className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Identidad</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <button 
            onClick={() => setIsConfigOpen(true)}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label="Configuración"
          >
            <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Ajustes</span>
          </button>
        </div>
      </nav>

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
    </>
  )
}
