import { useMutation } from '@tanstack/react-query';
import { type CreatePostContentPayload } from '../types/post';
import { createPostContent } from '../services/CreatePost';

type FormValues = CreatePostContentPayload

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (data: FormValues) => {
      return await createPostContent({
        title: data.title,
        description: data.description,
      });
    },
    onSuccess: (data) => {
      console.log("Created:", data);
    },
  });
};