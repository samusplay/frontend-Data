import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Cabecera del Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-white">Resumen Operativo</h1>
        <p className="text-zinc-400 mt-2">Visión general del estado del sistema y acceso rápido a los módulos.</p>
      </div>

      {/* Tarjetas de Métricas (Mocks visuales por ahora) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-zinc-400 text-sm font-medium">Estado del Gateway</h3>
          <div className="flex items-center gap-3 mt-3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
            <p className="text-xl font-bold text-white">Óptimo</p>
          </div>
          <p className="text-xs text-zinc-500 mt-3">Conexión a microservicios OK</p>
        </div>
      </div>

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <Link href="/dashboard/ingesta" className="group block bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-6 transition-all">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Nueva Ingesta &rarr;</h3>
          <p className="text-sm text-zinc-400 mt-2">Sube archivos estructurados (.csv, .json) para su validación e inserción en la base de datos temporal.</p>
        </Link>
        
        <Link href="/dashboard/analisis" className="group block bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-6 transition-all">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Módulo de Análisis &rarr;</h3>
          <p className="text-sm text-zinc-400 mt-2">Consulta zonas procesadas, aplica reglas de negocio y transforma datos para el modelo analítico.</p>
        </Link>
      </div>
    </div>
  );
}