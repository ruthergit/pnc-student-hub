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

export interface MarketPostProps {
  seller: string;
  sellerInitials?: string;
  timestamp: string;
  college: string;
  title: string;
  price: string;
  condition: string;
  description: string;
  images: string[];
}