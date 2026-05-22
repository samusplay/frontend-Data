"use client";

import { getEvaluacionIntegral } from "@/app/actions/evaluacion-integral.actions";
import { getRanking } from "@/app/actions/ranking.actions";
import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { EvaluacionIntegralData } from "@/app/schemas/evaluacion-integral";
import {
    AlertTriangle,
    BrainCircuit,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Info,
    Map,
    MapPin,
    ShieldAlert,
    Target
} from "lucide-react";
import { useEffect, useState } from "react";

export default function EvaluacionIntegralPage() {
  const datasetId = useDatasetStore((state) => state.datasetId);
  
  const [zones, setZones] = useState<{ zone_code: string; zone_name?: string }[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<string>("gradient_boosting");
  
  const [evalData, setEvalData] = useState<EvaluacionIntegralData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar lista de zonas al entrar
  useEffect(() => {
    if (!datasetId) return;
    const fetchZones = async () => {
      const res = await getRanking(datasetId);
      if (res.success && res.data) {
        setZones(res.data);
      }
    };
    fetchZones();
  }, [datasetId]);

  // Cargar evaluación cuando se selecciona una zona
  useEffect(() => {
    if (!datasetId || !selectedZone) return;
    const fetchEval = async () => {
      setLoading(true);
      setErrorMsg("");
      const res = await getEvaluacionIntegral(datasetId, selectedZone, strategy);
      if (res.success && res.data) {
        setEvalData(res.data);
      } else {
        setEvalData(null);
        setErrorMsg(res.error?.message || "Error al obtener la evaluación.");
      }
      setLoading(false);
    };
    fetchEval();
  }, [datasetId, selectedZone, strategy]);

  const isDataOld = (dateString?: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30;
  };

  if (!datasetId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-zinc-500 bg-zinc-950 animate-in fade-in duration-700 rounded-2xl border border-zinc-900">
        <Map className="w-16 h-16 mb-6 opacity-10" />
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <Info className="w-4 h-4 text-blue-400" />
          <p className="text-sm font-medium">Carga un dataset en Ingesta para acceder a la Evaluación Integral.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-zinc-950 text-white overflow-hidden rounded-2xl border border-zinc-900">
      
      {/* Columna Izquierda: Lista de Zonas */}
      <aside className="w-1/3 border-r border-zinc-900 flex flex-col bg-zinc-950/50">

        <div className="p-6 border-b border-zinc-900 bg-zinc-950/80">
          <h2 className="text-lg font-bold tracking-tight">Selección de Zona</h2>
          <p className="text-xs text-zinc-500 mt-1">Elige una zona para evaluar su cruce de datos</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {/* Estado de carga inicial o vacío */}
          {zones.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-500">
              <div className="w-6 h-6 border-2 border-zinc-800 border-t-zinc-500 rounded-full animate-spin mb-3" />
              <p className="text-xs animate-pulse">Cargando inventario de zonas...</p>
            </div>
          ) : (
            zones.map((z) => {
              const isSelected = selectedZone === z.zone_code;
              
              return (
                <button
                  key={z.zone_code}
                  onClick={() => setSelectedZone(z.zone_code)}
                  className={`group w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.07)]"
                      : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Icono dinámico */}
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isSelected ? 'bg-blue-500/20' : 'bg-zinc-800/50 group-hover:bg-zinc-700/50'
                    }`}>
                      <MapPin className={`w-4 h-4 ${
                        isSelected ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-400'
                      }`} />
                    </div>
                    
                    {/* Textos con fallback y truncado automático */}
                    <div className="text-left overflow-hidden">
                      <p className="text-[10px] uppercase tracking-widest font-mono opacity-60 mb-0.5">
                        Cód: {z.zone_code}
                      </p>
                      <p 
                        className="font-semibold text-sm truncate max-w-[150px] 2xl:max-w-[200px]" 
                        title={z.zone_name || `Zona ID: ${z.zone_code}`}
                      >
                        {z.zone_name || `Zona sin nombrar`}
                      </p>
                    </div>
                  </div>
                  
                  {/* Flecha con animación suave */}
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                    isSelected 
                      ? "translate-x-1 text-blue-400" 
                      : "opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5"
                  }`} />
                </button>
              )
            })
          )}

        </div>
      </aside>

      {/* Columna Derecha: Tarjetas de Evaluación */}
      <main className="w-2/3 p-8 flex flex-col bg-zinc-950/80 relative overflow-y-auto custom-scrollbar">
        {!selectedZone ? (
           <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-30">
             <Target className="w-16 h-16 text-zinc-600" />
             <p className="text-xs uppercase font-bold tracking-[0.3em] text-center text-zinc-500">Selecciona una zona a la izquierda</p>
           </div>
        ) : loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
             <p className="text-xs text-zinc-500 font-mono uppercase animate-pulse">Cruzando fuentes de datos...</p>
          </div>
        ) : evalData ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <header className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black tracking-tight mb-2">
                  Evaluación Integral <span className="text-zinc-500 font-normal">| Zona {evalData.zone_code}</span>
                </h1>
                {errorMsg && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mt-2">
                    <AlertTriangle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Modelo Predictivo</span>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  disabled={loading}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 transition-colors hover:bg-zinc-800"
                >
                  <option value="gradient_boosting">Gradient Boosting</option>
                  <option value="random_forest">Random Forest</option>
                  <option value="knn">K-Nearest Neighbors</option>
                  <option value="linear">Regresión Lineal</option>
                </select>
              </div>
            </header>

            <div className="grid grid-cols-2 gap-6">
              {/* Tarjeta 1: Realidad Actual (Analytics) */}
              <div className="flex flex-col relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Target className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-zinc-100">Realidad Actual</h3>
                    </div>
                    {evalData.analytics_disponible && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>

                  {!evalData.score_deterministico ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-8">
                      <ShieldAlert className="w-10 h-10 text-zinc-500 mb-3" />
                      <p className="text-sm font-medium">Score determinístico temporalmente no disponible</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-6">
                      <div>
                         <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Puntaje Consolidado</p>
                         <p className="text-4xl font-black text-cyan-400">
                           {(evalData.score_deterministico.score_value * 100).toFixed(1)}%
                         </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
                           <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Ranking</p>
                           <p className="text-xl font-mono text-zinc-200">#{evalData.score_deterministico.rank_position}</p>
                        </div>
                        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
                           <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Nombre</p>
                           <p className="text-sm font-semibold text-zinc-200 truncate">{evalData.score_deterministico.zone_name}</p>
                        </div>
                      </div>

                      {isDataOld(evalData.score_deterministico.score_calculated_at) && (
                        <div className="flex items-center gap-2 mt-4 text-orange-400 bg-orange-400/10 p-2 rounded border border-orange-400/20 text-xs">
                          <AlertTriangle className="w-4 h-4" />
                          Datos desactualizados (&gt;30 días)
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 mt-auto pt-4 text-[10px] text-zinc-600 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>Calc: {new Date(evalData.score_deterministico.score_calculated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tarjeta 2: Potencial IA (ML) */}
              <div className="flex flex-col relative group">
                {evalData.potencial_predictivo && (
                  <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" 
                       style={{ background: `linear-gradient(to bottom right, ${evalData.potencial_predictivo.color_code}33, transparent)` }} />
                )}
                <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800" 
                           style={{ backgroundColor: evalData.potencial_predictivo ? `${evalData.potencial_predictivo.color_code}1A` : '' }}>
                        <BrainCircuit className="w-5 h-5" 
                                      style={{ color: evalData.potencial_predictivo?.color_code || '#a1a1aa' }} />
                      </div>
                      <h3 className="font-semibold text-zinc-100">Potencial IA</h3>
                    </div>
                    {evalData.ml_disponible && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>

                  {!evalData.potencial_predictivo ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-8">
                      <ShieldAlert className="w-10 h-10 text-zinc-500 mb-3" />
                      <p className="text-sm font-medium">Predicción de IA temporalmente no disponible</p>
                    </div>
                  ) : (
                    <div className="flex-1 space-y-6">
                      <div>
                         <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Score Predictivo</p>
                         <p className="text-4xl font-black" style={{ color: evalData.potencial_predictivo.color_code }}>
                           {Math.round(evalData.potencial_predictivo.potential_value * 100)}
                         </p>
                      </div>

                      <div className="space-y-3">
                         <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Veredicto IA</p>
                            <p className="text-sm font-semibold truncate" style={{ color: evalData.potencial_predictivo.color_code }}>
                              {evalData.potencial_predictivo.business_label}
                            </p>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
                               <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Confianza</p>
                               <p className="text-sm font-mono text-zinc-300">{(evalData.potencial_predictivo.confidence_score * 100).toFixed(1)}%</p>
                            </div>
                            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
                               <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Modelo</p>
                               <p className="text-xs font-mono text-zinc-400 truncate" title={evalData.potencial_predictivo.model_reference}>
                                 {evalData.potencial_predictivo.model_reference.split('_')[0]}
                               </p>
                            </div>
                         </div>
                      </div>

                      {isDataOld(evalData.potencial_predictivo.prediction_generated_at) && (
                        <div className="flex items-center gap-2 mt-4 text-orange-400 bg-orange-400/10 p-2 rounded border border-orange-400/20 text-xs">
                          <AlertTriangle className="w-4 h-4" />
                          Datos desactualizados (&gt;30 días)
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 mt-auto pt-4 text-[10px] text-zinc-600 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>Inf: {new Date(evalData.potencial_predictivo.prediction_generated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
