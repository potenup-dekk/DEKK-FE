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

export type DeckType = "DEFAULT" | "CUSTOM" | "SHARED";

export interface DeckSummaryData {
  deckId: number;
  name: string;
  type: DeckType;
  cardCount: number;
  previewImageUrls: string[];
}

export interface CustomDeckData {
  deckId: number;
  name: string;
  cardCount: number;
  imageUrl: string;
}

export interface CreateCustomDeckPayload {
  name: string;
}

export interface UpdateCustomDeckPayload {
  name: string;
}

export interface GuestSharedDeckCardResponse {
  cardId: number;
  cardImageUrl: string;
  height: number | null;
  weight: number | null;
  tags?: string[];
}

export interface ShareTokenResult {
  token: string;
  expiredInSeconds: number;
}

export interface SharedDeckJoinPayload {
  token: string;
}
