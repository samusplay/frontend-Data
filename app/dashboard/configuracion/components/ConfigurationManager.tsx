"use client";

import { deleteProfile, saveProfile, updateProfile } from "@/app/actions/profiles.actions";
import {
  BusinessProfile,
  BusinessProfileInputSchema,
} from "@/app/schemas/profiles";
import { AlertCircle, BookOpen, DollarSign, Info, Swords, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import ProfileNameInput from "./ProfileNameInput";

type ConfigurationManagerProps = {
  initialProfiles: BusinessProfile[];
  initialError?: string;
};

// ─── Metadatos explicativos de cada peso ─────────────────────────────────────
const WEIGHT_META = {
  poblacion: {
    label: "Población",
    icon: Users,
    accent: "blue",
    description:
      "¿Cuánta gente vive en la zona? Una zona con más habitantes tiene mayor mercado potencial. " +
      "Si no hay población, no existe ningún cliente ni competidor posible.",
    warning: null as string | null,
    hint: "Es la base de todo: sin población no hay mercado.",
  },
  ingresos: {
    label: "Ingresos",
    icon: DollarSign,
    accent: "emerald",
    description:
      "¿Cuánto gana la gente de esa zona? Un alto ingreso per cápita significa que los habitantes " +
      "tienen poder adquisitivo para consumir tu producto o servicio.",
    warning: "Requiere que la Población sea mayor a 0.",
    hint: "Sin gente con dinero no hay ventas posibles.",
  },
  competencia: {
    label: "Competencia",
    icon: Swords,
    accent: "rose",
    description:
      "¿Cuántos competidores ya operan en la zona? Un peso alto aquí penaliza las zonas " +
      "saturadas y premia las zonas vírgenes con pocas opciones para el consumidor.",
    warning: "Requiere que la Población sea mayor a 0.",
    hint: "A mayor competencia, más difícil ganar mercado.",
  },
};

const ACCENT_CLASSES: Record<string, { bar: string; badge: string; border: string; text: string }> = {
  blue: {
    bar: "bg-blue-500",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    border: "border-blue-500/40",
    text: "text-blue-400",
  },
  emerald: {
    bar: "bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
  },
  rose: {
    bar: "bg-rose-500",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    border: "border-rose-500/40",
    text: "text-rose-400",
  },
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

  // ── Regla de dependencia: Si población = 0, resetear ingresos y competencia ──
  useEffect(() => {
    if (poblacion === 0) {
      setIngresos(0);
      setCompetencia(0);
    }
  }, [poblacion]);

  const total = Number((poblacion + ingresos + competencia).toFixed(2));
  const isZeroPopulation = poblacion === 0;
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
      toast.error(validation.error.issues[0]?.message || "La configuración no es válida");
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

      toast.success(editingId ? "Perfil actualizado" : "Configuración guardada correctamente");
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
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Configuración de Modelo
          </h1>
        </div>
        <p className="mt-2 text-zinc-400 text-sm leading-relaxed max-w-2xl">
          Define qué factores importan más para tu negocio. El modelo de IA usará estos pesos para
          calcular el potencial de cada zona territorial. La suma debe ser siempre <strong className="text-white">1.0</strong>.
        </p>
      </div>

      {/* Aviso contextual sobre la regla de dependencia */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <BookOpen className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-amber-300 mb-0.5">Regla de negocio</p>
          <p className="text-sm text-zinc-400">
            <strong className="text-amber-400">Población</strong> es la variable fundamental: sin habitantes,
            no puede haber Ingresos ni Competencia. Si ajustas Población a 0, los demás pesos
            se bloquearán automáticamente en 0.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* ── PANEL IZQUIERDO: Editor ─────────────────────────────────────── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="mb-5 text-lg font-semibold text-white flex items-center gap-2">
            {editingId ? "Editando perfil" : "Nuevo perfil"}
            {editingId && (
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Modo edición
              </span>
            )}
          </h2>

          <ProfileNameInput value={nombrePerfil} onChange={setNombrePerfil} />

          {/* Sliders */}
          <div className="space-y-5 mt-2">
            <SliderField
              id="peso-poblacion"
              meta={WEIGHT_META.poblacion}
              value={poblacion}
              onChange={setPoblacion}
              disabled={false}
            />
            <SliderField
              id="peso-ingresos"
              meta={WEIGHT_META.ingresos}
              value={ingresos}
              onChange={setIngresos}
              disabled={isZeroPopulation}
            />
            <SliderField
              id="peso-competencia"
              meta={WEIGHT_META.competencia}
              value={competencia}
              onChange={setCompetencia}
              disabled={isZeroPopulation}
            />
          </div>

          {/* Indicador de suma */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-zinc-400">Suma total de pesos</span>
              <span className={`text-xl font-bold font-mono ${total === 1 ? "text-emerald-400" : "text-rose-400"}`}>
                {total.toFixed(2)}
                <span className="text-sm font-normal ml-1 text-zinc-500">/ 1.00</span>
              </span>
            </div>

            {/* Barra de progreso visual */}
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${total > 1 ? "bg-rose-500" : total === 1 ? "bg-emerald-500" : "bg-blue-500"}`}
                style={{ width: `${Math.min(total * 100, 100)}%` }}
              />
            </div>

            {total !== 1 && (
              <p className="mt-3 text-sm text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {total > 1
                  ? `Excede el límite en ${(total - 1).toFixed(2)}. Reduce algún peso.`
                  : `Falta ${(1 - total).toFixed(2)} para completar el 100%.`}
              </p>
            )}

            {total === 1 && nombrePerfil.trim().length === 0 && (
              <p className="mt-3 text-sm text-amber-400 flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                Ingresa un nombre para el perfil antes de guardar.
              </p>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              id="btn-guardar-perfil"
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
            <p className="mt-4 text-sm text-amber-400">
              No se pudieron cargar perfiles previos: {initialError}
            </p>
          )}
        </section>

        {/* ── PANEL DERECHO: Perfiles guardados ────────────────────────────── */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Perfiles guardados</h2>

          {initialProfiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-zinc-800 mb-3">
                <BookOpen className="w-6 h-6 text-zinc-500" />
              </div>
              <p className="text-sm text-zinc-500">Aún no hay perfiles registrados.</p>
              <p className="text-xs text-zinc-600 mt-1">Crea uno con el panel izquierdo.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {initialProfiles.map((profile) => (
                <article
                  key={profile.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    profile.is_active
                      ? "border-emerald-700 bg-emerald-950/20"
                      : "border-zinc-800 bg-zinc-950/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <strong className="text-white text-sm truncate">{profile.nombre_perfil}</strong>
                    {profile.is_active && (
                      <span className="shrink-0 rounded-full border border-emerald-700 px-2 py-0.5 text-xs text-emerald-400">
                        Activo
                      </span>
                    )}
                  </div>
                  {/* Mini-barras de pesos */}
                  <div className="space-y-2">
                    {[
                      { key: "poblacion", label: "Pob.", val: profile.peso_poblacion, color: "bg-blue-500" },
                      { key: "ingresos", label: "Ing.", val: profile.peso_ingresos, color: "bg-emerald-500" },
                      { key: "competencia", label: "Comp.", val: profile.peso_competencia, color: "bg-rose-500" },
                    ].map(({ key, label, val, color }) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 w-10 shrink-0">{label}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div className={`h-full rounded-full ${color}`} style={{ width: `${val * 100}%` }} />
                        </div>
                        <span className="text-xs font-mono text-zinc-400 w-8 text-right">{val.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3 border-t border-zinc-800 pt-3">
                    <button
                      onClick={() => handleEdit(profile)}
                      disabled={isPending}
                      className="text-xs font-medium text-blue-400 hover:text-blue-300 disabled:opacity-50"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(profile.id)}
                      disabled={isPending}
                      className="text-xs font-medium text-rose-400 hover:text-rose-300 disabled:opacity-50"
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

// ─── SliderField con tooltip y bloqueo ───────────────────────────────────────
type SliderMeta = typeof WEIGHT_META[keyof typeof WEIGHT_META];

type SliderFieldProps = {
  id: string;
  meta: SliderMeta;
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

function SliderField({ id, meta, value, onChange, disabled }: SliderFieldProps) {
  const [showInfo, setShowInfo] = useState(false);
  const { label, icon: Icon, accent, description, warning, hint } = meta;
  const ac = ACCENT_CLASSES[accent];

  return (
    <div className={`rounded-xl border p-4 transition-all ${disabled ? "border-zinc-800/50 opacity-50" : `border-zinc-800 hover:${ac.border}`}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${ac.text}`} />
          <label htmlFor={id} className="text-sm font-semibold text-zinc-200">
            {label}
          </label>
          {disabled && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700 uppercase tracking-wider">
              Bloqueado
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${ac.badge}`}>
            {(value * 100).toFixed(0)}%
          </span>
          <button
            type="button"
            onClick={() => setShowInfo((s) => !s)}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
            title="Más información"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Descripción expandible */}
      {showInfo && (
        <div className="mb-3 mt-2 rounded-lg bg-zinc-950/60 border border-zinc-700/50 p-3">
          <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
          {warning && disabled && (
            <p className="mt-1.5 text-xs text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3" /> {warning}
            </p>
          )}
        </div>
      )}

      {/* Hint siempre visible */}
      <p className="text-[11px] text-zinc-600 mb-3">{hint}</p>

      {/* Slider */}
      <input
        id={id}
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-${accent}-500 disabled:cursor-not-allowed`}
      />

      {/* Escala visual */}
      <div className="flex justify-between mt-1 px-0.5">
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => (
          <span key={v} className={`text-[9px] ${value === v ? ac.text : "text-zinc-700"}`}>
            {v === 0 ? "0" : v === 1 ? "1" : v.toFixed(1)}
          </span>
        ))}
      </div>
    </div>
  );
}