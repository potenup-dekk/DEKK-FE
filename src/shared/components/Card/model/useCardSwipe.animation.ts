import { useCallback } from "react";
import { useMotionValue } from "framer-motion";
import type { CardItem } from "./useCardStack.types";
import {
  MAX_X,
  resolveRemovingId,
  runSwipeAnimation,
} from "./useCardSwipe.helpers";

interface UseSwipeAnimationHandlersParams {
  cards: CardItem[];
  removingCardId: string | null;
  onLike: () => void;
  onDislike: () => void;
  setIsSwiping: (value: boolean) => void;
  setRemovingCardId: (value: string | null) => void;
  x: ReturnType<typeof useMotionValue<number>>;
}

const runDirectionalSwipe = ({
  cards,
  directionX,
  onSwipe,
  setIsSwiping,
  setRemovingCardId,
  x,
}: {
  cards: CardItem[];
  directionX: number;
  onSwipe: () => void;
  setIsSwiping: (value: boolean) => void;
  setRemovingCardId: (value: string | null) => void;
  x: ReturnType<typeof useMotionValue<number>>;
}) => {
  setIsSwiping(true);
  runSwipeAnimation(x, directionX, () => {
    setRemovingCardId(resolveRemovingId(cards));
    onSwipe();
  });
};

const useSwipeAnimationHandlers = ({
  cards,
  removingCardId,
  onLike,
  onDislike,
  setIsSwiping,
  setRemovingCardId,
  x,
}: UseSwipeAnimationHandlersParams) => {
  const dislikeAnimation = useCallback(() => {
    if (removingCardId || !cards[0]?.id) return;
    runDirectionalSwipe({
      cards,
      directionX: -MAX_X,
      onSwipe: onDislike,
      setIsSwiping,
      setRemovingCardId,
      x,
    });
  }, [cards, onDislike, removingCardId, setIsSwiping, setRemovingCardId, x]);

  const likeAnimation = useCallback(() => {
    if (removingCardId || !cards[0]?.id) return;
    runDirectionalSwipe({
      cards,
      directionX: MAX_X,
      onSwipe: onLike,
      setIsSwiping,
      setRemovingCardId,
      x,
    });
  }, [cards, onLike, removingCardId, setIsSwiping, setRemovingCardId, x]);

  return { dislikeAnimation, likeAnimation };
};

export default useSwipeAnimationHandlers;
