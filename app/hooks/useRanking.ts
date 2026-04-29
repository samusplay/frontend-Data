"use client";
import { useQuery } from "@tanstack/react-query";
import type { RankingResult } from "../actions/ranking.actions";
import { getRanking } from "../actions/ranking.actions";

export function useRanking(datasetId: string) {
  return useQuery<RankingResult>({
    queryKey: ["ranking", datasetId], // incluye datasetId para cachear por dataset
    queryFn: () => getRanking(datasetId),
    enabled: !!datasetId, // solo ejecuta si hay datasetId
    retry:1
  });
}