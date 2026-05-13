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
import ZonasChart from "./components/zonas";
import ZonasChartsCards from "./components/ZonasCharts";
import ActionPlanList from "./components/ActionPlanList";
import { useIndicators } from "./hooks/useIndicators";
import { useRanking } from "./hooks/useRanking";

export default function AnalisisPage() {
  // === 1. LEER LA MEMORIA (ZUSTAND) ===
  const datasetId = useDatasetStore((state) => state.datasetId);

  // === 2. ESTADO DE MONTAJE (Para evitar Hydration Mismatch) ===
  const [isMounted, setIsMounted] = useState(false);
  const [loadingIA, setLoadingIA] = useState(false);

const [recommendations, setRecommendations] = useState<any[]>([]);

 async function executeML() {

  try {

    setLoadingIA(true);

    const response = await fetch(
      `http://localhost:8000/api/v1/ml/execute/${datasetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          strategy: "linear"
        })
      }
    );

    const data = await response.json();

    console.log("ML RESPONSE:", data);

    setRecommendations(data.recommendations || []);

  } catch (error) {

    console.error("ERROR IA:", error);

  } finally {

    setLoadingIA(false);
  }
}

useEffect(() => {
  setIsMounted(true);
}, []);

  // === 3. LLAMADAS A LA API ===
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

  // === 4. PREPARACIÓN DE DATOS ===
  const rawRankingData = rankingResponse?.data || [];
  const zonesData = (responseZones?.data || []) as any[];
  const metricsData = (metricsResponse?.data || []) as any[];

  const rankingData = rawRankingData.map((item: any) => {
    const zonaEncontrada = metricsData.find((z: any) =>
      String(z.zone_code) === String(item.zone_code)
    );
    return {
      ...item,
      zone_name: zonaEncontrada?.zone_name || item.zone_code,
    };
  });



  if (!isMounted) {
    return <div className="p-10 text-center text-zinc-500">Recuperando sesión...</div>;
  }
  console.log("rankingResponse:", rankingResponse);
  console.log("rawRankingData:", rawRankingData);
  console.log("rankingData:", rankingData);

  // === 5. EL CANDADO ===
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

  // === 6. LA PUERTA ABIERTA ===
  return (
    <div className="w-full max-w-6xl mx-auto">
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

      {/* RANKING */}
      <div className="mt-8 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 shadow-lg shadow-black/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-zinc-800/50 pb-6">
          <div>
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Ranking de Zonas
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Calcula el score en base a los pesos configurados</p>
          </div>
          {/* ← metricsData en lugar de zonesData */}
          <ExecuteScoringForm datasetId={datasetId} zonesData={metricsData} />


        <button
  onClick={executeML}
  disabled={loadingIA}
  className="
    mt-4 sm:mt-0
    bg-emerald-600
    hover:bg-emerald-500
    disabled:bg-zinc-700
    text-white
    px-4 py-2
    rounded-xl
    transition
  "
>
  {loadingIA
    ? "Analizando..."
    : "Calcular Potencial con IA"}
</button>
 
        </div>

        <RankingTable
          data={rankingData}
          isLoading={isRankingLoading}
          isError={isRankingError}
        />

        {/* RESULTADOS IA */}
<div className="mt-8">
  
  {loadingIA && (
    <div className="flex items-center gap-3 p-6 border border-zinc-800 rounded-2xl bg-zinc-900/50">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-400"></div>
      <p className="text-zinc-300">
        La IA está analizando las zonas...
      </p>
    </div>
  )}

  {!loadingIA && (
    <ActionPlanList recommendations={recommendations} />
  )}

</div>
      </div>
    </div>
  );
}