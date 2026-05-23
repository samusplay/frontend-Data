import { z } from "zod";

const ScoreDeterministicoSchema = z.object({
  zone_name: z.string(),
  score_value: z.number(),
  rank_position: z.number(),
  dataset_id: z.string(),
  execution_id: z.number(),
  score_calculated_at: z.string(),
});

const PotencialPredictivoSchema = z.object({
  potential_value: z.number(),
  confidence_score: z.number(),
  business_label: z.string(),
  color_code: z.string(),
  model_reference: z.string(),
  prediction_generated_at: z.string(),
});

const EvaluacionIntegralDataSchema = z.object({
  zone_code: z.string(),
  score_deterministico: ScoreDeterministicoSchema.nullable(),
  potencial_predictivo: PotencialPredictivoSchema.nullable(),
  evaluacion_completa: z.boolean(),
  analytics_disponible: z.boolean(),
  ml_disponible: z.boolean(),
});

export const EvaluacionIntegralResponseSchema = z.object({
  success: z.boolean(),
  data: EvaluacionIntegralDataSchema.nullable(),
  error: z.any().nullable(),
  trace_id: z.string(),
});

export type EvaluacionIntegralResponse = z.infer<typeof EvaluacionIntegralResponseSchema>;
export type EvaluacionIntegralData = z.infer<typeof EvaluacionIntegralDataSchema>;
