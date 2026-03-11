import { useMotionValue } from "framer-motion";
import { useCallback, useState } from "react";
import type { CardItem } from "./useCardStack.types";
import { resolveRemovingId, saveSwipeEvaluation } from "./useCardSwipe.helpers";
import useSwipeAnimationHandlers from "./useCardSwipe.animation";
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
  const { dislikeAnimation, likeAnimation } = useSwipeAnimationHandlers({
    cards,
    removingCardId,
    onLike,
    onDislike,
    setIsSwiping,
    setRemovingCardId,
    x,
  });
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
