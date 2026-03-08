import { animate, type MotionValue } from "framer-motion";
import { saveCardSwipeEvaluationAction } from "@/shared/api/actions";
import { swipeAnimationTransition } from "./animate";
import type { SwipeType } from "@/entities/card";
import type { CardItem } from "./useCardStack.types";

const MAX_X = 250;

const saveSwipeEvaluation = (
  cards: CardItem[],
  isLoggedIn: boolean,
  swipeType: SwipeType,
) => {
  const topCard = cards[0];
  if (!isLoggedIn || !topCard?.cardId) return;

  void saveCardSwipeEvaluationAction(topCard.cardId, { swipeType }).catch(
    () => {
      return;
    },
  );
};

const runSwipeAnimation = (
  x: MotionValue<number>,
  distance: number,
  onComplete: () => void,
) => {
  animate(x, distance, {
    ...swipeAnimationTransition,
    onComplete,
  });
};

const resolveRemovingId = (cards: CardItem[]) => {
  return cards[0]?.id || null;
};

export { MAX_X, resolveRemovingId, runSwipeAnimation, saveSwipeEvaluation };
