import { create } from 'zustand';

interface DatasetState {
  datasetId: string | null;
  scoringCompleted: boolean;
  mlCompleted: boolean;
  setDatasetId: (id: string | null) => void;
  // Funciones independientes para actualizar cada estado
  setScoringCompleted: (status: boolean) => void;
  setMlCompleted: (status: boolean) => void;
}

export const useDatasetStore = create<DatasetState>((set) => ({
  datasetId: null,
  scoringCompleted: false,
  mlCompleted: false,
  setDatasetId: (id) => set({ datasetId: id }),
  setScoringCompleted: (status) => set({ scoringCompleted: status }),
  setMlCompleted: (status) => set({ mlCompleted: status }),
}));