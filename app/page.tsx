import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-8 text-white relative overflow-hidden">
      
      {/* Efecto visual de fondo (un brillo sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
            Analítica Territorial
          </span>
        </h1>
        
        {/* Subtítulo descriptivo */}
        <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl">
          Sistema Core de procesamiento, estandarización y análisis de datos geográficos. 
          Arquitectura Hexagonal End-to-End.
        </p>

        {/* Botón de Entrada (Única acción) */}
        <Link 
          href="/dashboard"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all hover:border-blue-500/50 hover:bg-zinc-800"
        >
          {/* Brillo interno del botón */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          
          <span className="relative font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
            Acceder al Sistema
          </span>
          
          <svg 
            className="relative w-5 h-5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Footer pequeñito de la Landing */}
      <div className="absolute bottom-8 text-xs text-zinc-600 font-medium">
        Modo de Acceso: <span className="text-emerald-500">Desarrollo (Sin Autenticación)</span>
      </div>
    </main>
  );
}