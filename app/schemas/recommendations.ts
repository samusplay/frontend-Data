import { z } from "zod";

export const ActionableRecommendationSchema = z.object({
  factor: z.string(),
  impact: z.string(),
  weight: z.number(),
  action_text: z.string(),
});

export const ZoneRecommendationSchema = z.object({
  zone_code: z.string(),
  zone_name: z.string(),
  current_score: z.number(),
  potential_value: z.number(),
  business_label: z.string(),
  top_recommendations: z.array(ActionableRecommendationSchema),
});

export const RecommendationResponseSchema = z.object({
  success: z.boolean(),
  data: ZoneRecommendationSchema.nullable(),
  error: z.string().nullable(),
  trace_id: z.string(),
});

// Tipos inferidos para usar en componentes
export type ActionableRecommendation = z.infer<typeof ActionableRecommendationSchema>;
export type ZoneRecommendation = z.infer<typeof ZoneRecommendationSchema>;
export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>;