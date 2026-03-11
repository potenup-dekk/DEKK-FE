import deckSpreadCardVariants from "./deckSpreadVariants";
import {
  getDeckPreviewCardMotion,
  getDeckPreviewCardVisual,
} from "./animate.preview";

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
  duration: 0.2,
  ease: "easeInOut",
} as const;

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
