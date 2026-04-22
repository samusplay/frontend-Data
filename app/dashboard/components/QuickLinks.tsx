import Link from "next/link";

interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
  hoverColor: string; 
}

// Lista de módulos del Dashboard
const LINKS: QuickLinkItem[] = [
  {
    title: "Nueva Ingesta",
    description: "Sube archivos estructurados (.csv, .json) para su validación e inserción en la base de datos temporal.",
    href: "/dashboard/ingesta",
    hoverColor: "group-hover:text-blue-400",
  },
  {
    title: "Módulo de Análisis",
    description: "Consulta zonas procesadas, aplica reglas de negocio y transforma datos para el modelo analítico.",
    href: "/dashboard/analisis",
    hoverColor: "group-hover:text-cyan-400",
  },
  {
    title: "Configuración del Sistema",
    description: "Ajusta umbrales, parámetros de análisis y gestiona preferencias generales de la aplicación.",
    href: "/dashboard/configuracion", 
    hoverColor: "group-hover:text-purple-400",
  }
];

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
      {LINKS.map((link, index) => (
        <Link 
          key={index} 
          href={link.href} 
          className="group block bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md"
        >
          <h3 className={`text-lg font-bold text-white transition-colors ${link.hoverColor}`}>
            {link.title} &rarr;
          </h3>
          <p className="text-sm text-zinc-400 mt-2">
            {link.description}
          </p>
        </Link>
      ))}
    </div>
  );
}