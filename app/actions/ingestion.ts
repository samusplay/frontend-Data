'use server'

import { apiClient } from "../lib/apiClient";
import { IngestionRequestSchema, IngestionResponseSchema } from "../schemas/ingestion";


//contrato zod

export async function sendDataIngesta(textoUser:string){
    //validamos la entrada con safe parse para manejar los errores
    const validationInput=IngestionRequestSchema.safeParse({texto:textoUser});

    //si mando algo erroneo
    if(!validationInput.success){
        //mandamos error en un objeto
        return {error:validationInput.error.issues[0].message}
    }
    //gateway
    try{
        //llamar api cliente
        const rawJson=await apiClient('/api/v1/ingesta/test-hexagonal',{
            method:'POST',
            //pasaen el schema que validaron en zod
            body:validationInput.data,
        });
        const validationOutput=IngestionResponseSchema.safeParse(rawJson)

        //si la validacion no es correcta
        if(!validationOutput.success){
            console.error("Error en el contrato",validationOutput.error.format());
            return{error:"El servidor respondio con un formato inesperado"};
        }
        //retorno exitoso
        return{
            success:true,
            data:validationOutput.data.data
        }
    }catch(err){
        //atrapamos los errores
        console.error("error de conexion",err)
        return{error:"No se pudo establecer conexion con el api Gateway"}

    }


}