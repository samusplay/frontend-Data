import { z } from 'zod';

// Contrato de la respuesta del backend
export const ZonesResponseSchema = z.object({
  data: z.object({
    //Como es una lista de zonas entonces se pone como un arreglo de Strings
    zones: z.array(z.string())
  })
});

// TypeScript type automático desde Zod
export type ZonesResponse = z.infer<typeof ZonesResponseSchema>;