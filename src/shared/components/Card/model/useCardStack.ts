import { useMotionValue } from "framer-motion";
import useCardData from "./useCardData";
import useCardFlip from "./useCardFlip";
import useCardMotion from "./useCardMotion";
import useCardSwipe from "./useCardSwipe";

const toCardStackResult = (params: {
  appendNextPage: ReturnType<typeof useCardData>["appendNextPage"];
  backImage: ReturnType<typeof useCardData>["backImage"];
  backScale: ReturnType<typeof useCardMotion>["backScale"];
  background: ReturnType<typeof useCardMotion>["background"];
  cards: ReturnType<typeof useCardData>["cards"];
  dislikeAnimation: ReturnType<typeof useCardSwipe>["dislikeAnimation"];
  filter: ReturnType<typeof useCardMotion>["filter"];
  frontImage: ReturnType<typeof useCardData>["frontImage"];
  isSwiping: ReturnType<typeof useCardSwipe>["isSwiping"];
  onDislike: ReturnType<typeof useCardSwipe>["onDislike"];
  onLike: ReturnType<typeof useCardSwipe>["onLike"];
  opacity: ReturnType<typeof useCardMotion>["opacity"];
  removingCardId: ReturnType<typeof useCardSwipe>["removingCardId"];
  rotate: ReturnType<typeof useCardMotion>["rotate"];
  rotateYSpring: ReturnType<typeof useCardFlip>["rotateYSpring"];
  animateFlip: ReturnType<typeof useCardFlip>["animateFlip"];
  resetFlipState: ReturnType<typeof useCardFlip>["resetFlipState"];
  setCards: ReturnType<typeof useCardData>["setCards"];
  setIsSwiping: ReturnType<typeof useCardSwipe>["setIsSwiping"];
  setRemovingCardId: ReturnType<typeof useCardSwipe>["setRemovingCardId"];
  x: ReturnType<typeof useMotionValue<number>>;
  backdropFilter: ReturnType<typeof useCardMotion>["backdropFilter"];
}) => {
  return params;
};

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

  return toCardStackResult({
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
  });
};

export default useCardStack;
