'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ExportButtonProps {
  datasetId: string;
}

export default function ExportButton({ datasetId }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // CA 5: llamada directa al Gateway desde el cliente
      // porque necesitamos manejar la respuesta binaria (Blob)
      const today = new Date().toISOString().split('T')[0];
      const fileName = `Reporte_Analitico_${today}.csv`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/api/v1/export/${datasetId}`
      );

      // CA 5: si el servidor falla, mostrar mensaje amigable
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const serviceName = errorData?.service || "datos";
        toast.error(
          `No se pudo completar la exportación debido a un error en el servicio de ${serviceName}`
        );
        return;
      }

      // CA 5: gestionar respuesta binaria (Blob) y forzar descarga
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName; // CA 5: nombre con fecha del día
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Reporte descargado: ${fileName}`);

    } catch (error) {
      // CA 5: error de red
      toast.error(
        "No se pudo completar la exportación debido a un error en el servicio de datos"
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
        ${isExporting
          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
          : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30 hover:border-emerald-500/50'
        }`}
    >
      {isExporting ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Exportando...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Exportar Resultados
        </>
      )}
    </button>
  );
}