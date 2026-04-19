import { getZones } from "@/app/actions/zones.actions";
import Link from "next/link";
import ZonasChart from "./components/zonas";
import { MOCK_RANKING } from '@/app/mocks/ranking.mocks'; // Eliminar cuando el score ya esté
import RankingTable from './components/ranking'; // Eliminar cuando el score ya esté

export default async function AnalisisPage({
  searchParams,
}: {
  searchParams: Promise<{ datasetId?: string }>; 
}) {
  // === 1. LEER LA URL con await
  
  const params = await searchParams;
  const datasetId = params?.datasetId;

  // === 2. EL CANDADO ===
  if (!datasetId) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
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

  // === 3. LA PUERTA ABIERTA ===
  const response = await getZones();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
          Transformación y Análisis
        </h1>
        <p className="text-zinc-400 mt-2 flex items-center gap-2">
          Consulta las zonas disponibles y aplica reglas de estandarización territorial.
          <span className="ml-2 bg-blue-900/30 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded font-mono text-xs hidden sm:inline-block">
            ID: {datasetId}
          </span>
        </p>
      </div>

      <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50">
        {!response.succcess || !response.data ? (
          <p className="text-red-400 text-center py-10">
            Error: {response.error || "No hay datos"}
          </p>
        ) : (
          <ZonasChart data={response.data} />
        )}
      </div>
        {/* Sección de Ranking — usando mock mientras el backend no está listo, cuando ya esté se eliminará*/} 
      <div className="mt-8 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50">
        <RankingTable data={MOCK_RANKING} />
      </div>
    </div>
  );
}