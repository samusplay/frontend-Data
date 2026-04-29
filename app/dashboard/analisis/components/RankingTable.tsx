'use client'
import { RankingItem } from '@/app/schemas/ranking';

interface RankingTableProps {
  data?: RankingItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const MEDALS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

function getRowStyle(rank: number): string {
  switch (rank) {
    case 1: return 'border border-yellow-500/30 bg-yellow-500/5';
    case 2: return 'border border-zinc-400/30 bg-zinc-400/5';
    case 3: return 'border border-amber-600/30 bg-amber-600/5';
    default: return 'border border-zinc-800 bg-zinc-900';
  }
}

function RankingSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-zinc-800 rounded" />
        <div className="h-4 w-20 bg-zinc-800 rounded" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900 mb-2">
          <div className="w-10 h-8 bg-zinc-800 rounded" />
          <div className="flex-1 h-4 bg-zinc-800 rounded" />
          <div className="w-16 h-4 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function RankingTable({ data, isLoading, isError }: RankingTableProps) {
  
  console.log("Ranking data:", data); // 👈 agregado para debug

  if (isLoading) {
    return <RankingSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 p-12 border border-red-800/30 rounded-xl bg-red-900/10">
          <span className="text-4xl">⚠️</span>
          <p className="text-sm text-red-400 text-center">
            No se pudo cargar el ranking en este momento.
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 p-12 border border-zinc-800 rounded-xl bg-zinc-900">
          <span className="text-4xl">📊</span>
          <h3 className="text-lg font-semibold text-zinc-300">
            No hay ranking disponible
          </h3>
          <p className="text-sm text-zinc-500 text-center">
            Configura tus pesos y calcula el score para ver el ranking territorial.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-400">Ranking de Zonas</h2>
        <span className="text-sm text-zinc-400">Top {data.length} zonas</span>
      </div>

      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <li
            key={item.rank}
            className={`flex items-center gap-4 p-4 rounded-lg ${getRowStyle(item.rank)}`}
          >
            <div className="w-10 flex-shrink-0 text-center">
              {item.rank <= 3 ? (
                <span className="text-2xl">{MEDALS[item.rank]}</span>
              ) : (
                <span className="text-lg font-bold text-zinc-500">
                  {item.rank}°
                </span>
              )}
            </div>

            <div className="flex-1">
              <span className="text-white font-medium">{item.zone_code}</span>
            </div>

            <div className="text-right">
              <span className="text-white font-bold">
                {item.score != null ? (item.score * 100).toFixed(2) : '0.00'} {/* 👈 protección contra null */}
              </span>
              <span className="text-zinc-500 text-xs ml-1">%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}