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
        w-full flex flex-col p-4 rounded-2xl border transition-all text-left group relative overflow-hidden
        ${isActive 
          ? 'bg-zinc-900 border-zinc-700 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
          : 'bg-zinc-900/20 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/40'}
      `}
    >
      {isActive && (
        <div 
          className="absolute left-0 top-0 bottom-0 w-1" 
          style={{ backgroundColor: color }}
        />
      )}
      
      <div className="flex justify-between items-start mb-3">
        <Icon className={`w-5 h-5 ${isActive ? '' : 'text-zinc-600 group-hover:text-zinc-400'}`} 
              style={isActive ? { color } : {}} />
        <span className="text-[9px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-zinc-800 rounded text-zinc-500">
          {tag}
        </span>
      </div>
      
      <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>{name}</h3>
      <p className="text-[10px] text-zinc-600 mt-1 leading-tight">{desc}</p>
    </button>
  )
}