'use server'

import { apiClient } from "../lib/apiClient";
import { DatasetResponseSchema } from "../schemas/ingestion";



export async function senDataIngesta(formData: FormData) {
    //extraemos el archivo
    const file = formData.get("file") as File | null;

    //si mando algo erroneo
    if (!file || file.size === 0) {
        return { error: "Debe seleccionar un archivo válido y que no esté vacío." }
    }
    //validamos extension
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'csv' && ext !== 'json') {
        return { error: "Formato no válido. Por favor suba un archivo CSV o JSON." };
    }
    //llamada de ApiGateway
    try {
        //detecta que es un FormData
        const rawJson = await apiClient('/api/v1/ingesta/datasets', {
            method: 'POST',
            body: formData
        });
        //validamos la salida
        const validationOutput = DatasetResponseSchema.safeParse(rawJson)
        //si la validacion no es correcta
        if (!validationOutput.success) {
            //console.error("Error en el contrato", validationOutput.error.format());
            return { error: "El servidor respondió con un formato inesperado" };
        }

        //si sale bien
        return {
            success: true,
            //no debemos hacer cambios ya que pasamos los campos de zod
            data: validationOutput.data.data
        };
    } catch (err: any) {
        return { error: err.message || "No se pudo establecer conexión con el API Gateway" };

    }


}