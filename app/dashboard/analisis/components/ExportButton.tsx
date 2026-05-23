'use client'
import { useExport } from '@/app/hooks/useExport';

interface ExportButtonProps {
  datasetId: string;
}

export default function ExportButton({ datasetId }: ExportButtonProps) {
  const { exportReport, isExporting } = useExport();

  return (
    <button
      onClick={() => exportReport(datasetId)}
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