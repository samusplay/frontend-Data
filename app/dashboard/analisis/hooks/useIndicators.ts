import { getIndicatorsAction } from "@/app/actions/analytics.action";
import { useQuery } from "@tanstack/react-query";


export function useIndicators(datasetId: string | null) {
    //usamos tan stanck
    return useQuery({
        queryKey: ["indicators", datasetId],
        queryFn: async () => {
            if (!datasetId) throw new Error("no hay dataset activo")
            const response = await getIndicatorsAction(datasetId)
            if (!response.success) {
                throw new Error(response.error || "Error obteniendo indicadores");
            }
            return response.data

        },
        enabled:!!datasetId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })

}