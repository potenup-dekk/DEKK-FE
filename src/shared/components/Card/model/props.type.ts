import type { MotionValue, useMotionValue, useSpring } from "framer-motion";
import type { CardItem, UseCardStackResult } from "./useCardStack.types";

interface CardDisplayOptions {
  isCardCompressed: boolean;
  isFocusMode: boolean;
  isFocusTransitioning: boolean;
  compressedCardHeight: number | null;
  expandedCardHeight: number | null;
  onToggleFocusMode: () => void;
  onOpenCustomDeckSheet: (cardId: number) => void;
}

interface FrontCardProps {
  cardId: CardItem["id"];
  cardNumericId: CardItem["cardId"];
  frontImage: string;
  x: ReturnType<typeof useMotionValue<number>>;
  rotate: MotionValue<number>;
  rotateYSpring: ReturnType<typeof useSpring>;
  animateFlip: () => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
  onLike: () => void;
  onDislike: () => void;
  background: MotionValue<string>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  backdropFilter: MotionValue<string>;
  products?: CardItem["products"];
  height?: number | null;
  weight?: number | null;
  tags?: string[] | null;
  isCardCompressed: CardDisplayOptions["isCardCompressed"];
  isFocusMode: CardDisplayOptions["isFocusMode"];
  isFocusTransitioning: CardDisplayOptions["isFocusTransitioning"];
  compressedCardHeight: CardDisplayOptions["compressedCardHeight"];
  expandedCardHeight: CardDisplayOptions["expandedCardHeight"];
  onToggleFocusMode: CardDisplayOptions["onToggleFocusMode"];
  onOpenCustomDeckSheet: CardDisplayOptions["onOpenCustomDeckSheet"];
}

interface CardStackContentProps {
  cardStack: UseCardStackResult;
  onExitComplete: () => void;
  displayOptions: CardDisplayOptions;
}

export type { CardDisplayOptions, FrontCardProps, CardStackContentProps };
