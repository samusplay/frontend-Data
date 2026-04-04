"use client"; 

export default function SystemStatus() {
  return (
    <div className="mt-auto pt-6 border-t border-zinc-800">
      <div className="flex items-center justify-center gap-3 bg-zinc-950/50 py-3 px-4 rounded-xl border border-zinc-800/50 shadow-inner">
        <span className="relative flex h-3 w-3">
          {/* El efecto de "latido" (ping) */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-zinc-400">
          Gateway en Línea
        </span>
      </div>
    </div>
  );
}