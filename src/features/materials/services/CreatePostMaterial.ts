import { supabase } from "../../../supabase-client";
import { v4 as uuidv4 } from "uuid";
import type {
  MaterialFile,
  CreateMaterialPayload,
  CreateMaterialResult,
} from "../types/materialPayload";

export async function createMaterialPost(
  payload: CreateMaterialPayload
): Promise<CreateMaterialResult> {
  const {
    // checks if the user is logged in
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const uploadedFiles = await uploadMaterials(payload.files, user.id);

  const uploadedFilesJson = uploadedFiles.map((material) => ({
    url: material.url,
    name: material.name,
    size: material.size,
  }));

  const { data, error } = await supabase.rpc("create_material", {
    p_title: payload.title,
    p_description: payload.description,
    p_files: uploadedFilesJson,
  });

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Marketplace item creation failed");
  }

  return data[0] as CreateMaterialResult;
}
// uploads to the bucket/storage
async function uploadMaterials(
  materials: MaterialFile[],
  userId: string
): Promise<MaterialFile[]> {
  const uploaded = await Promise.all(
    materials.map(async (material) => {
      if (!material.file) return material;

      const sanitizedFileName = material.file.name
        .replace(/\s+/g, "_")
        .replace(/[^\w.-]/g, "");
      const filePath = `${userId}/${uuidv4()}-${sanitizedFileName}`;

      const { error } = await supabase.storage
        .from("materials")
        .upload(filePath, material.file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const { data } = supabase.storage
        .from("materials")
        .getPublicUrl(filePath);
      return {
        url: data.publicUrl,
        name: material.file.name,
        size: material.file.size,
      };
    })
  );

  return uploaded;
}
