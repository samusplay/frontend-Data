import { z } from 'zod';
//esquema de respuesta lo que recibimos del api gateway

export const IngestionResponseSchema=z.object({
    //campos que va verificar dinamicamente
    success:z.boolean(),
    //lo que esperamos y aseguramos sea data
    data:z.object({
        id:z.number().int().positive(),
        "texto-guardado":z.string().min(1,"El mensaje guardado no puede estar vacio"),
    }),
});

//creamos automaticamente el type
export type IngestionResponse=z.infer<typeof IngestionResponseSchema>;

//esquema de peticion si es necesario
export const IngestionRequestSchema=z.object({
    texto:z.string().min(3,"El texto debe tener al menos 3 caracteres").max(255)
});

//creamos el type en base al schema
export type IngestionRequest=z.infer<typeof IngestionRequestSchema>;