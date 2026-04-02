import TestIngestion from "./components/TestIngestion";

export default function Home() {
  return (
    // Usamos un fondo oscuro (zinc-950) y centramos todo vertical y horizontalmente
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-50 font-sans">
      
      {/* Cabecera de tu aplicación */}
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Plataforma de Analítica Territorial
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Arquitectura Hexagonal End-to-End: Next.js + API Gateway + Microservicios
        </p>
      </div>

      {/* Inyectamos componentes*/}
      <TestIngestion />

      {/* Un pequeño footer (opcional) */}
      <div className="mt-12 text-sm text-zinc-600">
        Prueba de concepto - Ingesta de Datos
      </div>

    </main>
  );
}