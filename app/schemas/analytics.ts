import z from "zod";

//los datos que vamos recibir del backend
export const IndicatorsResponseSchema = z.object({
    volumen_total: z.number(),
    cobertura_territorial: z.number(),
    zona_top: z.string(),
    densidad_promedio: z.number(),
})

//inferimos en el type
export type IndicatorsResponse=z.infer<typeof IndicatorsResponseSchema>