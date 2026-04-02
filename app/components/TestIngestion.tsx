//usamos use server consumir backend y items visuales use clientokey
"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendDataIngesta } from "../actions/ingestion";

//use state
export default function TestIngestion() {
    //use state
    const [texto, setTexto] = useState("Hola desde data")

    //extrameos propiedades mutaciones luego para get querys
    const { mutate, isPending, data } = useMutation({
        //llamamos la funcion de server actions
        mutationFn: (textoInput: string) => sendDataIngesta(textoInput),

        //callbacks
        onSuccess: (respuesta) => {
            if (respuesta.error) {
                //mandamos un toats rojo
                toast.error(respuesta.error, {
                    style: { background: '#3f3f46', color: '#fff' }
                });
            } else if (respuesta.data) {
                //si sale exito
                toast.success('!dato guardado correctamente', {
                    style: { background: '#3f3f46', color: '#10b981' }
                });
                //limpiamos input
                setTexto("");
            }
        },
        onError: (err) => {
            toast.error(`Fallo de red: ${err.message}`);
        }
    });
    return (
        <div className="w-full max-w-md p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Prueba Ingesta</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    //llamamos el use state
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <button
                    //llamamos a la mutacion
                    onClick={() => mutate(texto)}
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                    {/* Luego creamos un componente para los errores */}
                    {isPending ? "Enviando al Gateway..." : "Probar Conexión"}
                </button>
                {data?.data && (
                    <div className="p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-lg text-sm transition-all">
                        ✅ Último registro guardado:<br />
                        <span className="text-emerald-200 block mt-2">
                            <strong>ID:</strong> {data.data.id} <br />
                            <strong>Texto:</strong> {data.data['texto-guardado']}
                        </span>
                    </div>
                )}

            </div>

        </div>
    )

}
