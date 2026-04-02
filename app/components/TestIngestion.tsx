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
                    style: { background: '#fff', color: '#ef4444', border: '1px solid #fee2e2' }
                });
            } else if (respuesta.data) {
                //si sale exito
                toast.success('!dato guardado correctamente', {
                    style: { background: '#fff', color: '#10b981', border: '1px solid #d1fae5' }
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
        <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-xl mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prueba Ingesta</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    //llamamos el use state
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <button
                    //llamamos a la mutacion
                    onClick={() => mutate(texto)}
                    disabled={isPending}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-50"
                >
                    {/* Luego creamos un componente para los errores */}
                    {isPending ? "Enviando al Gateway..." : "Probar Conexión"}
                </button>
                {data?.data && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm transition-all mt-4">
                        ✅ Último registro guardado:<br />
                        <span className="text-emerald-700 block mt-2">
                            <strong>ID:</strong> {data.data.id} <br />
                            <strong>Texto:</strong> {data.data['texto-guardado']}
                        </span>
                    </div>
                )}

            </div>

        </div>
    )

}
