import TestIngestion from "./components/TestIngestion";

export default function Home() {
  return (
    // Usamos un fondo oscuro (zinc-950) y centramos todo vertical y horizontalmente
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white text-black font-sans">
      
      {/* Cabecera de tu aplicación */}
      <div className="flex flex-col items-center gap-4 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-emerald-700">
          Plataforma de Analítica Territorial
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Arquitectura Hexagonal End-to-End: Next.js + API Gateway + Microservicios
        </p>
      </div>

      {/* Inyectamos componentes*/}
      <TestIngestion />

      {/* Un pequeño footer (opcional) */}
      <div className="mt-12 text-sm text-gray-500">
        Prueba de concepto - Ingesta de Datos
      </div>

    </main>
  );
}