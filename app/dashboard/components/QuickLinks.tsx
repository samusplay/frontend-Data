import Link from "next/link";

interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
  colorClass: string;
  bgHover: string;
}

const LINKS: QuickLinkItem[] = [
  {
    title: "Nueva Ingesta",
    description: "Sube archivos y valida datos.",
    href: "/dashboard/ingesta",
    colorClass: "text-blue-400 group-hover:text-blue-300",
    bgHover: "hover:bg-blue-500/5 hover:border-blue-500/30",
  },
  {
    title: "Módulo de Análisis",
    description: "Genera scoring y planes de acción.",
    href: "/dashboard/analisis",
    colorClass: "text-cyan-400 group-hover:text-cyan-300",
    bgHover: "hover:bg-cyan-500/5 hover:border-cyan-500/30",
  },
  {
    title: "Configuración",
    description: "Ajusta umbrales y preferencias.",
    href: "/dashboard/configuracion",
    colorClass: "text-purple-400 group-hover:text-purple-300",
    bgHover: "hover:bg-purple-500/5 hover:border-purple-500/30",
  }
];

export default function QuickLinks() {
  return (
    <div className="flex flex-col gap-3 p-2">
      {LINKS.map((link, index) => (
        <Link 
          key={index} 
          href={link.href} 
          className={`group relative block rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-300 ${link.bgHover}`}
        >
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-semibold transition-colors ${link.colorClass}`}>
              {link.title}
            </h3>
            <svg 
              className={`w-4 h-4 transform opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 ${link.colorClass}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
            {link.description}
          </p>
        </Link>
      ))}
    </div>
  );
}