
"use client"

import { MLScoringResponse, ZoneMLResult } from "@/app/schemas/ml"
import Image from "next/image"

interface Props {
  data: MLScoringResponse | null
  onZoneSelect: (zone: ZoneMLResult) => void
  activeColor: string
  error?: string | null
}

// Posiciones visuales base en el mapa
const BASE_POSITIONS = [
  { x: 30, y: 44, label: "ANT" }, // 0
  { x: 40, y: 13, label: "ATL" }, // 1
  { x: 30, y: 20, label: "BOL" }, // 2
  { x: 37, y: 50, label: "CAL" }, // 3
  { x: 47, y: 54, label: "CUN" }, // 4
  { x: 38, y: 65, label: "HUI" }, // 5
  { x: 33, y: 51, label: "RIS" }, // 6
  { x: 53, y: 38, label: "SAN" }, // 7
  { x: 24, y: 56, label: "VAL" }, // 8
  { x: 26, y: 59, label: "VA2" }, // 9
  { x: 22, y: 54, label: "VA3" }, // 10
  { x: 28, y: 62, label: "VA4" }, // 11
  { x: 20, y: 58, label: "VA5" }, // 12
]

function getPositionForZone(zoneCode: string) {
    if (!zoneCode) return BASE_POSITIONS[0];
    
    // Si viene "0", "1", "2"
    if (!isNaN(Number(zoneCode))) {
        return BASE_POSITIONS[Number(zoneCode) % BASE_POSITIONS.length];
    }
    
    // Si viene "ZONA-1", extraemos el número
    const match = zoneCode.match(/\d+/);
    if (match) {
        return BASE_POSITIONS[Number(match[0]) % BASE_POSITIONS.length];
    }
    
    // Fallback pseudoaleatorio determinista basado en el string para cualquier otro texto
    let hash = 0;
    for (let i = 0; i < zoneCode.length; i++) {
        hash = zoneCode.charCodeAt(i) + ((hash << 5) - hash);
    }
    return BASE_POSITIONS[Math.abs(hash) % BASE_POSITIONS.length];
}

export function HeatMapColombia({ data, onZoneSelect, activeColor, error }: Props) {
  return (
    // 1. Cambio de fondo: de bg-zinc-950 a transparente/ligero para evitar oscuridad
    <div className="relative w-full aspect-square max-h-150 rounded-3xl border border-white/10 overflow-hidden bg-zinc-900/30 shadow-2xl">

      {/* 2. Glow dinámico intensificado (opacity-30 en lugar de 15) */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-30 mix-blend-screen"
        style={{ background: `radial-gradient(circle at center, ${activeColor} 0%, transparent 65%)` }}
      />

      {/* 3. Mapa PNG con filtros de brillo extremo */}
      <div className="absolute inset-0 p-8">
          <Image
            src="/colombia.png"
            alt="Mapa de Colombia"
            fill
            className="object-contain z-10 pointer-events-none select-none transition-all duration-1000"
            style={{
              // Si tu imagen original es muy oscura, esto la iluminará y le dará el tono del activeColor
              filter: `drop-shadow(0 0 25px ${activeColor}88) brightness(2) contrast(1.2) sepia(1) hue-rotate(180deg) saturate(3)`,
              opacity: 0.8
            }}
          />
      </div>

      {/* Puntos por zona */}
      {data?.data.map((zone) => {
        const pos = getPositionForZone(zone.zone_code)
        if (!pos) return null

        return (
          <button
            key={zone.zone_code}
            onClick={() => onZoneSelect(zone)}
            className="absolute z-30 group flex items-center justify-center cursor-pointer hover:z-40"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '48px', // Hit target mucho más grande
              height: '48px',
            }}
          >
            {/* Label al hacer hover (Más visible) */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.5)] z-50 pointer-events-none">
              Haz clic para ver {pos.label}
            </span>

            {/* Ping Intensificado */}
            <span
              className="absolute w-6 h-6 rounded-full animate-ping opacity-60"
              style={{ backgroundColor: zone.color_code }}
            />

            {/* Dot (Punto central visual) */}
            <span
              className="relative block rounded-full border-2 border-white/90 transition-all duration-300 group-hover:scale-[1.8] shadow-xl"
              style={{
                width: 18, 
                height: 18,
                backgroundColor: zone.color_code,
                boxShadow: `0 0 20px ${zone.color_code}, 0 0 8px white`,
              }}
            />
          </button>
        )
      })}

      {/* Estado con error */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/85 backdrop-blur-sm p-6 text-center">
          <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4 animate-bounce">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-red-400 mb-2">Error de Inferencia AI</h4>
          <p className="text-xs text-zinc-400 max-w-xs mb-2 leading-relaxed">
            {error}
          </p>
          <p className="text-[10px] text-zinc-500 max-w-xs mb-6">
            Por favor, revisa el estado del motor de Machine Learning o el archivo de datos cargado.
          </p>
        </div>
      )}

      {/* Estado vacío (no hay datos y no hay error) */}
      {!data && !error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-6 text-center">
          <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-4 animate-pulse">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-zinc-300 mb-2">El mapa está listo</h4>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            Selecciona un algoritmo a la izquierda para ver en el mapa <strong>qué zonas de Colombia tienen el mayor potencial para tu negocio</strong> o cuáles presentan mayores riesgos.
          </p>
        </div>
      )}

    </div>
  )
}