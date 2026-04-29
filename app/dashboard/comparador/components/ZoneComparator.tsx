import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

interface ZoneComparatorProps {
  comparisonData: any[];
}

export default function ZoneComparator({ comparisonData }: ZoneComparatorProps) {
  // Preparar datos para RadarChart
  const formatRadarData = () => {
    if (!comparisonData.length) return [];
    
    const metrics = ["ingresos", "poblacion", "competencia", "score_final"];
    return metrics.map(metric => {
      const dataPoint: any = { metric: metric.toUpperCase() };
      comparisonData.forEach(zone => {
        dataPoint[zone.zone_name] = zone[metric];
      });
      return dataPoint;
    });
  };

  const radarData = formatRadarData();
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  // CA 4: Estado vacío
  if (comparisonData.length === 0) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
        <div className="w-24 h-24 mb-6 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-700">
          <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-zinc-300 mb-2">Esperando contrincantes...</h3>
        <p className="text-zinc-500 text-center max-w-sm">
          Selecciona al menos 2 zonas del ranking para iniciar la comparación.
        </p>
      </div>
    );
  }

  // Visualización con Tabla y Gráfico de Radar
  return (
    <div className="space-y-6">
      {/* Tabla de Especificaciones */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-800/50 text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Métrica</th>
                {comparisonData.map((zone, idx) => (
                  <th key={zone.zone_code} className="px-6 py-4 font-medium" style={{ color: colors[idx] }}>
                    {zone.zone_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {["score_final", "ingresos", "poblacion", "competencia"].map((metric) => (
                <tr key={metric} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 text-zinc-300 font-medium capitalize">
                    {metric.replace('_', ' ')}
                  </td>
                  {comparisonData.map((zone) => (
                    <td key={`${zone.zone_code}-${metric}`} className="px-6 py-4 text-zinc-400 font-mono">
                      {metric === 'score_final' ? (
                        <span className="bg-zinc-800 px-2 py-1 rounded border border-zinc-700 text-white font-bold">
                          {zone[metric]}
                        </span>
                      ) : (
                        zone[metric].toLocaleString()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Radar Chart (Spider Chart) */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 h-[500px] flex flex-col">
        <h3 className="text-lg font-medium text-zinc-300 mb-6 pl-2 border-l-2 border-pink-500">
          Contraste Multidimensional
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#3f3f46" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: '#52525b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                itemStyle={{ color: '#e4e4e7' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              
              {comparisonData.map((zone, idx) => (
                <Radar
                  key={zone.zone_code}
                  name={zone.zone_name}
                  dataKey={zone.zone_name}
                  stroke={colors[idx]}
                  fill={colors[idx]}
                  fillOpacity={0.4}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
