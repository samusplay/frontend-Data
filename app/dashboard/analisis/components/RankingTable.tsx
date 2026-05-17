"use client";
import { RankingItem } from "@/app/schemas/ranking";

interface ExtendedRankingItem extends RankingItem {
  zone_name?: string;
}
interface RankingTableProps {
  data?:ExtendedRankingItem[];
  isLoading?: boolean;
  isError?: boolean;
}

// Icono SVG para las medallas
const MedalIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-7 h-7 ${color}`}
  >
    <path
      fillRule="evenodd"
      d="M10.5 2.25a3 3 0 0 0-5.905.75H2.25a.75.75 0 0 0 0 1.5h1.564a2.986 2.986 0 0 0-.256 1.258c0 .248.026.49.076.723H2.25a.75.75 0 0 0 0 1.5h1.942a2.983 2.983 0 0 0 1.522 1.954l-2.008 4.015a.75.75 0 0 0 .671 1.096h15.246a.75.75 0 0 0 .67-1.096l-2.007-4.015a2.983 2.983 0 0 0 1.522-1.954h1.943a.75.75 0 0 0 0-1.5h-1.384a2.99 2.99 0 0 0 .076-.723c0-.435-.088-.847-.256-1.258h1.564a.75.75 0 0 0 0-1.5H19.405a3 3 0 0 0-5.905-.75H10.5ZM12 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      clipRule="evenodd"
    />
  </svg>
);

function getRowStyle(rank: number): string {
  switch (rank) {
    case 1:
      return "border border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.1)]";
    case 2:
      return "border border-zinc-300/40 bg-zinc-400/10 shadow-[0_0_15px_rgba(161,161,170,0.1)]";
    case 3:
      return "border border-amber-600/40 bg-amber-600/10 shadow-[0_0_15px_rgba(217,119,6,0.1)]";
    default:
      return "border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50 transition-colors";
  }
}

function RankingSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-40 bg-zinc-800 rounded" />
        <div className="h-4 w-20 bg-zinc-800 rounded" />
      </div>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900 mb-2"
        >
          <div className="w-10 h-8 bg-zinc-800 rounded" />
          <div className="flex-1 h-4 bg-zinc-800 rounded" />
          <div className="w-16 h-4 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function RankingTable({ data, isLoading, isError }: RankingTableProps) {
  if (isLoading) {
    return <RankingSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-4 p-12 border border-red-800/30 rounded-2xl bg-red-900/10">
          <svg
            className="w-12 h-12 text-red-500/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-red-400 text-center">
            No se pudo cargar el ranking en este momento.
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center gap-4 p-12 border border-dashed border-zinc-700 rounded-2xl bg-zinc-900/40">
          <svg
            className="w-12 h-12 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-zinc-300">No hay ranking disponible</h3>
          <p className="text-sm text-zinc-500 text-center max-w-sm">
            Ejecuta el cálculo de pesos para generar el ranking territorial.
          </p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-zinc-200">Resultados del Scoring</h3>
        <span className="text-xs font-medium px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
          Top {data.length} zonas
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {data.map((item) => (
          <li
            key={item.rank}
            className={`flex items-center gap-4 p-4 rounded-xl ${getRowStyle(item.rank)}`}
          >
            {/* MEDALLA O NÚMERO */}
            <div className="w-12 flex-shrink-0 flex justify-center">
              {item.rank === 1 ? (
                <MedalIcon color="text-yellow-500" />
              ) : item.rank === 2 ? (
                <MedalIcon color="text-zinc-300" />
              ) : item.rank === 3 ? (
                <MedalIcon color="text-amber-600" />
              ) : (
                <span className="text-xl font-bold text-zinc-600 bg-zinc-800/50 w-8 h-8 flex items-center justify-center rounded-full">
                  {item.rank}
                </span>
              )}
            </div>

            {/* INFORMACIÓN DE LA ZONA (Con el cruce de nombres aplicado) */}
            <div className="flex-1">
              <span className="text-white font-semibold text-lg block">
                {item.zone_name || item.zone_code}
              </span>
              <span className="text-xs text-zinc-500 font-mono tracking-wider">
                ID: {item.zone_code}
              </span>
            </div>

            {/* PUNTAJE */}
            <div className="text-right pr-2">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-emerald-400">
                  {item.score != null ? (item.score * 100).toFixed(1) : "0.0"}
                </span>
                <span className="text-zinc-500 text-sm font-medium">%</span>
              </div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-0.5">
                Score
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}