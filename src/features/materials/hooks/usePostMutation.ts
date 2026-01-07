import { useMutation } from "@tanstack/react-query";
import type {
  CreateMaterialPayload,
  CreateMaterialResult,
} from "../types/materialPayload";
import { createMaterialPost } from "../services/CreatePostMaterial";

export const useCreateItemPost = () => {
  return useMutation<CreateMaterialResult, Error, CreateMaterialPayload>({
    mutationFn: createMaterialPost,
    onSuccess: (data) => {
      console.log("Created material post:", data);
    },
  });
};
