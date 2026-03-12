import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  BOTTOM_TAB_HEIGHT_FALLBACK,
  CONTROLS_HEIGHT_FALLBACK,
  HEADER_HEIGHT_FALLBACK,
} from "./homeCardLayout.constants";
import {
  getCompressedCardHeight,
  getExpandedCardHeight,
  getSafeHeight,
  shouldUpdateHeight,
} from "./homeCardLayout.helpers";

interface MeasureHomeCardLayoutParams {
  isFocusMode: boolean;
  isFocusTransitioning: boolean;
  cardWrapElement: HTMLDivElement | null;
  controlsElement: HTMLDivElement | null;
  setExpandedCardHeight: Dispatch<SetStateAction<number | null>>;
  setIsCardCompressed: Dispatch<SetStateAction<boolean>>;
  setCompressedCardHeight: Dispatch<SetStateAction<number | null>>;
}

const measureHomeCardLayout = ({
  isFocusMode,
  isFocusTransitioning,
  cardWrapElement,
  controlsElement,
  setExpandedCardHeight,
  setIsCardCompressed,
  setCompressedCardHeight,
}: MeasureHomeCardLayoutParams) => {
  if (isFocusMode || isFocusTransitioning) return;
  if (!cardWrapElement || !controlsElement) return;

  const cardWrapWidth = cardWrapElement.getBoundingClientRect().width;
  const controlsHeight = Math.max(
    controlsElement.getBoundingClientRect().height,
    CONTROLS_HEIGHT_FALLBACK,
  );
  const nextExpandedHeight = getExpandedCardHeight(cardWrapWidth, controlsHeight);

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
    measureHomeCardLayout({
      isFocusMode,
      isFocusTransitioning,
      cardWrapElement: cardWrapRef.current,
      controlsElement: controlsRef.current,
      setExpandedCardHeight,
      setIsCardCompressed,
      setCompressedCardHeight,
    });
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
