"use client";

import { getAuditEvents } from "@/app/actions/auditoria.actions";
import { AuditEvent } from "@/app/schemas/auditoria";
import { Activity, AlertCircle, CheckCircle2, Clock, FileText, Search, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuditoriaPage() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await getAuditEvents(50, 0); // Cargamos los últimos 50 eventos
      if (res.success) {
        setEvents(res.data);
      } else {
        setErrorMsg(res.error || "No se pudo cargar la auditoría.");
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white rounded-2xl border border-zinc-900 overflow-hidden">
      {/* Cabecera */}
      <header className="p-6 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Registro de Auditoría</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
              Trazabilidad Inmutable del Sistema
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Buscar Trace ID..." 
              disabled
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-9 p-2 w-64 focus:ring-blue-500 focus:border-blue-500 block opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      </header>

      {/* Cuerpo / Tabla */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <Activity className="w-10 h-10 text-zinc-600 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Recuperando registros...</span>
          </div>
        ) : errorMsg ? (
          <div className="h-full flex flex-col items-center justify-center gap-3 opacity-60">
            <AlertCircle className="w-12 h-12 text-orange-500" />
            <p className="text-orange-400 text-sm font-medium">{errorMsg}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-4 opacity-40">
            <FileText className="w-16 h-16 text-zinc-600" />
            <p className="text-sm font-semibold tracking-wider uppercase text-zinc-500">No hay eventos registrados</p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/30">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900/80 text-[10px] uppercase font-mono tracking-widest text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Tipo de Evento</th>
                  <th className="px-4 py-3 font-medium">Servicio</th>
                  <th className="px-4 py-3 font-medium">Resumen</th>
                  <th className="px-4 py-3 font-medium">Trace ID</th>
                  <th className="px-4 py-3 font-medium text-right">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-4">
                      {ev.status === "SUCCESS" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-zinc-300">
                        {ev.event_type}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-blue-400">
                      {ev.service_name}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                      {ev.event_summary}
                    </td>
                    <td className="px-4 py-4 font-mono text-[10px] text-zinc-500">
                      {ev.trace_id.split("-")[0]}...
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {ev.created_at ? new Date(ev.created_at).toLocaleString() : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
