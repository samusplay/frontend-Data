import { z } from 'zod';
//Respuesta de la api

export const DatasetResponseSchema=z.object({
    success:z.boolean(),
    data:z.object({
        dataset_load_id:z.string(),
        trace_id:z.string().optional()
    }).nullable().optional(),
    error:z.string().nullable().optional()
});

//Type del onjeto de zod
export type DatasetResponse=z.infer<typeof DatasetResponseSchema>