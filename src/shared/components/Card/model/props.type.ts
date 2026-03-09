import type { MotionValue, useMotionValue, useSpring } from "framer-motion";
import type { CardItem, UseCardStackResult } from "./useCardStack.types";

interface CardDisplayOptions {
  isCardCompressed: boolean;
  isFocusMode: boolean;
  compressedCardHeight: number | null;
  expandedCardHeight: number | null;
  onToggleFocusMode: () => void;
}

interface FrontCardProps {
  cardId: CardItem["id"];
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
  compressedCardHeight: CardDisplayOptions["compressedCardHeight"];
  expandedCardHeight: CardDisplayOptions["expandedCardHeight"];
  onToggleFocusMode: CardDisplayOptions["onToggleFocusMode"];
}

interface CardStackContentProps {
  cardStack: UseCardStackResult;
  onExitComplete: () => void;
  displayOptions: CardDisplayOptions;
}

export type { CardDisplayOptions, FrontCardProps, CardStackContentProps };
