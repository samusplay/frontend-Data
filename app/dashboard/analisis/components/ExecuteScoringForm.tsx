"use client";

import { executeScoringAction } from "@/app/actions/scoring.actions";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
    datasetId: string;
    zonesData: any[];
}

export default function ExecuteScoringForm({ datasetId, zonesData }: Props) {
    const { handleSubmit, formState: { isSubmitting } } = useForm();
    const queryClient = useQueryClient();

    const onSubmit = async () => {
        const toastId = toast.loading("Calculando pesos y procesando zonas...");

        try {
            const payload = {
                data: zonesData.map((z) => ({
                    zone_code: z.zone_code || "UNKNOWN",
                    zone_name: z.zone_name || z.zone_code || "",
                    poblacion: Number(z.poblacion) || 0,
                    ingresos: Number(z.ingresos) || 0,
                    competencia: Number(z.competencia) || 0,
                })),
            };

            const response = await executeScoringAction(datasetId, payload);

            if (response.success) {
                toast.success("¡Scoring calculado con éxito!", { id: toastId });
                await queryClient.invalidateQueries({ queryKey: ["ranking", datasetId] });
                await queryClient.refetchQueries({ queryKey: ["ranking", datasetId] });
            } else {
                toast.error(`Falló el cálculo: ${response.error}`, {
                    id: toastId,
                    duration: 5000,
                });
            }
        } catch (error: any) {
            toast.error(`Error crítico: ${error.message}`, { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-end">
            <button
                type="submit"
                disabled={isSubmitting || !zonesData || zonesData.length === 0}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
                {isSubmitting ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Procesando...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Ejecutar Scoring
                    </>
                )}
            </button>
        </form>
    );
}