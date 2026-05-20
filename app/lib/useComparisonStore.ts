import { ComparisonRequestSchema, ComparisonResponse } from '@/app/schemas/comparison'
import { create } from 'zustand'
import { fetchAdvancedComparison } from '../actions/comparison.actions'


type InventoryZone = {
  zone_code: string
  zone_name: string
  [key: string]: unknown
}

interface ComparisonState {
  inventoryZones: InventoryZone[]
  selectedZones: InventoryZone[]
  comparisonResult: ComparisonResponse | null
  isLoading: boolean
  error: string | null

  setInventory: (zones: InventoryZone[]) => void
  addToArena: (zone: InventoryZone) => void
  removeFromArena: (zoneCode: string) => void
  clearArena: () => void
  fetchComparison: (datasetId: string, strategy: string) => Promise<void>
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  inventoryZones: [],
  selectedZones: [],
  comparisonResult: null,
  isLoading: false,
  error: null,

  setInventory: (zones) => set({ inventoryZones: zones }),

  addToArena: (zone) => {
    const { selectedZones } = get()
    const yaExiste = selectedZones.some(z => z.zone_code === zone.zone_code)
    if (selectedZones.length < 4 && !yaExiste) {
      set({ selectedZones: [...selectedZones, zone], comparisonResult: null })
    }
  },

  removeFromArena: (zoneCode) => set((state) => ({
    selectedZones: state.selectedZones.filter(z => z.zone_code !== zoneCode),
    comparisonResult: null,
  })),

  clearArena: () => set({
    selectedZones: [],
    comparisonResult: null,
    error: null,
  }),

  fetchComparison: async (datasetId, strategy) => {
    const { selectedZones } = get()

    const validation = ComparisonRequestSchema.safeParse({
      dataset_id: datasetId,
      zone_codes: selectedZones.map(z => z.zone_code),
      ml_strategy: strategy,
    })

    if (!validation.success) {
      const firstError = validation.error.flatten().fieldErrors
      const message = Object.values(firstError)[0]?.[0] ?? 'Error de validación'
      set({ error: message })
      return
    }

    set({ isLoading: true, error: null })

    try {
      const result = await fetchAdvancedComparison(validation.data)
      set({ comparisonResult: result, isLoading: false })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      set({ error: message, isLoading: false })
    }
  },
}))