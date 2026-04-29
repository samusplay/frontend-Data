'use server'

import { apiClient } from "../lib/apiClient";

export interface CompareResult {
    success: boolean;
    data?: any[];
    message?: string;
    error?: string;
}

export async function compareZonesAction(zoneCodes: string[]): Promise<CompareResult> {
    try {
        const zonesParam = zoneCodes.join(',');
        const datasetId = 'dataset_predeterminado'; // Puedes hacerlo dinámico luego
        const response = await apiClient(`/api/v1/analytics/compare?dataset_id=${datasetId}&zones=${zonesParam}`, {
            method: 'GET'
        });
        
        return {
            success: true,
            data: response.data,
            message: response.message
        };
    } catch (error: any) {
        console.error("Error comparando zonas:", error);
        return {
            success: false,
            error: error?.message || "Ocurrió un error al comparar las zonas solicitadas."
        };
    }
}
