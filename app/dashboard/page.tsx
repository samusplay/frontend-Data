import DatasetStatusCard from "./components/DatasetStatusCard";
import QuickInsights from "./components/QuickInsights";
import QuickLinks from "./components/QuickLinks";

export default function DashboardHomePage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Cabecera del Dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-white">Resumen Operativo</h1>
        <p className="text-zinc-400 mt-2">Visión general del estado del sistema y acceso rápido a los módulos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DatasetStatusCard />
        {/* Aquí podemos agregar más tarjetas de resumen en el futuro */}
      </div>

      {/* Accesos Rápidos */}
      <QuickLinks />
      <QuickInsights />
    </div>
  );
}