"use client";

import { getZonesWithMetrics } from "@/app/actions/zones-metrics.actions";
import { getZones } from "@/app/actions/zones.actions";
import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExecuteScoringForm from "./components/ExecuteScoringForm";
import IndicatorCards from "./components/IndicatorCards";
import RankingTable from "./components/RankingTable";
import RecommendationsPanel from "./components/RecommendationsPanel";
import ZonasChart from "./components/zonas";
import ZonasChartsCards from "./components/ZonasCharts";
import { useIndicators } from "./hooks/useIndicators";
import { useRanking } from "./hooks/useRanking";

export default function AnalisisPage() {
  // === 1. LEER LA MEMORIA (ZUSTAND) ===
  const datasetId = useDatasetStore((state) => state.datasetId);
  const setScoringCompleted = useDatasetStore((state) => state.setScoringCompleted);

  // === 2. ESTADO DE MONTAJE ===
  const [isMounted, setIsMounted] = useState(false);

  // === 3. ZONA SELECCIONADA (Para recomendaciones) ===
  const [selectedZone, setSelectedZone] = useState<{ code: string; name: string } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // === 4. LLAMADAS A LA API ===
  const { data: responseZones, isLoading: isZonesLoading } = useQuery({
    queryKey: ["zones", datasetId],
    queryFn: async () => await getZones(),
    enabled: !!datasetId,
  });

  const { data: metricsResponse } = useQuery({
    queryKey: ["zones-metrics", datasetId],
    queryFn: async () => await getZonesWithMetrics(datasetId!),
    enabled: !!datasetId,
  });

  const { data: kpiData, isLoading: isKpiLoading, isError: isKpiError } = useIndicators(datasetId);

  const {
    data: rankingResponse,
    isLoading: isRankingLoading,
    isError: isRankingError,
  } = useRanking(datasetId);

  // === 5. PREPARACIÓN DE DATOS ===
  const rawRankingData = rankingResponse?.data || [];
  const metricsData = (metricsResponse?.data || []) as any[];

  // NUEVO: Si hay datos en el ranking, marcamos el scoring como completado
  useEffect(() => {
    if (rawRankingData.length > 0) {
      setScoringCompleted(true);
    }
  }, [rawRankingData, setScoringCompleted]);

  const rankingData = rawRankingData.map((item: any) => {
    const zonaEncontrada = metricsData.find((z: any) =>
      String(z.zone_code) === String(item.zone_code)
    );
    return {
      ...item,
      zone_name: zonaEncontrada?.zone_name || item.zone_code,
    };
  });

  // === 6. HANDLER DE SELECCIÓN ===
  const handleZoneSelect = (zoneCode: string, zoneName: string) => {
    if (selectedZone?.code === zoneCode) {
      setSelectedZone(null); // Deselecciona si vuelve a hacer clic
      return;
    }
    setSelectedZone({ code: zoneCode, name: zoneName });
  };

  if (!isMounted) {
    return <div className="p-10 text-center text-zinc-500">Recuperando sesión...</div>;
  }

  // === 7. ESTADO SIN DATOS ===
  if (!datasetId) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
            Transformación y Análisis
          </h1>
          <p className="text-zinc-400 mt-2">
            Consulta las zonas disponibles y aplica reglas de estandarización territorial.
          </p>
        </div>

        <div className="p-16 text-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/40">
          <svg className="w-16 h-16 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-medium text-zinc-300 mb-2">No hay datos activos en esta sesión</h3>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto">
            Para ver las gráficas de análisis, primero necesitas procesar un archivo en el módulo de Ingesta.
          </p>
          <Link
            href="/dashboard/ingesta"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-6 rounded-xl transition-colors border border-zinc-700 inline-flex items-center gap-2"
          >
            Ir a Ingesta de Datos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  // === 8. VISTA PRINCIPAL ===
  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
          Transformación y Análisis
        </h1>
        <p className="text-zinc-400 mt-2 flex items-center gap-2">
          Consulta las zonas disponibles y aplica reglas de estandarización territorial.
          <span className="ml-2 bg-blue-900/30 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded font-mono text-xs hidden sm:inline-block">
            ID: {datasetId}
          </span>
        </p>
      </div>

      {/* TARJETAS KPI */}
      {isKpiLoading ? (
        <div className="flex justify-center items-center py-12 mt-8 border border-zinc-800 rounded-xl bg-zinc-900/50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-zinc-400">Calculando métricas...</span>
        </div>
      ) : isKpiError || !kpiData ? (
        <div className="mt-8 p-6 border border-dashed rounded-xl border-zinc-700 bg-zinc-900/50 flex flex-col items-center justify-center">
          <p className="text-zinc-400 font-medium">Métricas no disponibles</p>
        </div>
      ) : (
        <IndicatorCards data={kpiData} />
      )}

      {/* ZONAS Y ANÁLISIS VISUAL */}
      <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 mt-8 shadow-lg shadow-black/20">
        {isZonesLoading ? (
          <p className="text-zinc-500 text-center py-10 animate-pulse">Cargando mapa de zonas...</p>
        ) : !responseZones?.succcess || !responseZones?.data ? (
          <p className="text-red-400 text-center py-10">
            Error: {responseZones?.error || "No hay datos"}
          </p>
        ) : (
          <>
            <ZonasChart data={responseZones.data} />
            <div className="mt-12 pt-8 border-t border-zinc-800">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-6">
                Análisis Visual (Top 5)
              </h2>
              <ZonasChartsCards data={responseZones.data} />
            </div>
          </>
        )}
      </div>

      {/* MODULO: RANKING Y RECOMENDACIONES */}
      <div className="mt-8 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 shadow-lg shadow-black/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-zinc-800/50 pb-6">
          <div>
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Ranking de Zonas y Plan de Acción
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Calcula el score y selecciona una zona para ver las recomendaciones estratégicas.</p>
          </div>
          <ExecuteScoringForm datasetId={datasetId} zonesData={metricsData} />
        </div>

        {/* GRID DE DOS COLUMNAS - STICKY PARENT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* COLUMNA IZQUIERDA: TABLA */}
          <div className={`w-full ${selectedZone ? 'lg:w-[40%]' : 'lg:w-full'} transition-all duration-500 ease-in-out`}>
            <RankingTable
              data={rankingData}
              isLoading={isRankingLoading}
              isError={isRankingError}
              selectedZoneCode={selectedZone?.code}
              onZoneSelect={handleZoneSelect}
            />
          </div>

          {/* COLUMNA DERECHA: RECOMENDACIONES */}
          {selectedZone && datasetId && (
            <div className="w-full lg:w-[60%] animate-in slide-in-from-right-8 fade-in duration-500 sticky top-8">
              <div className="h-full border border-zinc-700/50 rounded-2xl bg-zinc-950/40 p-1"> 
                 <RecommendationsPanel
                    datasetId={datasetId}
                    zoneCode={selectedZone.code}
                    zoneName={selectedZone.name}
                  />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}