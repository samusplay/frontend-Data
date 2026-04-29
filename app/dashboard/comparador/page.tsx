"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getZones } from "@/app/actions/zones.actions";
import { compareZonesAction } from "@/app/actions/compare.actions";
import toast from "react-hot-toast";

import ZoneSelector from "./components/ZoneSelector";
import ZoneComparator from "./components/ZoneComparator";

export default function ComparadorPage() {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  // Tarea 2: Traer las zonas disponibles con React Query (useQuery)
  const { data: responseZones, isLoading: isZonesLoading } = useQuery({
    queryKey: ["zones_for_comparison"],
    queryFn: async () => await getZones(),
  });

  const availableZones = responseZones?.data || [];

  // Tarea 4: Integración con useMutation de React Query para llamar al BFF
  const { mutate: runComparison, isPending: isComparing } = useMutation({
    mutationFn: (zoneCodes: string[]) => compareZonesAction(zoneCodes),
    onSuccess: (res) => {
      if (res.success && res.data) {
        setComparisonData(res.data);
        toast.success("Comparación completada");
      } else {
        toast.error(res.error || "Fallo en la comparación");
      }
    },
    onError: () => {
      toast.error("Ocurrió un error al comparar las zonas.");
    },
  });

  const handleToggleZone = (zoneCode: string) => {
    setSelectedZones((prev) => {
      if (prev.includes(zoneCode)) {
        return prev.filter((code) => code !== zoneCode);
      } else {
        // CA 1: Límite máximo de 4 zonas
        if (prev.length >= 4) {
          toast.error("Máximo 4 zonas permitidas para no saturar la visualización");
          return prev;
        }
        return [...prev, zoneCode];
      }
    });
  };

  const handleCompare = () => {
    if (selectedZones.length < 2) return;
    runComparison(selectedZones);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Comparador Funcional
        </h1>
        <p className="text-zinc-400 mt-2">
          Selecciona de 2 a 4 zonas para contrastar sus indicadores y tomar decisiones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tarea 2: Componente Selector de Zonas (Multi-Select) */}
        <ZoneSelector
          availableZones={availableZones}
          selectedZones={selectedZones}
          onToggleZone={handleToggleZone}
          isLoading={isZonesLoading}
          onCompareClick={handleCompare}
          isComparing={isComparing}
        />

        {/* Tarea 3: Interfaz Visual de Comparación */}
        <div className="col-span-3">
          <ZoneComparator comparisonData={comparisonData} />
        </div>
      </div>
    </div>
  );
}
