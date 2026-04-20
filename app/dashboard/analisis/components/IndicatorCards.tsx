import { IndicatorsResponse } from "@/app/schemas/analytics";

interface IndicatorCardsProps {
  data: IndicatorsResponse;
}

export default function IndicatorCards({ data }: IndicatorCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      
      {/* 1. Volumen Total */}
      <div className="p-5 border rounded-xl border-zinc-800 bg-zinc-900/80 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
        </div>
        <p className="text-sm font-semibold text-zinc-400">Volumen Total</p>
        <p className="mt-2 text-4xl font-bold text-white">{data.volumen_total.toLocaleString()}</p>
        <p className="mt-2 text-xs text-zinc-500 font-medium">Registros analizados</p>
      </div>

      {/* 2. Cobertura Territorial */}
      <div className="p-5 border rounded-xl border-zinc-800 bg-zinc-900/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p className="text-sm font-semibold text-zinc-400">Cobertura Territorial</p>
        <p className="mt-2 text-4xl font-bold text-white">{data.cobertura_territorial}</p>
        <p className="mt-2 text-xs text-zinc-500 font-medium">Zonas únicas</p>
      </div>

      {/* 3. Zona Top */}
      <div className="p-5 border rounded-xl border-zinc-800 bg-zinc-900/80 shadow-lg relative overflow-hidden group hover:border-purple-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <p className="text-sm font-semibold text-zinc-400">Mayor Concentración</p>
        <p className="mt-2 text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 truncate" title={data.zona_top}>{data.zona_top}</p>
        <p className="mt-2 text-xs text-zinc-500 font-medium">Zona dominante</p>
      </div>

      {/* 4. Densidad Promedio */}
      <div className="p-5 border rounded-xl border-zinc-800 bg-zinc-900/80 shadow-lg relative overflow-hidden group hover:border-orange-500/50 transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <p className="text-sm font-semibold text-zinc-400">Densidad Promedio</p>
        <p className="mt-2 text-4xl font-bold text-white">{data.densidad_promedio}</p>
        <p className="mt-2 text-xs text-zinc-500 font-medium">Registros por zona</p>
      </div>

    </div>
  );
}