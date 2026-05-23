import { getEvaluacionIntegral } from "@/app/actions/evaluacion-integral.actions";
import { getRanking } from "@/app/actions/ranking.actions";
import { EvaluacionIntegralData } from "@/app/schemas/evaluacion-integral";
import { create } from 'zustand';

interface EvaluacionState {
  zones: { zone_code: string; zone_name?: string }[];
  selectedZone: string | null;
  strategy: string;
  evalData: EvaluacionIntegralData | null;
  loading: boolean;
  errorMsg: string;
  
  setStrategy: (strategy: string) => void;
  setSelectedZone: (zone: string | null) => void;
  fetchZones: (datasetId: string) => Promise<void>;
  fetchEvaluacion: (datasetId: string, zone: string, strategy: string) => Promise<void>;
  resetStore: () => void;
}

export const useEvaluacionStore = create<EvaluacionState>((set) => ({
  zones: [],
  selectedZone: null,
  strategy: 'gradient_boosting',
  evalData: null,
  loading: false,
  errorMsg: '',

  setStrategy: (strategy) => set({ strategy }),
  
  setSelectedZone: (zone) => set({ selectedZone: zone }),

  fetchZones: async (datasetId) => {
    const res = await getRanking(datasetId);
    if (res.success && res.data) {
      set({ zones: res.data });
    }
  },

  fetchEvaluacion: async (datasetId, zone, strategy) => {
    set({ loading: true, errorMsg: '' });
    const res = await getEvaluacionIntegral(datasetId, zone, strategy);
    
    if (res.success && res.data) {
      set({ evalData: res.data, loading: false });
    } else {
      set({ 
        evalData: null, 
        errorMsg: res.error?.message || "Error al obtener la evaluación.", 
        loading: false 
      });
    }
  },

  resetStore: () => set({ zones: [], selectedZone: null, evalData: null, errorMsg: '' })
}));