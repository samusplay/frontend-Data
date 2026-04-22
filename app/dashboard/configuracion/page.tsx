"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ConfiguracionPage() {
  const [poblacion, setPoblacion] = useState(0.4);
  const [ingresos, setIngresos] = useState(0.3);
  const [competencia, setCompetencia] = useState(0.3);

  const total = poblacion + ingresos + competencia;

  const queryClient = useQueryClient();

  // 🔥 GET perfiles
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8004/api/v1/profiles/");
      return res.json();
    },
  });


  // 🔥 MUTATION PRO (POST o PUT automático)
  const mutation = useMutation({
  mutationFn: async () => {

    const activeProfiles = profiles?.filter((p: any) => p.is_active);

    // 🔴 desactivar los activos
    if (activeProfiles?.length > 0) {
      await Promise.all(
        activeProfiles.map((profile: any) =>
          fetch(`http://127.0.0.1:8004/api/v1/profiles/${profile.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...profile,
              is_active: false,
            }),
          })
        )
      );
    }

    // 🟢 crear nuevo activo
    const res = await fetch("http://127.0.0.1:8004/api/v1/profiles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_perfil: "Perfil Activo",
        peso_poblacion: poblacion,
        peso_ingresos: ingresos,
        peso_competencia: competencia,
        is_active: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail);
    }

    return data;
  }
});

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Configuración de Perfil</h1>

      <div>
        <label>Población: {poblacion}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={poblacion}
          onChange={(e) => setPoblacion(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Ingresos: {ingresos}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={ingresos}
          onChange={(e) => setIngresos(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Competencia: {competencia}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={competencia}
          onChange={(e) => setCompetencia(Number(e.target.value))}
        />
      </div>

      <h3>Total: {total.toFixed(2)}</h3>

      {total !== 1 && (
        <p style={{ color: "red" }}>
          ⚠️ La suma debe ser igual a 1.0
        </p>
      )}

      <button
        onClick={() => mutation.mutate()}
        disabled={total !== 1}
        style={{
          marginTop: "10px",
          padding: "10px",
          cursor: total !== 1 ? "not-allowed" : "pointer",
        }}
      >
        Guardar Perfil
      </button>

      <h2 style={{ marginTop: "20px" }}>Perfiles guardados</h2>

      {isLoading && <p>Cargando...</p>}

      {profiles?.map((profile: any) => (
        <div
          key={profile.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <p>
            <strong>{profile.nombre_perfil}</strong>
            {profile.is_active && " 🟢 Activo"}
          </p>
          <p>Población: {profile.peso_poblacion}</p>
          <p>Ingresos: {profile.peso_ingresos}</p>
          <p>Competencia: {profile.peso_competencia}</p>
        </div>
      ))}
    </div>
  );
}