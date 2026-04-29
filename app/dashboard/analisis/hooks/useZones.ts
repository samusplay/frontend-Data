"use client";
import { useQuery } from "@tanstack/react-query";
import { getZones } from "@/app/actions/zones.actions";
import type { ZonesResult } from "@/app/types/zones.types";

export function useZones() {
  return useQuery<ZonesResult>({
    queryKey: ["zones"],
    queryFn: getZones,
  });
}