"use client";

import { useEffect, useState } from "react";
import { useZones } from "../hooks/useZones";
import type { ZonesSuccess } from "../types/zones.types";
import toast from "react-hot-toast";

export default function Zonas() {
  const { data, isLoading, isError } = useZones();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // CA 5: toast fuera del render
  useEffect(() => {
    if (isError) {
      toast.error("No se pudo cargar la lista de zonas en este momento");
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-white">Cargando zonas...</p>;
  }

  // CA 5: error de red
  if (isError || !data) {
    return (
      <p className="text-red-400">
        No se pudo cargar la lista de zonas en este momento
      </p>
    );
  }

  // CA 5: error controlado desde la action — type guard
  if ("error" in data) {
    return (
      <p className="text-red-400">{data.error}</p> // data es ZonesError ✅
    );
  }

  // Aquí TypeScript sabe que data es ZonesSuccess ✅
  const zones: ZonesSuccess["data"] = data.data;

  // CA 2: estado vacío
  if (zones.length === 0) {
    return (
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Zonas disponibles
        </h2>
        <p className="text-zinc-400">Aún no hay zonas cargadas</p>
      </div>
    );
  }

  // CA 1 + CA 4: lista con selección visual
  return (
    <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        Zonas disponibles
      </h2>

      {selectedZone && (
        <p className="text-sm text-emerald-400 mb-3">
          Zona seleccionada:{" "}
          <span className="font-semibold">{selectedZone}</span>
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {zones.map((zone, index) => ( // zone: string ✅  index: number ✅
          <li
            key={index}
            onClick={() => setSelectedZone(zone)}
            className={`p-3 border rounded-lg text-white cursor-pointer transition-colors ${
              selectedZone === zone
                ? "bg-emerald-700 border-emerald-500"
                : "bg-zinc-950 border-zinc-700 hover:border-zinc-500"
            }`}
          >
            {zone}
          </li>
        ))}
      </ul>
    </div>
  );
}