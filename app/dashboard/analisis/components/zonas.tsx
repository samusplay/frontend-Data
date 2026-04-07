'use client'
import { ZoneItem } from '@/app/schemas/zones';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface ZonasChartProps {
  data: ZoneItem[];
}

// Colores un poco más vibrantes para que resalten sobre fondo oscuro
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function ZonasChart({ data }: ZonasChartProps) {
  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-zinc-500">No hay datos de zonas disponibles.</div>;
  }

  return (
    // Quitamos bg-white y agregamos h-[450px] real
    <div className="w-full h-112.5 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-cyan-400 mb-6 text-center">
        Distribución por Departamento
      </h2>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={140}
            paddingAngle={3}
            dataKey="record_count"
            nameKey="name"
            stroke="none" // Quita el borde blanco entre los pedazos de la dona
            label={{ fill: '#e4e4e7', fontSize: 12 }} // Letras de las líneas en gris claro
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
            formatter={(value: any) => [`${value} registros`, 'Cantidad']}
            // Ponemos el cuadrito flotante oscuro para que combine
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            // Ponemos el texto de la leyenda en gris claro
            wrapperStyle={{ color: '#a1a1aa', fontSize: '14px', marginTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}