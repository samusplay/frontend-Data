import { ReactNode } from "react";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row text-white">
      <Sidebar />

      {/* Agregamos flex flex-col para que el footer se vaya al fondo */}
      <main className="flex-1 p-8 overflow-y-auto w-full flex flex-col">
        {/* El contenido de la página ocupa el espacio disponible */}
        <div className="grow">
          {children}
        </div>
        
        {/* Inyectamos nuestro nuevo Footer */}
        <Footer />
      </main>
    </div>
  );
}