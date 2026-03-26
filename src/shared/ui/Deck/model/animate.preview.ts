import type { TargetAndTransition } from "framer-motion";

interface DeckPreviewCardMotion {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
}

interface DeckPreviewCardVisual {
  width: number;
  zIndex: number;
}

const DECK_PREVIEW_X_OFFSET_BY_INDEX = [0, 6, 12] as const;
const DECK_PREVIEW_WIDTH_BY_INDEX = [90, 88, 85] as const;

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

export { getDeckPreviewCardMotion, getDeckPreviewCardVisual };
