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
export type DeckRole = "HOST" | "GUEST";

export interface DeckSummaryData {
  deckId: number;
  name: string;
  type: DeckType;
  sharedToken?: string | null;
  cardCount: number;
  previewImageUrls: string[];
}

export interface CustomDeckData {
  deckId: number;
  name: string;
  cardCount: number;
  imageUrl: string;
}

export interface CustomDeckCardsResultData {
  deckType: DeckType;
  token: string | null;
  expiredInSeconds: number | null;
  role: DeckRole;
  cards: DeckCardContentData[];
}

export interface CreateCustomDeckPayload {
  name: string;
}

export interface UpdateCustomDeckPayload {
  name: string;
}

export interface CustomDeckShareData {
  token: string;
  expiredInSeconds: number | null;
  expiredAt: string | null;
  remainingTime: string | null;
}

export interface GuestSharedDeckCardData {
  cardId: number;
  cardImageUrl: string;
  height: number | null;
  weight: number | null;
  tags: string[];
}
