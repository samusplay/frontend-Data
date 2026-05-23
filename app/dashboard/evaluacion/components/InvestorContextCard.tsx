import { Brain, Building2, Diamond, Info, Map } from "lucide-react";

export function InvestorContextCard() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 relative">
      {/* Brillo de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-8 flex flex-col gap-6 shadow-2xl backdrop-blur-sm z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
            <Map className="w-3 h-3" />
            Análisis territorial
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100 leading-snug tracking-tight">
            Inteligencia territorial<br />
            para decisiones de inversión
          </h2>
        </div>

        {/* Body */}
        <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
          Cada zona combina su realidad matemática actual con la predicción de nuestro
          modelo de IA. El resultado es un diagnóstico completo que te permite identificar
          oportunidades reales — incluso aquellas que los indicadores convencionales no detectan.
        </p>

        <hr className="border-zinc-800/50" />

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4 transition-colors hover:border-emerald-500/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-zinc-200 mb-1.5">Score actual</p>
            <p className="text-xs text-zinc-500 leading-relaxed">La realidad territorial medida hoy con datos determinísticos.</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4 transition-colors hover:border-violet-500/30">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
              <Brain className="w-4 h-4 text-violet-400" />
            </div>
            <p className="text-sm font-medium text-zinc-200 mb-1.5">Potencial IA</p>
            <p className="text-xs text-zinc-500 leading-relaxed">Lo que el modelo detecta como futuro posible de la zona.</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-4 transition-colors hover:border-amber-500/30">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
              <Diamond className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-sm font-medium text-zinc-200 mb-1.5">Diamantes en bruto</p>
            <p className="text-xs text-zinc-500 leading-relaxed">Zonas con score bajo pero alto potencial: la oportunidad oculta.</p>
          </div>
        </div>

        <hr className="border-zinc-800/50" />

        {/* CTA */}
        <p className="text-xs text-zinc-500 flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-zinc-600" />
          Selecciona una zona en el <span className="text-zinc-300 font-medium">ticker superior</span> para ver su evaluación completa.
        </p>

      </div>
    </div>
  );
}