"use client";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@/app/actions/ranking.actions";
import type { RankingResult } from "@/app/actions/ranking.actions";

export function useRanking(datasetId: string | null) {
  return useQuery<RankingResult>({
    queryKey: ["ranking", datasetId],
    queryFn: () => getRanking(datasetId!),
    enabled: !!datasetId,
    retry: false  // si no hay score no reintenta
  });
}