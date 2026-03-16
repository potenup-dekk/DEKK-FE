import type { DeckType, ShareTokenResult } from "@/entities/deck";

interface DeckCardProductItem {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}

interface DeckCardItem {
  id: number;
  cardId: number;
  name: string;
  imageSrc: string;
  height: number | null;
  weight: number | null;
  tags: string[];
  products: DeckCardProductItem[];
}

interface DeckOriginOffset {
  x: number;
  y: number;
}

interface DeckItem {
  id: number;
  name: string;
  type: DeckType;
  isDefault: boolean;
  cardCount: number;
  previewImageSrcList: string[];
  cards: DeckCardItem[];
}

interface SharedDeckActionResult {
  success: boolean;
  tokenResult?: ShareTokenResult;
}

export type {
  DeckCardItem,
  DeckCardProductItem,
  DeckItem,
  DeckOriginOffset,
  SharedDeckActionResult,
};
