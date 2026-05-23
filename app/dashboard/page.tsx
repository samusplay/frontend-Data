import QuickInsights from "./components/QuickInsights";
import QuickLinks from "./components/QuickLinks";

export default function DashboardHomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 pb-12 pt-4">
      {/* Cabecera del Dashboard */}
      <div className="mb-6 px-2">
        <h1 className="text-3xl font-bold text-white">Resumen Operativo</h1>
        <p className="text-zinc-400 mt-2 text-sm">Visión general del estado del sistema y acceso rápido a los módulos analíticos.</p>
      </div>

      {/* Tarjetas Superiores: Estado y Métricas Integradas (Mismo Estilo Horizontal) */}
      <QuickInsights />

      {/* Accesos Rápidos - Formato Cuadrícula estilo David */}
      <QuickLinks />
    </div>
  );
}