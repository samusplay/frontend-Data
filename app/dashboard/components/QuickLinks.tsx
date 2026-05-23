import Link from "next/link";
import { ReactNode } from "react";

// Iconos (Mismos del Sidebar)
const Icons = {
  Database: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Chart: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Settings: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  AI: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Eval: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Compare: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
};

interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
  colorClass: string;
  icon: () => ReactNode;
  iconBg: string;
}

const LINKS: QuickLinkItem[] = [
  {
    title: "Nueva Ingesta",
    description: "Sube archivos estructurados (.csv, .json) para su validación e inserción en la base de datos temporal.",
    href: "/dashboard/ingesta",
    colorClass: "group-hover:text-blue-400",
    icon: Icons.Database,
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    title: "Módulo de Análisis",
    description: "Consulta zonas procesadas, aplica reglas de negocio y transforma datos para el modelo analítico.",
    href: "/dashboard/analisis",
    colorClass: "group-hover:text-cyan-400",
    icon: Icons.Chart,
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    title: "Configuración del Sistema",
    description: "Ajusta umbrales, parámetros de análisis y gestiona preferencias generales de la aplicación.",
    href: "/dashboard/configuracion",
    colorClass: "group-hover:text-purple-400",
    icon: Icons.Settings,
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    title: "Módulo de IA",
    description: "Entrena modelos predictivos y evalúa el desempeño algorítmico sobre los datasets consolidados.",
    href: "/dashboard/IA",
    colorClass: "group-hover:text-emerald-400",
    icon: Icons.AI,
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    title: "Eval. Integral",
    description: "Genera un dictamen completo cruzando variables sociodemográficas y de competencia en un solo reporte.",
    href: "/dashboard/evaluacion",
    colorClass: "group-hover:text-amber-400",
    icon: Icons.Eval,
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    title: "Predicciones",
    description: "Aplica los modelos de Machine Learning entrenados para inferir la viabilidad comercial de nuevas zonas.",
    href: "/dashboard/predicciones",
    colorClass: "group-hover:text-rose-400",
    icon: Icons.Chart,
    iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  {
    title: "Comparador Funcional",
    description: "Arena de batalla visual para comparar directamente múltiples zonas frente a frente según diversas estrategias.",
    href: "/dashboard/comparadorv",
    colorClass: "group-hover:text-indigo-400",
    icon: Icons.Compare,
    iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  }
];

export default function QuickLinks() {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-zinc-300 mb-6 px-2">Accesos Rápidos a Módulos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {LINKS.map((link, index) => (
          <Link 
            key={index} 
            href={link.href} 
            className="group block bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 transition-colors ${link.iconBg}`}>
              <link.icon />
            </div>
            <h3 className={`text-base font-bold text-white transition-colors ${link.colorClass}`}>
              {link.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed flex-grow">
              {link.description}
            </p>
            <div className="mt-4 flex items-center text-xs font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Acceder al módulo &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}