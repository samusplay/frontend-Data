import DatasetUploader from "./components/DatasetUploader";

export default function IngestaPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
          Ingesta de Datos
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Sube tus archivos de zonas territoriales (CSV o JSON) para almacenarlos en bruto y prepararlos para el análisis.
        </p>
      </div>

      {/* Nuestro componente de carga de archivos */}
      <DatasetUploader />
    </div>
  );
}