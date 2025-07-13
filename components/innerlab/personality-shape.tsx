import React from 'react';

interface PersonalityShapeProps {
  attributes: Record<string, number>;
  className?: string;
}

export function PersonalityShape({ attributes, className = '' }: PersonalityShapeProps) {
  // Valores predeterminados si no se proporcionan atributos
  const {
    analytical = 0,
    creative = 0,
    practical = 0,
    social = 0,
    leadership = 0,
    adaptability = 0,
  } = attributes;

  // Normalizar valores al rango 0-100
  const normalize = (value: number) => Math.min(100, Math.max(0, value));

  const points = [
    { x: 50, y: 0 }, // analytical (top)
    { x: 100, y: 50 }, // creative (right)
    { x: 75, y: 100 }, // practical (bottom-right)
    { x: 25, y: 100 }, // social (bottom-left)
    { x: 0, y: 50 }, // leadership (left)
  ];

  // Calcular puntos basados en los valores de los atributos
  const shapePoints = points
    .map((point, i) => {
      let value = 0;
      switch (i) {
        case 0: value = analytical; break;
        case 1: value = creative; break;
        case 2: value = practical; break;
        case 3: value = social; break;
        case 4: value = leadership; break;
      }
      
      // Calcular la posición del punto basado en el valor del atributo
      const distance = (value / 100) * 50; // 50 es el radio máximo
      const angle = (i * 72 - 90) * (Math.PI / 180); // Convertir a radianes
      
      return {
        x: 50 + Math.cos(angle) * distance,
        y: 50 + Math.sin(angle) * distance
      };
    })
    .map(p => `${p.x},${p.y}`)
    .join(' ');

  return (
    <div className={`relative w-full h-64 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Líneas de la forma */}
        <polygon
          points={shapePoints}
          className="fill-blue-50 dark:fill-blue-900/20 stroke-blue-200 dark:stroke-blue-800"
          strokeWidth="0.5"
        />
        
        {/* Puntos de los atributos */}
        {points.map((point, i) => {
          let label = '';
          switch (i) {
            case 0: label = 'Analítico'; break;
            case 1: label = 'Creativo'; break;
            case 2: label = 'Práctico'; break;
            case 3: label = 'Social'; break;
            case 4: label = 'Líder'; break;
          }
          
          return (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="2"
                className="fill-blue-500 dark:fill-blue-400"
              />
              <text
                x={point.x}
                y={point.y - 5}
                textAnchor="middle"
                className="text-[6px] fill-gray-600 dark:fill-gray-300"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
