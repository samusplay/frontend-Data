import { z } from 'zod';

// --- Esquema de Entrada (Lo que enviamos) ---
export const ComparisonRequestSchema = z.object({
  dataset_id: z.string().uuid("El ID del dataset debe ser un UUID válido"),
  zone_codes: z.array(z.string()).min(2, "Selecciona al menos 2 zonas para comparar").max(4, "Máximo 4 zonas"),
  ml_strategy: z.string().min(1, "La estrategia es requerida"),
});

// --- Esquemas de Salida (Lo que recibimos) ---
const DeltaSchema = z.object({
  metric_name: z.string(),
  difference: z.number(),
  is_advantage: z.boolean(),
});

const EnrichedZoneSchema = z.object({
  zone_code: z.string(),
  zone_name: z.string(),
  analytics_data: z.record(z.string(), z.number()),
  ml_potential: z.number(),
  deltas: z.array(DeltaSchema),
});

export const ComparisonResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(EnrichedZoneSchema),
  verdict: z.object({
    ranking: z.array(z.string()),
    winner_code: z.string(),
    justification_text: z.string(),
    main_competitive_advantage: z.object({
      metric_name: z.string(),
      delta_vs_second: z.number(),
    }).optional(),
  }),
});

// Tipos inferidos para TypeScript
export type ComparisonRequest = z.infer<typeof ComparisonRequestSchema>;
export type ComparisonResponse = z.infer<typeof ComparisonResponseSchema>;
export type EnrichedZone = z.infer<typeof EnrichedZoneSchema>;