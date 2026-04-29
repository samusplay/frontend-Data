interface Zone {
  name: string;
  record_count: number;
}

interface ZoneSelectorProps {
  availableZones: Zone[];
  selectedZones: string[];
  onToggleZone: (zoneName: string) => void;
  isLoading: boolean;
  onCompareClick: () => void;
  isComparing: boolean;
}

export default function ZoneSelector({
  availableZones,
  selectedZones,
  onToggleZone,
  isLoading,
  onCompareClick,
  isComparing
}: ZoneSelectorProps) {
  return (
    <div className="col-span-1 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 h-fit">
      <h2 className="text-xl font-semibold mb-4 text-zinc-200">Zonas Disponibles</h2>
      
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <p className="text-sm text-zinc-500 animate-pulse">Cargando zonas...</p>
        ) : availableZones.length === 0 ? (
          <p className="text-sm text-zinc-500">No hay zonas procesadas.</p>
        ) : (
          availableZones.map((zone) => {
            const isSelected = selectedZones.includes(zone.name);
            const isDisabled = !isSelected && selectedZones.length >= 4;
            
            return (
              <button
                key={zone.name}
                onClick={() => onToggleZone(zone.name)}
                disabled={isDisabled}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm flex items-center justify-between
                  ${isSelected 
                    ? 'bg-blue-900/30 border border-blue-500 text-blue-300' 
                    : isDisabled
                      ? 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                      : 'bg-zinc-800/50 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-blue-500/50'
                  }`}
              >
                <span className="truncate">{zone.name}</span>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                )}
              </button>
            )
          })
        )}
      </div>

      <button
        onClick={onCompareClick}
        disabled={selectedZones.length < 2 || isComparing}
        className={`w-full mt-6 py-3 rounded-xl font-medium transition-all
          ${selectedZones.length < 2 || isComparing
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 shadow-lg shadow-blue-900/20'
          }`}
      >
        {isComparing ? 'Analizando...' : 'Comparar Zonas'}
      </button>
    </div>
  );
}
