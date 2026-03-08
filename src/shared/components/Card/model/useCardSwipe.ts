import { useMotionValue } from "framer-motion";
import { useCallback, useState } from "react";
import type { CardItem } from "./useCardStack.types";
import {
  MAX_X,
  resolveRemovingId,
  runSwipeAnimation,
  saveSwipeEvaluation,
} from "./useCardSwipe.helpers";
import useCardSwipeEvents from "./useCardSwipeEvents";

const useCardSwipe = (
  cards: CardItem[],
  isLoggedIn: boolean,
  x: ReturnType<typeof useMotionValue<number>>,
) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [removingCardId, setRemovingCardId] = useState<string | null>(null);

  const onLike = useCallback(() => {
    saveSwipeEvaluation(cards, isLoggedIn, "LIKE");
    setRemovingCardId(resolveRemovingId(cards));
  }, [cards, isLoggedIn]);

  const onDislike = useCallback(() => {
    saveSwipeEvaluation(cards, isLoggedIn, "DISLIKE");
    setRemovingCardId(resolveRemovingId(cards));
  }, [cards, isLoggedIn]);

  const dislikeAnimation = useCallback(() => {
    if (removingCardId || !cards[0]?.id) return;

    setIsSwiping(true);
    runSwipeAnimation(x, -MAX_X, () => {
      setRemovingCardId(resolveRemovingId(cards));
      onDislike();
    });
  }, [cards, onDislike, removingCardId, x]);

  const likeAnimation = useCallback(() => {
    if (removingCardId || !cards[0]?.id) return;

    setIsSwiping(true);
    runSwipeAnimation(x, MAX_X, () => {
      setRemovingCardId(resolveRemovingId(cards));
      onLike();
    });
  }, [cards, onLike, removingCardId, x]);

  useCardSwipeEvents({ likeAnimation, dislikeAnimation });

  return {
    isSwiping,
    setIsSwiping,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
    dislikeAnimation,
  };
};

export default useCardSwipe;
