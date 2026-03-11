export interface DeckProductData {
  productId?: number;
  brand?: string;
  name?: string;
  productImageUrl?: string;
  productsImageUrl?: string;
  productUrl?: string;
  url?: string;
}

export interface DeckCardContentData {
  cardId: number;
  cardImageUrl: string;
  height: number | null;
  weight: number | null;
  tag?: string[];
  tags?: string[];
  products?: DeckProductData[];
}

export interface DefaultDeckCardsResponse {
  content: DeckCardContentData[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export type DeckType = "DEFAULT" | "CUSTOM";

export interface DeckSummaryData {
  deckId: number;
  name: string;
  type: DeckType;
  cardCount: number;
  previewImageUrls: string[];
}
