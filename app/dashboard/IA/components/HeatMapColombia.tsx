"use client"

import { MLScoringResponse, ZoneMLResult } from "@/app/schemas/ml"
import Image from "next/image"

interface Props {
  data: MLScoringResponse | null
  onZoneSelect: (zone: ZoneMLResult) => void
  activeColor: string
}

// Posiciones visuales 
const ZONE_POSITIONS: Record<string, { x: number; y: number; label: string }> = {
  "0":  { x: 30, y: 44, label: "ANT" }, 
  "1":  { x: 40, y: 13, label: "ATL" }, 
  "2":  { x: 30, y: 20, label: "BOL" }, 
  "3":  { x: 37, y: 50, label: "CAL" }, 
  "4":  { x: 47, y: 54, label: "CUN" }, 
  "5":  { x: 38, y: 65, label: "HUI" }, 
  "6":  { x: 33, y: 51, label: "RIS" }, 
  "7":  { x: 53, y: 38, label: "SAN" }, 
  "8":  { x: 24, y: 56, label: "VAL" }, 
  "9":  { x: 26, y: 59, label: "VA2" },
  "10": { x: 22, y: 54, label: "VA3" },
  "11": { x: 28, y: 62, label: "VA4" },
  "12": { x: 20, y: 58, label: "VA5" },
}

export function HeatMapColombia({ data, onZoneSelect, activeColor }: Props) {
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
        const pos = ZONE_POSITIONS[zone.zone_code]
        if (!pos) return null

        return (
          <button
            key={zone.zone_code}
            onClick={() => onZoneSelect(zone)}
            className="absolute z-30 group"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Label al hacer hover (Más visible) */}
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-700 font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl">
              {pos.label}
            </span>

            {/* Ping Intensificado */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: zone.color_code }}
            />

            {/* Dot (Punto central más brillante) */}
            <span
              className="relative block rounded-full border-2 border-white/80 transition-all duration-300 group-hover:scale-150"
              style={{
                width: 16, // Ligeramente más grande
                height: 16,
                backgroundColor: zone.color_code,
                boxShadow: `0 0 15px ${zone.color_code}, 0 0 5px white`,
              }}
            />
          </button>
        )
      })}

      {/* Estado vacío */}
      {!data && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-400 rounded-full animate-spin mb-4" />
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
            Esperando Inferencia
          </p>
        </div>
      )}

    </div>
  )
}