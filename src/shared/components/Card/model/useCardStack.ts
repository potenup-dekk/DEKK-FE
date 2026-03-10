import { useMotionValue } from "framer-motion";
import useCardData from "./useCardData";
import useCardFlip from "./useCardFlip";
import useCardMotion from "./useCardMotion";
import useCardSwipe from "./useCardSwipe";

const useCardStack = (isLoggedIn = false) => {
  const x = useMotionValue(0);

  const { cards, setCards, frontImage, backImage, appendNextPage } =
    useCardData();

  const {
    isSwiping,
    setIsSwiping,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
    dislikeAnimation,
  } = useCardSwipe(cards, isLoggedIn, x);

  const { rotate, background, backdropFilter, opacity, filter, backScale } =
    useCardMotion(x, removingCardId);

  const { rotateYSpring, animateFlip, resetFlipState } = useCardFlip(
    cards[0]?.id,
  );

  return {
    frontImage,
    backImage,
    appendNextPage,
    x,
    rotate,
    background,
    backdropFilter,
    filter,
    backScale,
    rotateYSpring,
    animateFlip,
    resetFlipState,
    isSwiping,
    setIsSwiping,
    setCards,
    cards,
    opacity,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
    dislikeAnimation,
  };
};

export default useCardStack;
