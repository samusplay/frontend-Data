"use client"

import { MLScoringResponse, ZoneMLResult } from "@/app/schemas/ml"
import Image from "next/image"

interface Props {
  data: MLScoringResponse | null
  onZoneSelect: (zone: ZoneMLResult) => void
  activeColor: string // <--- Nuevo: El color de la estrategia seleccionada
}

// Samuel: Ajusta estas coordenadas para que las pepas caigan en los sitios reales
const ZONE_COORDINATES: Record<string, { x: string; y: string }> = {
  "0": { x: "41%", y: "36%" }, // Antioquia / Medellín
  "1": { x: "46%", y: "10%" }, // Atlántico / Barranquilla
  "4": { x: "50%", y: "52%" }, // Cundinamarca / Bogotá
  "5": { x: "37%", y: "65%" }, // Valle del Cauca / Cali
  "8": { x: "53%", y: "30%" }, // Santander / Bucaramanga
  "9": { x: "45%", y: "20%" }, // Bolivar / Cartagena
};


export function HeatMapColombia({ data, onZoneSelect, activeColor }: Props) {
  return (
    <div className="relative w-full aspect-[3/4] max-h-[650px] flex items-center justify-center bg-zinc-950 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
      
      {/* Resplandor de fondo dinámico */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{ background: `radial-gradient(circle at center, ${activeColor} 0%, transparent 70%)` }}
      />

      {/* Mapa resaltado */}
      <div className="relative w-full h-full p-10 z-10">
        <Image 
          src="/colombia.png" 
          alt="Mapa"
          fill
          className="object-contain opacity-70 transition-all duration-700"
          // Aplicamos brillo azulado al mapa base para que se vea "cyber"
          style={{ 
            filter: `drop-shadow(0 0 20px ${activeColor}66) brightness(1.2) contrast(1.1)` 
          }}
        />
      </div>

      {/* Pepas Dinámicas */}
      {data?.data.map((zone) => {
        const coords = ZONE_COORDINATES[zone.zone_code] || { x: "50%", y: "50%" };
        return (
          <button
            key={zone.zone_code}
            onClick={() => onZoneSelect(zone)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-700 z-30"
            style={{ left: coords.x, top: coords.y }}
          >
            {/* El anillo exterior cambia con la estrategia */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: activeColor }}
            />
            
            {/* La burbuja principal usa el color del score (Semáforo) o de la estrategia */}
            <div 
              className="relative rounded-full border border-white/50 shadow-xl transition-all group-hover:scale-150"
              style={{ 
                width: '14px', 
                height: '14px', 
                backgroundColor: activeColor, // Aquí puedes usar zone.color_code si quieres semáforo
                boxShadow: `0 0 15px ${activeColor}`
              }}
            />
          </button>
        );
      })}
    </div>
  )
}