'use client'
import { RankingItem } from '@/app/schemas/ranking';

interface RankingTableProps {
  data: RankingItem[];
}

// Medallas para el top 3
const MEDALS: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

// Color del badge según nivel
function getLevelStyle(level: string): string {
  switch (level.toLowerCase()) {
    case 'alta oportunidad':
      return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
    case 'oportunidad media':
      return 'text-blue-400 bg-blue-400/10 border border-blue-400/20';
    case 'riesgo medio':
      return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20';
    case 'riesgo alto':
      return 'text-red-400 bg-red-400/10 border border-red-400/20';
    default:
      return 'text-zinc-400 bg-zinc-400/10 border border-zinc-400/20';
  }
}

// Color de la fila según posición
function getRowStyle(rank: number): string {
  switch (rank) {
    case 1: return 'border border-yellow-500/30 bg-yellow-500/5';
    case 2: return 'border border-zinc-400/30 bg-zinc-400/5';
    case 3: return 'border border-amber-600/30 bg-amber-600/5';
    default: return 'border border-zinc-800 bg-zinc-900';
  }
}

export default function RankingTable({ data }: RankingTableProps) {
  // CA 3: estado vacío informativo
  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 p-12 border border-zinc-800 rounded-xl bg-zinc-900">
          <span className="text-4xl">📊</span>
          <h3 className="text-lg font-semibold text-zinc-300">
            No hay ranking disponible
          </h3>
          <p className="text-sm text-zinc-500 text-center">
            Aún no se ha calculado el score para este dataset.
            Ejecuta el proceso de scoring para ver el ranking de zonas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-400">
          Ranking de Zonas
        </h2>
        <span className="text-sm text-zinc-400">
          Top {data.length} zonas
        </span>
      </div>

      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <li
            key={item.rank}
            className={`flex items-center gap-4 p-4 rounded-lg ${getRowStyle(item.rank)}`}
          >
            {/* Posición con medalla para top 3 */}
            <div className="w-10 flex-shrink-0 text-center">
              {item.rank <= 3 ? (
                <span className="text-2xl">{MEDALS[item.rank]}</span>
              ) : (
                <span className="text-lg font-bold text-zinc-500">
                  {item.rank}°
                </span>
              )}
            </div>

            {/* Nombre de la zona */}
            <div className="flex-1">
              <span className="text-white font-medium">{item.zone_name}</span>
            </div>

            {/* Score formateado a 2 decimales */}
            <div className="text-right mr-4">
              <span className="text-white font-bold">
                {item.score.toFixed(2)}
              </span>
              <span className="text-zinc-500 text-xs ml-1">pts</span>
            </div>

            {/* Badge de nivel */}
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getLevelStyle(item.level)}`}>
              {item.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}