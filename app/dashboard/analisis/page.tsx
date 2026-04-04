export default function AnalisisPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Transformación y Análisis</h1>
        <p className="text-zinc-400 mt-2">
          Consulta las zonas disponibles y aplica reglas de estandarización territorial.
        </p>
      </div>
      
      {/* Placeholder: Aquí irá nuestro ZoneSelector pronto */}
      <div className="p-12 text-center border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30">
        <svg className="w-12 h-12 text-zinc-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <h3 className="text-lg font-medium text-zinc-300">Módulo en Construcción</h3>
        <p className="text-sm text-zinc-500 mt-1">Próximamente: Consulta de Zonas y Procesamiento ETL</p>
      </div>
    </div>
  );
}