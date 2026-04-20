import { create } from 'zustand';

//definimos la interfaz
interface DatasetState {
  datasetId: string | null;
  setDatasetId: (id: string | null) => void;
}

//hook global usando zustand
export const useDatasetStore=create<DatasetState>((set)=>({
    datasetId:null,
    setDatasetId:(id)=>set({datasetId:id}) //actualiza el id
}))
