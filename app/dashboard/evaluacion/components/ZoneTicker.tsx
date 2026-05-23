// app/evaluacion/components/ZoneTicker.tsx
"use client";

import { useEvaluacionStore } from "@/app/lib/useEvaluacionStore";
import { MapPin, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export function ZoneTicker() {
  // 1. Extraemos las zonas y el estado de selección directamente del store
  const { zones, selectedZone, setSelectedZone } = useEvaluacionStore();
  
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // 2. Creamos el arreglo duplicado para el efecto de scroll infinito
  // Multiplicamos las zonas para asegurar que cubran todo el ancho de la pantalla
  const doubled = [...zones, ...zones, ...zones, ...zones];

  // 3. Manejadores de interacción
  // Convertimos el valor a string usando String() para que TypeScript y tu store estén felices
  const handleSelect = (zone_code: string | number) => {
    setSelectedZone(String(zone_code)); 
    setPaused(true); 
  };

  const handleResume = () => {
    setPaused(false);
    // Nota: Si quieres que la zona se deseleccione al reanudar, 
    // podrías agregar: setSelectedZone(null); aquí.
  };

  // Protección extra: Si no hay zonas (aunque page.tsx ya lo valida), no renderizamos nada
  if (!zones || zones.length === 0) return null;

  return (
    <div className="border-b border-zinc-900 bg-zinc-950 flex flex-col">
      {/* TICKER STRIP */}
      <div className="flex items-stretch h-9 overflow-hidden">
        {/* Label izquierdo */}
        <div className="flex items-center gap-2 px-4 border-r border-zinc-900 bg-zinc-900/60 flex-shrink-0 z-20 relative">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
            Zonas
          </span>
        </div>

        {/* Track animado */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fade izquierdo */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          {/* Fade derecho */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex h-full w-max"
            style={{
              animation: paused ? "none" : "ticker-scroll 35s linear infinite",
            }}
          >
            {doubled.map((z, i) => (
              <button
                // Usamos el index en la key porque los códigos se repiten en el arreglo 'doubled'
                key={`${z.zone_code}-${i}`}
                onClick={() => handleSelect(z.zone_code)}
                className={`flex items-center gap-2.5 px-5 h-full border-r border-zinc-900/60 flex-shrink-0 transition-colors duration-150 cursor-pointer ${
                  selectedZone === z.zone_code
                    ? "bg-blue-500/10"
                    : "hover:bg-zinc-900/60"
                }`}
              >
                <MapPin
                  className={`w-3 h-3 flex-shrink-0 ${
                    selectedZone === z.zone_code ? "text-blue-400" : "text-zinc-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    selectedZone === z.zone_code ? "text-blue-400" : "text-zinc-400"
                  }`}
                >
                  {z.zone_name ?? `Zona ${z.zone_code}`}
                </span>
                <span className="text-[11px] font-mono text-zinc-600 whitespace-nowrap">
                  #{z.zone_code}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Botón pause/play */}
        <button
          onClick={paused ? handleResume : () => setPaused(true)}
          className="flex items-center gap-2 px-4 border-l border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 transition-colors flex-shrink-0 text-zinc-500 hover:text-zinc-300 z-20 relative"
        >
          {paused ? (
            <Play className="w-3.5 h-3.5" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* PREVIEW BAR — aparece al seleccionar */}
      {paused && selectedZone !== null && (
        <div className="flex items-center gap-4 px-4 py-2 border-t border-zinc-900 bg-zinc-950/80 animate-in slide-in-from-top-1 duration-200 flex-wrap">
          <div>
            <p className="text-xs font-medium text-zinc-200">
              {zones.find(z => z.zone_code === selectedZone)?.zone_name ?? `Zona ${selectedZone}`}
            </p>
            <p className="text-[11px] text-zinc-500">Zona {selectedZone} · análisis activo</p>
          </div>
          <div className="w-px h-6 bg-zinc-800 flex-shrink-0" />
          <p className="text-[11px] text-zinc-500">
            Selecciona el modelo en el panel derecho para ver la evaluación completa
          </p>
          <button
            onClick={handleResume}
            className="ml-auto flex items-center gap-1.5 text-[11px] text-blue-400 border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors rounded-lg px-3 py-1.5"
          >
            <Play className="w-3 h-3" />
            Reanudar ticker
          </button>
        </div>
      )}
    </div>
  );
}