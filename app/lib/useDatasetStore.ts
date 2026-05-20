import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//definimos la interfaz
interface DatasetState {
  datasetId: string | null;
  setDatasetId: (id: string | null) => void;
}

//hook global usando zustand con persistencia
export const useDatasetStore = create<DatasetState>()(
  persist(
    (set) => ({
      datasetId: null,
      setDatasetId: (id) => set({ datasetId: id }),
    }),
    {
      name: 'dataset-storage', // clave para guardar en localStorage
    }
  )
);