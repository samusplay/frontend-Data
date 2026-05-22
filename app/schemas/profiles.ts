import { z } from "zod";

export const BusinessProfileSchema = z.object({
  id: z.number(),
  nombre_perfil: z.string().min(1),
  peso_poblacion: z.number(),
  peso_ingresos: z.number(),
  peso_competencia: z.number(),
  is_active: z.boolean(),
});

export const BusinessProfileListSchema = z.array(BusinessProfileSchema);

export const BusinessProfileInputSchema = z
  .object({
    nombre_perfil: z.string().min(1, "El nombre del perfil es obligatorio"),
    peso_poblacion: z.number().min(0).max(1),
    peso_ingresos: z.number().min(0).max(1),
    peso_competencia: z.number().min(0).max(1),
    is_active: z.boolean().default(true),
  })
  .refine(
    (data) =>
      Number(
        (data.peso_poblacion + data.peso_ingresos + data.peso_competencia).toFixed(2),
      ) === 1,
    {
      message: "La suma de los pesos debe ser igual a 1.0",
      path: ["peso_competencia"],
    },
  );

export type BusinessProfile = z.infer<typeof BusinessProfileSchema>;
export type BusinessProfileInput = z.infer<typeof BusinessProfileInputSchema>;