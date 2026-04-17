'use client'
import { ZoneItem } from '@/app/schemas/zones';
import { useState } from 'react';

interface ZonasListProps {
  data: ZoneItem[];
}

const PAGE_SIZE = 10;

export default function ZonasList({ data }: ZonasListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-zinc-500">No hay datos de zonas disponibles.</div>;
  }

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageData = data.slice(start, start + PAGE_SIZE);

  return (
    <div className="w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-400">Zonas disponibles</h2>
        <span className="text-sm text-zinc-400">{data.length} zonas en total</span>
      </div>

      <ul className="flex flex-col gap-2">
        {pageData.map((zone, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
          >
            <span className="text-white font-medium">{zone.name}</span>
            <span className="text-xs text-blue-400 bg-blue-950 rounded-full px-3 py-1">
              {zone.record_count} registros
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white disabled:opacity-30"
        >
          ← Anterior
        </button>
        <span className="text-sm text-zinc-400">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg text-white disabled:opacity-30"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}