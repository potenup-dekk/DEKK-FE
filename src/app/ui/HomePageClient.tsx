"use client";

import { useCallback, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import { useLayoutChromeVisibility } from "@/shared/hooks";
import {
  useCardLayoutResizeEffect,
  useDisablePageScroll,
  useFocusModeChromeVisibility,
  useFocusTransitionReset,
} from "../model/useHomePageEffects";
import useHomePageAuth from "../model/useHomePageAuth";
import { useHomeCardLayout } from "../model/useHomeCardLayout";
import HomeCardControls from "./HomeCardControls";
import { homePageStyle } from "./style";

interface HomePageLayoutProps {
  pageRef: React.RefObject<HTMLDivElement | null>;
  cardWrapRef: React.RefObject<HTMLDivElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  isFocusMode: boolean;
  isCardCompressed: boolean;
  expandedCardHeight: number | null;
  compressedCardHeight: number | null;
  onToggleFocusMode: () => void;
}

const HomePageLayout = ({
  pageRef,
  cardWrapRef,
  controlsRef,
  isFocusMode,
  isCardCompressed,
  expandedCardHeight,
  compressedCardHeight,
  onToggleFocusMode,
}: HomePageLayoutProps) => {
  const { page, cardWrap } = homePageStyle();

  return (
    <div ref={pageRef} className={page({ isFocusMode })}>
      <div ref={cardWrapRef} className={cardWrap({ isFocusMode })}>
        <Card
          isCardCompressed={isCardCompressed}
          isFocusMode={isFocusMode}
          expandedCardHeight={expandedCardHeight}
          compressedCardHeight={compressedCardHeight}
          onToggleFocusMode={onToggleFocusMode}
        />
      </div>

      <HomeCardControls controlsRef={controlsRef} isFocusMode={isFocusMode} />
    </div>
  );
};

const HomePageClient = () => {
  useHomePageAuth();
  const { setChromeVisible } = useLayoutChromeVisibility();

  const pageRef = useRef<HTMLDivElement>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFocusTransitioning, setIsFocusTransitioning] = useState(false);
  const {
    cardWrapRef,
    controlsRef,
    compressedCardHeight,
    expandedCardHeight,
    isCardCompressed,
    measureCardLayout,
  } = useHomeCardLayout(isFocusMode, isFocusTransitioning);

  const handleToggleFocusMode = useCallback(() => {
    if (!isCardCompressed && !isFocusMode) return;

    setIsFocusTransitioning(true);
    setIsFocusMode((prev) => !prev);
  }, [isCardCompressed, isFocusMode]);

  useDisablePageScroll();
  useCardLayoutResizeEffect(measureCardLayout);
  useFocusModeChromeVisibility(isFocusMode, setChromeVisible);

  useFocusTransitionReset(isFocusTransitioning, setIsFocusTransitioning);

  return (
    <HomePageLayout
      pageRef={pageRef}
      cardWrapRef={cardWrapRef}
      controlsRef={controlsRef}
      isFocusMode={isFocusMode}
      isCardCompressed={isCardCompressed}
      expandedCardHeight={expandedCardHeight}
      compressedCardHeight={compressedCardHeight}
      onToggleFocusMode={handleToggleFocusMode}
    />
  );
};

export default HomePageClient;
