"use client";
import { useState } from "react";
import { InnerLab } from "@/components/innerlab";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Settings,
  Fingerprint,
  LayoutDashboard,
  SlidersHorizontal,
  ListChecks,
  PlusCircle,
  Trophy,
} from "lucide-react";
import Link from "next/link"
import type { Identity } from "@/types"
import { IdentityList } from "@/components/innerlab/identity-list";

// Componente de Modal
const ConfigModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  const handleAccept = () => {
    // Aquí podrías agregar lógica adicional antes de cerrar el modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800/50 rounded-xl backdrop-blur-xl p-4 max-w-2xl w-full flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Configuración
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white p-1 -mr-2"
            aria-label="Cerrar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mb-3">{children}</div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);
  const [isAttributesOpen, setIsAttributesOpen] = useState(false);
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);
  
  const predefinedIdentities: Identity[] = [
    { name: "explorer", description: "Descubre nuevos territorios", icon: "Compass" },
    { name: "architect", description: "Construye estructuras sólidas", icon: "Building2" },
    { name: "artist", description: "Expresa creatividad pura", icon: "Palette" },
    { name: "innovator", description: "Genera ideas revolucionarias", icon: "Lightbulb" },
    { name: "collaborator", description: "Conecta y une equipos", icon: "Users" },
    { name: "strategist", description: "Planifica el futuro", icon: "Target" },
    { name: "catalyst", description: "Acelera el cambio", icon: "Zap" },
    { name: "empath", description: "Comprende profundamente", icon: "Heart" },
  ]

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <InnerLab>
        <div className="flex-col">
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
                  <Fingerprint className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Identidad
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
                </span>
              </div>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="relative group">
                <button
                  onClick={() => setIsAttributesOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  aria-label="Atributos"
                >
                  <SlidersHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Atributos
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
                </span>
              </div>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="relative group">
                <button
                  onClick={() => setIsTraitsOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  aria-label="Rasgos"
                >
                  <ListChecks className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Rasgos
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
                </span>
              </div>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              {/* Botón de Gamificación */}
              <div className="relative group">
                <Link href="/gamification">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-label="Gamificación"
                  >
                    <Trophy className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </Link>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Gamificación
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></span>
                </span>
              </div>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>

              <div className="relative group">
                <button
                  onClick={() => setIsConfigOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  aria-label="Ajustes"
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

          <div className="flex-1 overflow-y-auto">
            <div className="pt-16">
              {/* Configuración en modal */}
              {/* Modal de Atributos */}
              <ConfigModal
                isOpen={isAttributesOpen}
                onClose={() => setIsAttributesOpen(false)}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Atributos
                  </h2>
                  <div className="space-y-4">
                    <InnerLab.Slider name="creativity" label="Creatividad" />
                    <InnerLab.Slider name="logic" label="Lógica" />
                    <InnerLab.Slider name="intuition" label="Intuición" />
                    <InnerLab.Slider name="focus" label="Enfoque" />
                  </div>
                </div>
              </ConfigModal>

              {/* Modal de Rasgos */}
              <ConfigModal
                isOpen={isTraitsOpen}
                onClose={() => setIsTraitsOpen(false)}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Rasgos
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    <InnerLab.Toggle name="analytical" label="Analítico" />
                    <InnerLab.Toggle name="innovative" label="Innovador" />
                    <InnerLab.Toggle
                      name="collaborative"
                      label="Colaborativo"
                    />
                    <InnerLab.Toggle
                      name="independent"
                      label="Independiente"
                    />
                  </div>
                </div>
              </ConfigModal>

              {/* Modal de Ajustes */}
              <ConfigModal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
              >
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                    Ajustes
                  </h2>
                  <div>
                    <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Tema
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">
                        Modo oscuro
                      </span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </ConfigModal>

              {/* Modal de Identidad Creativa */}
              <ConfigModal
                isOpen={isIdentityOpen}
                onClose={() => setIsIdentityOpen(false)}
              >
                <IdentityList 
                  predefinedIdentities={predefinedIdentities}
                  onClose={() => setIsIdentityOpen(false)}
                />
              </ConfigModal>

              {/* Vista previa - Use InnerLab.Preview instead of directly importing Preview */}
              <InnerLab.Preview />
            </div>
          </div>
        </div>
      </InnerLab>
    </div>
  );
}