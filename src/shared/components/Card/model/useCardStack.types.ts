import type { MotionValue } from "framer-motion";

interface CardProductItem {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}

interface CardItem {
  id: string;
  cardId: number;
  imageUrl: string;
  products: CardProductItem[];
  height: number | null;
  weight: number | null;
  tags: string[] | null;
}

interface UseCardStackResult {
  frontImage: string;
  backImage: string;
  appendNextPage: () => Promise<void>;
  x: MotionValue<number>;
  rotate: MotionValue<number>;
  background: MotionValue<string>;
  backdropFilter: MotionValue<string>;
  filter: MotionValue<string>;
  backScale: MotionValue<number>;
  rotateYSpring: MotionValue<number>;
  animateFlip: () => void;
  resetFlipState: () => void;
  isSwiping: boolean;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>;
  cards: CardItem[];
  opacity: MotionValue<number>;
  removingCardId: string | null;
  setRemovingCardId: React.Dispatch<React.SetStateAction<string | null>>;
  onLike: () => void;
  onDislike: () => void;
  dislikeAnimation: () => void;
}

export type { CardItem, CardProductItem, UseCardStackResult };
