"use client";
import { useQuery } from "@tanstack/react-query";
import { getZones } from "@/actions/zones.actions";
import type { ZonesResult } from "@/types/zones.types"; // 👈 importar

export function useZones() {
  return useQuery<ZonesResult>({ // 👈 genérico explícito
    queryKey: ["zones"],
    queryFn: getZones,
  });
}