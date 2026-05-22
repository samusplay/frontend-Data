"use client";

import { useState } from "react";

import RankingTable from "@/app/dashboard/analisis/components/RankingTable";

import ZonasList from "@/app/dashboard/analisis/components/zonas";

import { ZoneItem } from "@/app/schemas/zones";

type Props = {
  zones: ZoneItem[];
};

export default function ZonasIAComponent({
  zones,
}: Props) {

  const [selectedZoneCode, setSelectedZoneCode] =
    useState<string | null>(null);

  const [rankingData, setRankingData] =
    useState<any[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isError, setIsError] =
    useState(false);

  async function handleZoneSelect(
    zoneCode: string,
    zoneName: string
  ) {

    try {

      setSelectedZoneCode(zoneCode);

      setIsLoading(true);

      setIsError(false);

      // Simulación temporal
      const transformedData = [
        {
          rank: 1,

          zone_code: zoneCode,

          zone_name: zoneName,

          score: Math.random(),
        },
      ];

      setRankingData(transformedData);

    } catch (error) {

      console.error(error);

      setIsError(true);

    } finally {

      setIsLoading(false);
    }
  }

  return (

    <div className="space-y-8">

      <ZonasList
        data={zones}
        onZoneSelect={handleZoneSelect}
      />

      <RankingTable
        data={rankingData}
        isLoading={isLoading}
        isError={isError}
        selectedZoneCode={selectedZoneCode}
      />

    </div>
  );
}