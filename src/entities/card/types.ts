export type SwipeType = "LIKE" | "DISLIKE";

export interface SwipePayload {
  swipeType: SwipeType;
}

export interface CardListResponse {
  content: CardContentData[];
  currentPage: number;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

export interface CardContentData {
  cardId: number;
  cardImageUrl: string;
  height: number | null;
  weight: number | null;
  tags: string[];
  products?: CardProductData[];
}

export interface CardProductData {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}
