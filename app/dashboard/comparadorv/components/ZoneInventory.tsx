'use client'
import { getZonesWithMetrics } from '@/app/actions/zones-metrics.actions'
import { useComparisonStore } from '@/app/lib/useComparisonStore'
import { useDatasetStore } from '@/app/lib/useDatasetStore'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical, MapPin, Search } from 'lucide-react'
import { useEffect } from 'react'

const DraggableZoneCard = ({ zone }: { zone: any }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: zone.zone_code,
    data: zone,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 100 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group flex items-center gap-3 p-3 rounded-xl border select-none
        transition-all duration-200 cursor-grab active:cursor-grabbing
        ${isDragging
          ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/20 shadow-2xl scale-105'
          : 'bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm dark:shadow-none'}
      `}
    >
      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
        <GripVertical className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 truncate group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
          {zone.zone_name}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-blue-500/70" />
          <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-tight">Zona {zone.zone_code}</span>
        </div>
      </div>
    </div>
  )
}

export const ZoneInventory = () => {
  const { datasetId } = useDatasetStore()
  const { inventoryZones, setInventory } = useComparisonStore()

  useEffect(() => {
    if (!datasetId) return
    const load = async () => {
      const res = await getZonesWithMetrics(datasetId)
      if (res.success) setInventory(res.data)
    }
    load()
  }, [datasetId, setInventory])

  if (!datasetId) return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl m-4">
      <Search className="w-8 h-8 text-zinc-300 dark:text-zinc-800 mb-3" />
      <p className="text-zinc-500 text-sm font-medium">Selecciona un dataset para cargar el inventario</p>
    </div>
  )

  return (
    <div className="flex flex-col h-full max-h-175 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl border border-zinc-200 dark:border-zinc-800/50 overflow-hidden">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-[11px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em]">
            Explorador de Zonas
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
            {inventoryZones.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 overflow-y-auto custom-scrollbar">
        {inventoryZones.length === 0 ? (
           <div className="space-y-3">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="h-15 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl animate-pulse border border-zinc-200 dark:border-zinc-800/50" />
             ))}
           </div>
        ) : (
          inventoryZones.map((zone) => <DraggableZoneCard key={zone.zone_code} zone={zone} />)
        )}
      </div>
      
      {/* Estilo para el scrollbar (puedes mover esto a tu globals.css) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>
    </div>
  )
}