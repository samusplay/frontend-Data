// app/schemas/ml.ts
import { z } from "zod"

// Schema de cada factor del modelo
const MainFactorSchema = z.object({
  factor: z.string(),
  impact: z.string(),
  weight: z.number().nullable()
})

// Schema de cada zona con su predicción
const ZoneMLResultSchema = z.object({
  zone_code: z.string(),
  potential_score: z.number(),
  confidence: z.number(),
  interpretation: z.object({
    label: z.string(),
    business_summary: z.string()
  }),
  color_code: z.string(),
  model_evidence: z.object({
    algorithm: z.string(),
    main_factors: z.array(MainFactorSchema)
  })
})

// Schema completo de la respuesta del motor de ML
export const MLScoringResponseSchema = z.object({
  success: z.boolean().default(false),
  dataset_id: z.string(),
  algorithm_used: z.string(),
  execution_time_ms: z.number(),
  data: z.array(ZoneMLResultSchema),
  model_metrics: z.object({
    n_zones: z.number(),
    r2_score: z.number(),
    feature_importances: z.record(z.string(), z.number()).optional(),
    model: z.string().optional()
  })
})

// Inferimos los tipos desde Zod — una sola fuente de verdad
export type MLScoringResponse = z.infer<typeof MLScoringResponseSchema>
export type ZoneMLResult = z.infer<typeof ZoneMLResultSchema>
export type MLStrategy = "linear" | "knn" | "gradient_boosting" | "random_forest"