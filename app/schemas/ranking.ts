import { z } from 'zod';

export const RankingItemSchema = z.object({
  zone_code: z.string(),
  score: z.number(),
  rank: z.number()
});

export const RankingResponseSchema = z.object({
  success: z.boolean(),
  dataset_id: z.string(),
  execution_id: z.number(),
  zones: z.array(RankingItemSchema)
});

export type RankingItem = z.infer<typeof RankingItemSchema>;
export type RankingResponse = z.infer<typeof RankingResponseSchema>;