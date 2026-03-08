import type { MotionValue, useMotionValue, useSpring } from "framer-motion";
import type { CardItem, UseCardStackResult } from "./useCardStack.types";

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
}

interface CardStackContentProps {
  cardStack: UseCardStackResult;
  onExitComplete: () => void;
}

export type { FrontCardProps, CardStackContentProps };
