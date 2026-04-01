"use client";

import { useZones } from "../hooks/useZones";
import toast from "react-hot-toast";

export default function Zonas() {
  // usamos el hook de TanStack (query)
  const { data, isLoading, isError, error } = useZones();

  // loading
  if (isLoading) {
    return <p className="text-white">Cargando zonas...</p>;
  }

  // error de red
  if (isError) {
    toast.error("No se pudo conectar con el servidor");
    return <p className="text-red-400">Error al cargar zonas</p>;
  }

  // error controlado desde action
  if (!data || "error" in data) {
    return (
      <p className="text-red-400">
        {data?.error || "Error inesperado"}
      </p>
    );
  }

  // estado vacío
  if (data.data.length === 0) {
    return (
      <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Zonas disponibles
        </h2>
        <p className="text-zinc-400">Aún no hay zonas cargadas</p>
      </div>
    );
  }

  // estado exitoso
  return (
    <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        Zonas disponibles
      </h2>

      <ul className="flex flex-col gap-2">
        {data.data.map((zone, index) => (
          <li
            key={index}
            className="p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-white"
          >
            {zone}
          </li>
        ))}
      </ul>
    </div>
  );
}