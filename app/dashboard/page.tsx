import DatasetStatusCard from "./components/DatasetStatusCard";
import QuickInsights from "./components/QuickInsights";
import QuickLinks from "./components/QuickLinks";

export default function DashboardHomePage() {
  return (
    <div className="w-full space-y-8 pb-12">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800/50">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Resumen Operativo</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Visión general del estado del sistema y acceso rápido a los módulos.
          </p>
        </div>
      </div>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DatasetStatusCard metric="zonas" label="Zonas Procesadas" />
          <DatasetStatusCard metric="registros" label="Registros Totales" />
          <DatasetStatusCard metric="archivos" label="Archivos Subidos" />
          <DatasetStatusCard metric="actividad" label="Última Actividad" />
        </div>
      </section>

      {/* ── MÓDULOS PRINCIPALES ── */}
      <section>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-200 mb-4">Módulos Principales</h2>
        <QuickLinks />
      </section>



    </div>
  );
}