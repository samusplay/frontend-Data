"use client";

import { processFilePipeline } from "@/app/actions/pipeline.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { UploadMetrics } from "../types/metrics";

export default function DatasetUploader() {
    //inicializamos router
    const router = useRouter();
    //usamos use state
    const [file, setFile] = useState<File | null>(null);
    //use state tarjetas info cabeceras
    const [metrics, setMetrics] = useState<UploadMetrics | null>(null);
    //guardaremos el id
    const [datasetId, setDatasetId] = useState<string | null>(null);

    //manejar el estado de la peticion
    const { mutate, isPending } = useMutation({
        //llamamos al server action
        mutationFn: async (formData: FormData) => {
            const response = await processFilePipeline(formData);
            //manejo de errores
            if (!response.success) {
                throw new Error(response.error);
            }
            return response;
        },
        onSuccess: (data) => {
            //metricas
            if (data?.metrics) {
                setMetrics(data.metrics);
            }
            //comprobante
            if (data?.datasetId) {
                setDatasetId(data.datasetId);
            }
            toast.success(
                `¡Dataset subido y procesado con éxito!`,
                { 
                    duration: 6000,
                    // Magia de estilos para el Toast
                    style: {
                        borderRadius: '10px',
                        background: '#18181b', // zinc-900
                        color: '#fff',
                        border: '1px solid #27272a', // zinc-800
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
                    },
                    iconTheme: {
                        primary: '#10b981', // Verde esmeralda bonito
                        secondary: '#18181b',
                    },
                }
            );
            setFile(null);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // si seleciono
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const ext = selectedFile.name.split('.').pop()?.toLowerCase();
            if (ext !== 'csv' && ext !== 'json') {
                toast.error("Formato no válido. Solo se permiten .csv o .json");
                e.target.value = ''; // Limpiar el input
                return;
            }
            setFile(selectedFile);
        }
    }

    //manejador del envio
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //si no hay archivo
        if (!file) {
            toast.error("Por favor, selecciona un archivo primero.");
            return;
        }
        //empaquetamos y agregamos file 
        const formData = new FormData();
        formData.append("file", file);

        //agregamos la mutacion
        mutate(formData);
    }
    return (
        // Fondo oscuro semitransparente con borde sutil
        <div className="max-w-xl mx-auto mt-12 bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
            
            {/* Cabecera del componente con gradiente de texto sutil y Botón de reinicio */}
            <div className="border-b border-zinc-800 px-6 py-5 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                        {metrics ? "Resumen de Ingesta" : "Ingesta de Datos Territoriales"}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                        {metrics ? "El archivo ha sido validado en memoria y procesado correctamente." : "Sube tu dataset estructurado para iniciar el proceso"}
                    </p>
                </div>
                {/* Botón para reiniciar y subir otro archivo si ya terminamos */}
                {metrics && (
                    <button 
                        onClick={() => { setMetrics(null); setFile(null); setDatasetId(null); }}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                    >
                        Subir otro archivo
                    </button>
                )}
            </div>

            {/* --- RENDERIZADO CONDICIONAL --- */}
            {!metrics ? (
                // --- VISTA 1: FORMULARIO ORIGINAL ---
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
                    {/* Zona de Drag & Drop Oscura */}
                    <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-800/50 hover:border-zinc-500 transition-all duration-300">
                        <input
                            type="file"
                            id="file-upload"
                            accept=".csv, .json"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-3"
                        >
                            <svg className={`w-12 h-12 transition-colors ${file ? 'text-blue-400' : 'text-zinc-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm font-medium text-zinc-300">
                                {file ? (
                                    <span className="text-blue-400 font-semibold">{file.name}</span>
                                ) : (
                                    "Haz clic para seleccionar tu archivo CSV o JSON"
                                )}
                            </span>
                            {file && <span className="text-xs text-emerald-400 font-semibold mt-1 bg-emerald-400/10 px-2 py-1 rounded-full">✓ Archivo listo para subir</span>}
                        </label>
                    </div>

                    {/* Botón de Submit con Degradado */}
                    <button
                        type="submit"
                        disabled={isPending || !file}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 flex justify-center items-center gap-2
                            ${isPending || !file
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
                                : "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-900/20"
                            }`}
                    >
                        {isPending && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isPending ? "Analizando y subiendo..." : "Subir para el Análisis"}
                    </button>
                </form>
            ) : (
                // --- VISTA 2: TARJETA DE MÉTRICAS (NUEVA) ---
                <div className="p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h3 className="font-semibold text-emerald-400">Dataset Procesado</h3>
                            <p className="text-sm text-zinc-400">Estado: {metrics.final_status}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="bg-zinc-800/50 rounded-lg p-4 text-center border border-zinc-700/50">
                            <p className="text-xs text-zinc-500 font-medium mb-1">Total Filas</p>
                            <p className="text-2xl font-bold text-white">{metrics.total_records}</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/20">
                            <p className="text-xs text-blue-400/70 font-medium mb-1">Válidas</p>
                            <p className="text-2xl font-bold text-blue-400">{metrics.valid_records}</p>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-4 text-center border border-red-500/20">
                            <p className="text-xs text-red-400/70 font-medium mb-1">Anómalas</p>
                            <p className="text-2xl font-bold text-red-400">{metrics.invalid_records}</p>
                        </div>
                    </div>

                    {/* 👇 AQUÍ ESTÁ EL BOTÓN DE VIAJE QUE TE FALTABA 👇 */}
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                        <button 
                            onClick={() => router.push(`/dashboard/analisis?datasetId=${datasetId}`)}
                            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
                        >
                            Ver Tabla de Registros
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}