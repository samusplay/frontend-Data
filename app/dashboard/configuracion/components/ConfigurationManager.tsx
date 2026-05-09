"use client";

import { saveProfile, updateProfile, deleteProfile } from "@/app/actions/profiles.actions";
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
  const [editingId, setEditingId] = useState<number | null>(null);

  const handlePoblacionChange = (val: number) => {
    setPoblacion(val);
    if (val === 0) {
      setIngresos(0);
    }
  };

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
      let result;
      if (editingId) {
        result = await updateProfile(editingId, validation.data);
      } else {
        result = await saveProfile(validation.data);
      }

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(editingId ? "Perfil actualizado" : "Configuración actualizada correctamente");
      setNombrePerfil("");
      setEditingId(null);
      router.refresh();
    });
  };

  const handleEdit = (profile: BusinessProfile) => {
    setEditingId(profile.id);
    setNombrePerfil(profile.nombre_perfil);
    setPoblacion(profile.peso_poblacion);
    setIngresos(profile.peso_ingresos);
    setCompetencia(profile.peso_competencia);
  };

  const handleDelete = (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este perfil?")) return;
    
    startTransition(async () => {
      const result = await deleteProfile(id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      if (editingId === id) setEditingId(null);
      toast.success("Perfil eliminado");
      router.refresh();
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
          Configuración de Modelo
        </h1>
        <p className="mt-2 text-zinc-400">
          Ajusta los pesos de las variables para definir un perfil de oportunidad de negocio.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* PANEL IZQUIERDO */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Pesos del perfil activo
          </h2>

          <ProfileNameInput value={nombrePerfil} onChange={setNombrePerfil} />

          <SliderField
            label="Población"
            description="Relevancia del volumen de habitantes en la zona (Densidad)."
            value={poblacion}
            onChange={handlePoblacionChange}
            accent="bg-blue-500"
          />
          <SliderField
            label="Ingresos"
            description="Importancia del poder adquisitivo promedio."
            value={ingresos}
            onChange={setIngresos}
            accent="bg-emerald-500"
            disabled={poblacion === 0}
            disabledReason="Al no existir población, no es posible medir ingresos en la zona."
          />
          <SliderField
            label="Competencia"
            description="Peso dado a la cantidad de competidores existentes."
            value={competencia}
            onChange={setCompetencia}
            accent="bg-rose-500"
          />

          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Suma de las variables</span>
              <span
                className={`text-lg font-semibold ${
                  total === 1 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {total.toFixed(2)} / 1.00
              </span>
            </div>

            {total !== 1 && (
              <p className="mt-3 text-sm text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                La suma de los pesos de Población, Ingresos y Competencia debe ser exactamente 1.0
              </p>
            )}

            {/* Aviso si falta el nombre */}
            {total === 1 && nombrePerfil.trim().length === 0 && (
              <p className="mt-3 text-sm text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                Debes ingresar un nombre para el perfil antes de poder guardar.
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={!isValid || isPending}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-blue-700 bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              {isPending ? "Guardando..." : editingId ? "Actualizar Perfil" : "Guardar Perfil"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setNombrePerfil("");
                  setPoblacion(0.4);
                  setIngresos(0.3);
                  setCompetencia(0.3);
                }}
                disabled={isPending}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
            )}
          </div>

          {initialError && (
            <p className="mt-4 text-sm text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">
              Ocurrió un problema: {initialError}
            </p>
          )}
        </section>

        {/* PANEL DERECHO */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Perfiles guardados
          </h2>

          {initialProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30">
              <span className="text-zinc-600 mb-2">📄</span>
              <p className="text-sm text-zinc-500">Aún no hay perfiles registrados.</p>
              <p className="text-xs text-zinc-600 mt-1">Crea tu primer perfil en el panel izquierdo.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {initialProfiles.map((profile) => (
                <article
                  key={profile.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    profile.is_active
                      ? "border-emerald-700 bg-emerald-950/20"
                      : "border-zinc-800 bg-zinc-950/30 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-white text-lg">
                      {profile.nombre_perfil}
                    </strong>
                    {profile.is_active && (
                      <span className="rounded-full border border-emerald-700 bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-400 shadow-sm">
                        Activo
                      </span>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-zinc-400">
                    <div className="bg-zinc-900/50 rounded p-2">
                      <div className="text-zinc-500 mb-1">Población</div>
                      <div className="text-blue-400 font-mono text-sm">{profile.peso_poblacion}</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded p-2">
                      <div className="text-zinc-500 mb-1">Ingresos</div>
                      <div className="text-emerald-400 font-mono text-sm">{profile.peso_ingresos}</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded p-2">
                      <div className="text-zinc-500 mb-1">Competencia</div>
                      <div className="text-rose-400 font-mono text-sm">{profile.peso_competencia}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3 border-t border-zinc-800/80 pt-3">
                    <button
                      onClick={() => handleEdit(profile)}
                      disabled={isPending}
                      className="flex-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded py-1.5 hover:bg-blue-400/20 disabled:opacity-50 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(profile.id)}
                      disabled={isPending}
                      className="flex-1 text-xs font-medium text-rose-400 bg-rose-400/10 rounded py-1.5 hover:bg-rose-400/20 disabled:opacity-50 transition"
                    >
                      Eliminar
                    </button>
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
  description?: string;
  value: number;
  onChange: (value: number) => void;
  accent: string;
  disabled?: boolean;
  disabledReason?: string;
};

function SliderField({ label, description, value, onChange, accent, disabled, disabledReason }: SliderFieldProps) {
  return (
    <div className={`mb-6 ${disabled ? 'opacity-70' : ''}`}>
      <div className="mb-2 flex flex-col">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-200">{label}</label>
          <span className={`text-sm font-mono ${disabled ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {value.toFixed(1)}
          </span>
        </div>
        {description && (
          <span className="text-xs text-zinc-500 mt-1">{description}</span>
        )}
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 transition-all">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          disabled={disabled}
          className={`h-2 w-full ${disabled ? 'cursor-not-allowed grayscale' : 'cursor-pointer'} appearance-none rounded-lg bg-zinc-800 ${accent}`}
        />
        {disabled && disabledReason && (
          <p className="mt-3 text-xs text-amber-500/90 flex items-start gap-1">
            <span>⚠️</span> {disabledReason}
          </p>
        )}
      </div>
    </div>
  );
}