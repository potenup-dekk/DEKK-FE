import {
  CARD_HEIGHT_RATIO,
  CARD_MIN_HEIGHT,
  CARD_SAFE_GAP,
  CARD_WIDTH_RATIO,
  HEIGHT_UPDATE_THRESHOLD,
} from "./homeCardLayout.constants";

const getSafeHeight = (elementId: string, fallback: number) => {
  const element = document.getElementById(elementId);
  const height = element ? element.getBoundingClientRect().height : 0;

  return Math.max(height, fallback);
};

const getExpandedCardHeight = (
  cardWrapWidth: number,
  controlsHeight: number,
) => {
  const idealCardHeight = cardWrapWidth * CARD_WIDTH_RATIO * CARD_HEIGHT_RATIO;
  const availableHeight =
    window.innerHeight - controlsHeight - CARD_SAFE_GAP * 2;

  return Math.floor(Math.min(idealCardHeight, availableHeight));
};

const getCompressedCardHeight = (
  cardWrapWidth: number,
  headerHeight: number,
  bottomTabHeight: number,
  controlsHeight: number,
) => {
  const idealCardHeight = cardWrapWidth * CARD_WIDTH_RATIO * CARD_HEIGHT_RATIO;
  const availableHeight =
    window.innerHeight -
    headerHeight -
    bottomTabHeight -
    controlsHeight -
    CARD_SAFE_GAP * 2;

  return {
    isCompressed: availableHeight < idealCardHeight,
    nextHeight: Math.max(CARD_MIN_HEIGHT, Math.floor(availableHeight)),
  };
};

const shouldUpdateHeight = (previous: number | null, next: number) => {
  if (previous === null) return true;

  return Math.abs(previous - next) >= HEIGHT_UPDATE_THRESHOLD;
};

export {
  getCompressedCardHeight,
  getExpandedCardHeight,
  getSafeHeight,
  shouldUpdateHeight,
};
