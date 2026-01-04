import { supabase } from "../../../supabase-client";
import type {
  CreateMarketplacePayload,
  CreateMarketplaceResult,
  MarketplaceImage,
} from "../types/marketplace";
import { v4 as uuidv4 } from "uuid";

export async function createMarketplaceItem(
  payload: CreateMarketplacePayload
): Promise<CreateMarketplaceResult> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const uploadedImages = await uploadMarketplaceImages(payload.images, user.id);

  const uploadedImagesJson = uploadedImages.map((img) => ({
    url: img.url,
    name: img.name,
    size: img.size,
  }));

  const { data, error } = await supabase.rpc("create_marketplace_item", {
    p_title: payload.title,
    p_description: payload.description,
    p_price: payload.price,
    p_condition: payload.condition,
    p_images: uploadedImagesJson, // <-- JSON array only
  });

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Marketplace item creation failed");
  }

  return data[0] as CreateMarketplaceResult;
}

async function uploadMarketplaceImages(
  images: MarketplaceImage[],
  userId: string
): Promise<MarketplaceImage[]> {
  const uploaded = await Promise.all(
    images.map(async (img) => {
      if (!img.file) return img; // already uploaded

      const sanitizedFileName = img.file.name
        .replace(/\s+/g, "_")
        .replace(/[^\w.-]/g, "");
      const filePath = `${userId}/${uuidv4()}-${sanitizedFileName}`;

      const { error } = await supabase.storage
        .from("marketplace")
        .upload(filePath, img.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const { data } = supabase.storage
        .from("marketplace")
        .getPublicUrl(filePath);

      return {
        url: data.publicUrl,
        name: img.name,
        size: img.size,
      };
    })
  );

  return uploaded;
}
