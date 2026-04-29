import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DatasetState {
  datasetId: string | null;
  setDatasetId: (id: string | null) => void;
}

export const useDatasetStore = create<DatasetState>()(
  persist(
    (set) => ({
      datasetId: null,
      setDatasetId: (id) => set({ datasetId: id })
    }),
    {
      name: 'dataset-storage', // nombre en localStorage
    }
  )
)