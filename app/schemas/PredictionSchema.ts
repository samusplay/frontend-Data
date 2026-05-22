// schemas/prediction.schema.ts
import { z } from "zod"

export const PredictionSchema = z.object({
  success: z.boolean(),
  data: z.object({
    zone_code: z.string(),
    prediction: z.object({
      potential_value: z.number(),
      confidence_score: z.number(),
      business_label: z.string(),
      color_code: z.string(),
    }),
    model_reference: z.string(),
  }).nullable(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }).nullable(),
  trace_id: z.string(),
})

export type Prediction = z.infer<typeof PredictionSchema>