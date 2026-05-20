import DatasetStatusCard from "./components/DatasetStatusCard";
import QuickInsights from "./components/QuickInsights";
import QuickLinks from "./components/QuickLinks";

export default function DashboardHomePage() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      
      {/* CABECERA HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-10 shadow-lg shadow-black/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-400 tracking-tight">
            Resumen Operativo
          </h1>
          <p className="text-zinc-400 mt-3 text-base sm:text-lg leading-relaxed max-w-xl">
            Visión general del estado del sistema, métricas clave del último dataset procesado y accesos rápidos a las herramientas de análisis.
          </p>
        </div>
        {/* Adorno visual de fondo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
      </div>

      {/* CONTENIDO PRINCIPAL - GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* COLUMNA PRINCIPAL (Ocupa 2/3 en escritorio) */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-8">
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-200">Estado del Dataset</h2>
              <span className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Sistema Activo
              </span>
            </div>
            <DatasetStatusCard />
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-200">Insights Rápidos</h2>
            </div>
            <QuickInsights />
          </section>

        </div>

        {/* COLUMNA LATERAL (Ocupa 1/3 en escritorio) */}
        <div className="col-span-1">
          <div className="sticky top-8 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-200">Accesos Rápidos</h2>
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-1 shadow-lg shadow-black/10">
              <QuickLinks />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}