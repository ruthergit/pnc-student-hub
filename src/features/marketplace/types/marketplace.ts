// marketplace.ts
export type MarketplaceImage = {
  url: string; 
  file?: File;        
  name?: string;
  size?: number;
};

export type CreateMarketplacePayload = {
  title: string
  description: string
  price: number
  condition: string
  images: MarketplaceImage[]
}

export type CreateMarketplaceResult = {
  post_id: string
  item_id: string
}
