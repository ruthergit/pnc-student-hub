import { useMutation } from '@tanstack/react-query'
import type {
  CreateMarketplacePayload,
  CreateMarketplaceResult,
} from '../types/marketplace'
import { createMarketplaceItem } from '../services/CreatePostMarket'

export const useCreateItemPost = () => {
  return useMutation<CreateMarketplaceResult, Error, CreateMarketplacePayload>({
    mutationFn: createMarketplaceItem,
    onSuccess: (data) => {
      console.log("Created marketplace post:", data)
    },
  })
}
