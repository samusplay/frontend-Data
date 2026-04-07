import { z } from 'zod';

//como se ve cada zona
export const ZoneItemSchema=z.object({
  name:z.string(),
  record_count:z.number()
})

//Respuesta del Backend

export const ZonesResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    zones: z.array(ZoneItemSchema) 
  }),
  error: z.any().nullable()
});

//Exportamos types no creamos Types aparte
export type ZoneItem=z.infer<typeof ZoneItemSchema>;
export type ZonesResponse=z.infer<typeof ZonesResponseSchema>;