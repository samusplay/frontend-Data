import React from 'react';
import { Home, Database, BarChart3, Settings, LogOut, Map } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Inicio', active: true },
    { icon: Map, label: 'Zonas', active: false },
    { icon: Database, label: 'Ingesta de Datos', active: false },
    { icon: BarChart3, label: 'Reportes', active: false },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-slate-900 text-white h-screen">
      <div className="flex items-center justify-center h-16 bg-slate-950 px-4 shadow-md">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent truncate">
          Plataforma Analítica
        </h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href="#"
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon
                  className={`mr-3 w-5 h-5 flex-shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}
                />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <a href="#" className="flex items-center px-3 py-3 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="mr-3 w-5 h-5 text-slate-400" />
            Configuración
          </a>
          <a href="#" className="flex items-center px-3 py-3 text-sm font-medium rounded-md text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors mt-1">
            <LogOut className="mr-3 w-5 h-5 text-red-500" />
            Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}
