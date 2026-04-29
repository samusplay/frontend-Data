import { z } from 'zod';

// Validamos cada zona que enviaremos al backend
export const ZoneDataSchema = z.object({
  zone_code: z.string(),
  zone_name: z.string().optional(),
  poblacion: z.number().default(0),
  ingresos: z.number().default(0),
  competencia: z.number().default(0),
});

// Validamos el cuerpo completo de la petición
export const ScoringRequestSchema = z.object({
  data: z.array(ZoneDataSchema)
});

export type ScoringRequest = z.infer<typeof ScoringRequestSchema>;