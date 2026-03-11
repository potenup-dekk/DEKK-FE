import { useCallback, useRef, useState } from "react";

const CARD_WIDTH_RATIO = 5 / 6;
const CARD_HEIGHT_RATIO = 1.5;
const CARD_SAFE_GAP = 12;
const CARD_MIN_HEIGHT = 280;
const HEADER_HEIGHT_FALLBACK = 64;
const BOTTOM_TAB_HEIGHT_FALLBACK = 80;
const CONTROLS_HEIGHT_FALLBACK = 56;
const HEIGHT_UPDATE_THRESHOLD = 4;

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
  if (previous === null) {
    return true;
  }

  return Math.abs(previous - next) >= HEIGHT_UPDATE_THRESHOLD;
};

const useHomeCardLayout = (
  isFocusMode: boolean,
  isFocusTransitioning: boolean,
) => {
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isCardCompressed, setIsCardCompressed] = useState(false);
  const [expandedCardHeight, setExpandedCardHeight] = useState<number | null>(
    null,
  );
  const [compressedCardHeight, setCompressedCardHeight] = useState<
    number | null
  >(null);

  const measureCardLayout = useCallback(() => {
    if (isFocusMode || isFocusTransitioning) return;
    if (!cardWrapRef.current || !controlsRef.current) return;

    const cardWrapWidth = cardWrapRef.current.getBoundingClientRect().width;
    const controlsHeight = Math.max(
      controlsRef.current.getBoundingClientRect().height,
      CONTROLS_HEIGHT_FALLBACK,
    );
    const nextExpandedHeight = getExpandedCardHeight(
      cardWrapWidth,
      controlsHeight,
    );

    setExpandedCardHeight((prev) =>
      shouldUpdateHeight(prev, nextExpandedHeight) ? nextExpandedHeight : prev,
    );

    const compressed = getCompressedCardHeight(
      cardWrapWidth,
      getSafeHeight("app-header", HEADER_HEIGHT_FALLBACK),
      getSafeHeight("app-bottom-tab", BOTTOM_TAB_HEIGHT_FALLBACK),
      controlsHeight,
    );

    if (!compressed.isCompressed) {
      setIsCardCompressed(false);
      setCompressedCardHeight(null);
      return;
    }

    setIsCardCompressed(true);
    setCompressedCardHeight((prev) =>
      shouldUpdateHeight(prev, compressed.nextHeight)
        ? compressed.nextHeight
        : prev,
    );
  }, [isFocusMode, isFocusTransitioning]);

  return {
    cardWrapRef,
    controlsRef,
    compressedCardHeight,
    expandedCardHeight,
    isCardCompressed,
    measureCardLayout,
  };
};

export { useHomeCardLayout };
