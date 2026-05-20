
import { LucideIcon } from 'lucide-react'

interface StrategyCardProps {
  name: string
  tag: string
  desc: string
  icon: LucideIcon
  color: string
  isActive: boolean
  onClick: () => void
  loading: boolean
}

export function StrategyCard({ name, tag, desc, icon: Icon, color, isActive, onClick, loading }: StrategyCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        w-full flex flex-col p-4 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden
        ${isActive
          ? 'bg-zinc-900 border-zinc-700'
          : 'bg-zinc-900/20 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/40'}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {/* Barra lateral — color único por estrategia */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: color }} />
      )}

      <div className="flex justify-between items-start mb-3">
        <Icon
          className="w-5 h-5 transition-colors duration-300"
          style={isActive ? { color } : { color: '#52525b' }}
        />
        {/* Tag con color de la estrategia cuando activo */}
        <span
          className="text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded transition-all duration-300"
          style={isActive
            ? { backgroundColor: color + '20', color: color, border: `0.5px solid ${color}40` }
            : { backgroundColor: '#27272a', color: '#52525b', border: '0.5px solid transparent' }
          }
        >
          {tag}
        </span>
      </div>

      <h3
        className="text-sm font-bold transition-colors duration-300"
        style={isActive ? { color: '#f4f4f5' } : { color: '#71717a' }}
      >
        {name}
      </h3>
      <p className="text-[10px] text-zinc-600 mt-1 leading-tight">{desc}</p>
    </button>
  )
}