"use client";

import { useDatasetStore } from "@/app/lib/useDatasetStore";
import { useIndicators } from "../analisis/hooks/useIndicators";

// Icons per metric
const MetricIcons = {
  zonas: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  registros: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  archivos: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  actividad: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const accentStyles: Record<string, { icon: string; badge: string; glow: string; bg: string }> = {
  zonas:     { icon: "text-teal-400",   badge: "bg-teal-500/20",   glow: "bg-teal-500/10",   bg: "bg-teal-50/50 dark:bg-[#021f18]" },
  registros: { icon: "text-blue-400",   badge: "bg-blue-500/20",   glow: "bg-blue-500/10",   bg: "bg-blue-50/50 dark:bg-[#05162a]" },
  archivos:  { icon: "text-emerald-400",badge: "bg-emerald-500/20",glow: "bg-emerald-500/10", bg: "bg-emerald-50/50 dark:bg-[#061d0f]" },
  actividad: { icon: "text-orange-400", badge: "bg-orange-500/20", glow: "bg-orange-500/10", bg: "bg-orange-50/50 dark:bg-[#211204]" },
};


interface Props {
  metric: "zonas" | "registros" | "archivos" | "actividad";
  label: string;
}

export default function DatasetStatusCard({ metric, label }: Props) {
  const datasetId = useDatasetStore((state) => state.datasetId);
  const { data: kpi, isLoading } = useIndicators(datasetId);

  const accent = accentStyles[metric];
  const Icon = MetricIcons[metric];

  // Resolve value and subtitle per metric
  let value = "0";
  let subtitle = "";

  if (!datasetId) {
    const subtitleMap: Record<string, string> = {
      zonas:     "Sin datos cargados",
      registros: "Base de datos vacía",
      archivos:  "Ninguna ingesta realizada",
      actividad: "Sin actividad reciente",
    };
    value = metric === "actividad" ? "—" : "0";
    subtitle = subtitleMap[metric];
  } else if (isLoading) {
    value = "...";
    subtitle = "Calculando...";
  } else {
    switch (metric) {
      case "zonas":
        value = kpi?.cobertura_territorial?.toString() ?? "0";
        subtitle = "Zonas con datos";
        break;
      case "registros":
        value = kpi?.volumen_total?.toLocaleString() ?? "0";
        subtitle = "Transacciones evaluadas";
        break;
      case "archivos":
        value = "1";
        subtitle = "Último proceso activo";
        break;
      case "actividad":
        value = kpi?.zona_top ?? "—";
        subtitle = "Zona más activa";
        break;
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-transparent ${accent.bg} p-5 flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-1 group`}>
      {/* Glow blob top-right */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${accent.glow} rounded-bl-full blur-2xl pointer-events-none transition-transform group-hover:scale-110`} />

      {/* Header with Title and Icon */}
      <div className="flex justify-between items-start">
        <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
        {/* Icon badge */}
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${accent.badge} ${accent.icon}`}>
          <Icon />
        </div>
      </div>

      {/* Value */}
      <div className="mt-2">
        <p className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight truncate">{value}</p>
        <p className="text-[13px] text-zinc-500 dark:text-zinc-500 mt-2 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}