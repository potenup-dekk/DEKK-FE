import type { TargetAndTransition } from "framer-motion";
import deckSpreadCardVariants from "./deckSpreadVariants";

interface DeckPreviewCardMotion {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
}

interface DeckPreviewCardVisual {
  width: number;
  zIndex: number;
}

const deckBackdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const deckHeroBackdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const deckCreateSheetBackdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const deckCreateSheetPanelMotion = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "100%", opacity: 0 },
} as const;

const deckCreateSheetTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

const deckHeroCardTransition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
} as const;

const deckCardFlipTransition = {
  duration: 0.25,
  ease: "easeInOut",
} as const;

const DECK_PREVIEW_X_OFFSET_BY_INDEX = [0, 6, 12] as const;
const DECK_PREVIEW_WIDTH_BY_INDEX = [100, 98, 95] as const;

const resolveDeckPreviewStackIndex = (index: number) => {
  return Math.max(0, Math.min(index, 2));
};

const getDeckPreviewOffsetX = (index: number) => {
  const stackIndex = resolveDeckPreviewStackIndex(index);

  return DECK_PREVIEW_X_OFFSET_BY_INDEX[stackIndex];
};

const getDeckPreviewRotation = (index: number) => {
  const stackIndex = resolveDeckPreviewStackIndex(index);

  return stackIndex * 3;
};

const isDeckPreviewBackgroundCard = (index: number) => {
  return resolveDeckPreviewStackIndex(index) > 0;
};

const getDeckPreviewCardVisual = (index: number): DeckPreviewCardVisual => {
  const stackIndex = resolveDeckPreviewStackIndex(index);

  return {
    width: DECK_PREVIEW_WIDTH_BY_INDEX[stackIndex],
    zIndex: 30 - stackIndex,
  };
};

const getDeckPreviewCardMotion = (index: number): DeckPreviewCardMotion => {
  const rotation = getDeckPreviewRotation(index);
  const offsetX = getDeckPreviewOffsetX(index);
  const isBackgroundCard = isDeckPreviewBackgroundCard(index);
  const springStiffness = isBackgroundCard ? 360 : 340;
  const springDamping = isBackgroundCard ? 24 : 26;

  return {
    initial: { x: 0, rotate: 0, y: 4, opacity: 0.85 },
    animate: {
      x: offsetX,
      rotate: rotation,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: springDamping,
        stiffness: springStiffness,
      },
    },
  };
};

const getRandomRotation = (maxRotation: number) => {
  return Math.random() * (maxRotation * 2) - maxRotation;
};

export {
  deckCardFlipTransition,
  deckCreateSheetBackdropMotion,
  deckCreateSheetPanelMotion,
  deckCreateSheetTransition,
  deckBackdropMotion,
  deckHeroBackdropMotion,
  deckHeroCardTransition,
  deckSpreadCardVariants,
  getDeckPreviewCardVisual,
  getDeckPreviewCardMotion,
  getRandomRotation,
};
