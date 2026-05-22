"use client";

import { saveProfile } from "@/app/actions/profiles.actions";
import {
  BusinessProfile,
  BusinessProfileInputSchema,
} from "@/app/schemas/profiles";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import ProfileNameInput from "./ProfileNameInput";

type ConfigurationManagerProps = {
  initialProfiles: BusinessProfile[];
  initialError?: string;
};

export default function ConfigurationManager({
  initialProfiles,
  initialError,
}: ConfigurationManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [poblacion, setPoblacion] = useState(0.4);
  const [ingresos, setIngresos] = useState(0.3);
  const [competencia, setCompetencia] = useState(0.3);
  const [nombrePerfil, setNombrePerfil] = useState("");

  const total = Number((poblacion + ingresos + competencia).toFixed(2));
  const isValid = total === 1 && nombrePerfil.trim().length > 0;

  const handleSave = () => {
    const payload = {
      nombre_perfil: nombrePerfil.trim(),
      peso_poblacion: poblacion,
      peso_ingresos: ingresos,
      peso_competencia: competencia,
      is_active: true,
    };

    const validation = BusinessProfileInputSchema.safeParse(payload);

    if (!validation.success) {
      toast.error(
        validation.error.issues[0]?.message || "La configuración no es válida"
      );
      return;
    }

    startTransition(async () => {
      const result = await saveProfile(validation.data);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Configuración actualizada correctamente");
      setNombrePerfil("");
      router.refresh();
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
          Configuración de Modelo
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Ajusta los pesos del modelo para controlar el análisis de oportunidad.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* PANEL IZQUIERDO */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            Pesos del perfil activo
          </h2>

          <ProfileNameInput value={nombrePerfil} onChange={setNombrePerfil} />

          <SliderField
            label="Población"
            value={poblacion}
            onChange={setPoblacion}
            accent="bg-blue-500"
          />
          <SliderField
            label="Ingresos"
            value={ingresos}
            onChange={setIngresos}
            accent="bg-emerald-500"
          />
          <SliderField
            label="Competencia"
            value={competencia}
            onChange={setCompetencia}
            accent="bg-rose-500"
          />

          <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Suma total</span>
              <span
                className={`text-lg font-semibold ${
                  total === 1 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {total.toFixed(2)}
              </span>
            </div>

            {total !== 1 && (
              <p className="mt-3 text-sm text-rose-400">
                La suma de los pesos debe ser igual a 1.0
              </p>
            )}

            {/* Aviso si falta el nombre */}
            {total === 1 && nombrePerfil.trim().length === 0 && (
              <p className="mt-3 text-sm text-amber-400">
                Ingresa un nombre para el perfil antes de guardar.
              </p>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!isValid || isPending}
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-blue-700 bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {isPending ? "Guardando..." : "Guardar Perfil"}
          </button>

          {initialError && (
            <p className="mt-4 text-sm text-amber-400">
              No se pudieron cargar perfiles previos: {initialError}
            </p>
          )}
        </section>

        {/* PANEL DERECHO */}
        <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Perfiles guardados
          </h2>

          {initialProfiles.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Aún no hay perfiles registrados.
            </p>
          ) : (
            <div className="space-y-3">
              {initialProfiles.map((profile) => (
                <article
                  key={profile.id}
                  className={`rounded-xl border p-4 ${
                    profile.is_active
                      ? "border-emerald-400/50 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/20"
                      : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-white">
                      {profile.nombre_perfil}
                    </strong>
                    {profile.is_active && (
                      <span className="rounded-full border border-emerald-700 px-2 py-1 text-xs text-emerald-400">
                        Activo
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-zinc-400">
                    <p>Población: {profile.peso_poblacion}</p>
                    <p>Ingresos: {profile.peso_ingresos}</p>
                    <p>Competencia: {profile.peso_competencia}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  accent: string;
};

function SliderField({ label, value, onChange, accent }: SliderFieldProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950/60 p-4">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-300 dark:bg-zinc-800 ${accent}`}
        />
      </div>
    </div>
  );
}