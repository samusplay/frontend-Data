import { ZoneItem } from '@/app/schemas/zones';
import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';

interface ZonasChartsCardsProps {
  data: ZoneItem[];
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4'];

export default function ZonasChartsCards({ data }: ZonasChartsCardsProps) {

  const chartData = useMemo(() => {
    if (!data) return [];
    
    const dataLimpia = data.filter(item => {
      if (!item.name) return false;
      const nombreLimpio = item.name.trim();
      const nombreMinuscula = nombreLimpio.toLowerCase();
      if (nombreLimpio === '') return false;
      if (nombreMinuscula === 'nombres' || nombreMinuscula === 'nombre') return false;
      if (/^\d+$/.test(nombreLimpio)) return false;
      return true;
    });

    const sorted = [...dataLimpia].sort((a, b) => b.record_count - a.record_count);
    return sorted.slice(0, 5);
  }, [data]);

  // ✅ Bug 2 corregido: re-agregamos el useMemo de insights
  const insights = useMemo(() => {
    if (!chartData || chartData.length === 0) return null;

    const totalRegistrosGlobal = data.reduce((sum, item) => sum + item.record_count, 0);
    const totalTop5 = chartData.reduce((sum, item) => sum + item.record_count, 0);
    const porcentajeTop5 = ((totalTop5 / totalRegistrosGlobal) * 100).toFixed(1);
    const lider = chartData[0];

    return { lider, porcentajeTop5, totalTop5 };
  }, [chartData, data]);

  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg shadow-xl">
          <p className="text-white font-medium text-sm">{payload[0].payload.name}</p>
          <p className="text-blue-400 font-bold">{payload[0].value} puntos de actividad</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      
      {/* TARJETA 1: Gráfico de Barras */}
      <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/50 flex flex-col">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4">Top 5: Volumen de Actividad</h3>
        <div className="grow min-h-50 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                stroke="#71717a" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => val.substring(0, 10) + (val.length > 10 ? '...' : '')}
              />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#27272a' }} />
              <Bar dataKey="record_count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TARJETA 2: Gráfico de Dona */}
      <div className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/50 flex flex-col">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4">Distribución del Top 5</h3>
        <div className="grow min-h-50 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="record_count"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white">Top 5</span>
          </div>
        </div>
      </div>

      {/* TARJETA 3: INSIGHTS */}
      <div className="p-5 border border-zinc-800 rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-900/50 flex flex-col justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <svg className="w-32 h-32 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Conclusiones Clave
          </h3>

          <div className="space-y-4 relative z-10">
            <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
              <p className="text-xs text-zinc-400 mb-1">Zona Dominante</p>
              <p className="text-sm text-zinc-200">
                
                <span className="font-bold text-blue-400">{insights?.lider?.name}</span> encabeza la lista con <span className="font-bold text-white">{insights?.lider?.record_count}</span> puntos de actividad procesados.
              </p>
            </div>

            <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
              <p className="text-xs text-zinc-400 mb-1">Concentración de Datos</p>
              <p className="text-sm text-zinc-200">
                Estas 5 zonas principales representan el <span className="font-bold text-emerald-400">{insights?.porcentajeTop5}%</span> de toda la actividad territorial del dataset.
              </p>
            </div>
            
            <p className="text-xs text-zinc-500 italic mt-4 border-t border-zinc-800 pt-3">
              *Nota: Los valores reflejan la cantidad de registros consolidados en el dataset original, no el volumen real de elementos (ej. número de viviendas).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}