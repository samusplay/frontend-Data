'use server'

import { revalidatePath } from "next/cache";
import { apiClient } from "../lib/apiClient";
import {
  BusinessProfile,
  BusinessProfileInput,
  BusinessProfileInputSchema,
  BusinessProfileListSchema,
  BusinessProfileSchema,
} from "../schemas/profiles";

export type ProfilesResult =
  | { success: true; data: BusinessProfile[] }
  | { success: false; error: string };

export type SaveProfileResult =
  | { success: true; data: BusinessProfile }
  | { success: false; error: string };


// 🔥 GET PROFILES
export async function getProfiles(): Promise<ProfilesResult> {
  try {
    const rawProfiles = await apiClient("/api/v1/configuration/profiles/", {
      method: "GET",
    });

    const validation = BusinessProfileListSchema.safeParse(rawProfiles);

    if (!validation.success) {
      return {
        success: false,
        error: "El servidor respondió con un formato inesperado",
      };
    }

    return { success: true, data: validation.data };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : "No se pudo consultar la configuración",
    };
  }
}


// 🔥 SAVE PROFILE
export async function saveProfile(
  input: BusinessProfileInput,
): Promise<SaveProfileResult> {

  // ✅ Validación con Zod
  const parsedInput = BusinessProfileInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      error:
        parsedInput.error.issues[0]?.message ||
        "Los datos del perfil no son válidos",
    };
  }

  try {
    // 🔥 1. Obtener perfiles actuales
    const profilesResult = await getProfiles();

    if (!profilesResult.success) {
      return profilesResult;
    }

    // 🔥 2. Desactivar perfiles activos
    const activeProfiles = profilesResult.data.filter(
      (profile) => profile.is_active
    );

    for (const profile of activeProfiles) {
      await apiClient(`/api/v1/configuration/profiles/${profile.id}`, {
        method: "PUT",
        body: {
          nombre_perfil: profile.nombre_perfil,
          peso_poblacion: profile.peso_poblacion,
          peso_ingresos: profile.peso_ingresos,
          peso_competencia: profile.peso_competencia,
          is_active: false,
        },
      });
    }

    // 🔥 3. Crear nuevo perfil
    const rawProfile = await apiClient("/api/v1/configuration/profiles/", {
      method: "POST",
      body: parsedInput.data,
    });

    const validation = BusinessProfileSchema.safeParse(rawProfile);

    if (!validation.success) {
      return {
        success: false,
        error: "El servidor respondió con un formato inesperado",
      };
    }

    // 🔥 4. Revalidar vista
    revalidatePath("/dashboard/configuracion");

    return { success: true, data: validation.data };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : "No se pudo guardar el perfil",
    };
  }
}

// 🔥 UPDATE PROFILE
export async function updateProfile(
  id: number,
  input: BusinessProfileInput
): Promise<SaveProfileResult> {
  const parsedInput = BusinessProfileInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      error: parsedInput.error.issues[0]?.message || "Los datos del perfil no son válidos",
    };
  }

  try {
    const rawProfile = await apiClient(`/api/v1/configuration/profiles/${id}`, {
      method: "PUT",
      body: parsedInput.data,
    });

    const validation = BusinessProfileSchema.safeParse(rawProfile);

    if (!validation.success) {
      return {
        success: false,
        error: "El servidor respondió con un formato inesperado",
      };
    }

    revalidatePath("/dashboard/configuracion");
    return { success: true, data: validation.data };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "No se pudo actualizar el perfil",
    };
  }
}

// 🔥 DELETE PROFILE
export async function deleteProfile(id: number): Promise<{ success: true; id: number } | { success: false; error: string }> {
  try {
    await apiClient(`/api/v1/configuration/profiles/${id}`, {
      method: "DELETE",
    });

    revalidatePath("/dashboard/configuracion");
    return { success: true, id };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "No se pudo eliminar el perfil",
    };
  }
}