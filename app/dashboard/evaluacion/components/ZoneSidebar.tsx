"use client";

import { useEvaluacionStore } from "@/app/lib/useEvaluacionStore";
import { ChevronRight, MapPin } from "lucide-react";


export function ZoneSidebar() {
  const { zones, selectedZone, setSelectedZone } = useEvaluacionStore();

  return (
    <aside className="w-[320px] border-r border-zinc-900 flex flex-col bg-zinc-950/50 h-full">
      <div className="p-6 border-b border-zinc-900 bg-zinc-950/80">
        <h2 className="text-sm font-bold traacking-wider text-zinc-200">SELECCIÓN DE ZONA</h2>
        <p className="text-[11px] text-zinc-500 mt-1 uppercase">Elige un área para auditar</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {zones.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-500">
            <div className="w-5 h-5 border-2 border-zinc-800 border-t-blue-500 rounded-full animate-spin mb-3" />
            <p className="text-[11px] font-mono animate-pulse">Cargando inventario...</p>
          </div>
        ) : (
          zones.map((z) => {
            const isSelected = selectedZone === z.zone_code;
            return (
              <button
                key={z.zone_code}
                onClick={() => setSelectedZone(z.zone_code)}
                className={`group w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                    : "bg-zinc-900/20 border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-zinc-600'}`} />
                  <div className="text-left">
                    <p className="text-[10px] font-mono opacity-50">#{z.zone_code}</p>
                    <p className="text-xs font-medium truncate">{z.zone_name || "Sin nombre"}</p>
                  </div>
                </div>
                {isSelected && <ChevronRight className="w-4 h-4 animate-in slide-in-from-left-2" />}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}