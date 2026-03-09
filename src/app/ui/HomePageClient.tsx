"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Card from "@/shared/components/Card";
import { useLayoutChromeVisibility } from "@/shared/hooks";
import useHomePageAuth from "../model/useHomePageAuth";
import HomeCardControls from "./HomeCardControls";
import { homePageStyle } from "./style";

const CARD_WIDTH_RATIO = 5 / 6;
const CARD_HEIGHT_RATIO = 1.5;
const CARD_SAFE_GAP = 12;
const CARD_MIN_HEIGHT = 280;
const FOCUS_MODE_TRANSITION_MS = 420;
const HEADER_HEIGHT_FALLBACK = 64;
const BOTTOM_TAB_HEIGHT_FALLBACK = 80;
const CONTROLS_HEIGHT_FALLBACK = 56;
const HEIGHT_UPDATE_THRESHOLD = 4;

const HomePageClient = () => {
  useHomePageAuth();
  const { page, cardWrap } = homePageStyle();
  const { setChromeVisible } = useLayoutChromeVisibility();

  const pageRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [isCardCompressed, setIsCardCompressed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFocusTransitioning, setIsFocusTransitioning] = useState(false);
  const [expandedCardHeight, setExpandedCardHeight] = useState<number | null>(
    null,
  );
  const [compressedCardHeight, setCompressedCardHeight] = useState<
    number | null
  >(null);

  const measureCardLayout = useCallback(() => {
    if (isFocusMode || isFocusTransitioning) return;

    const cardWrapElement = cardWrapRef.current;
    const controlsElement = controlsRef.current;

    if (!cardWrapElement || !controlsElement) return;

    const headerElement = document.getElementById("app-header");
    const bottomTabElement = document.getElementById("app-bottom-tab");
    const measuredHeaderHeight = headerElement
      ? headerElement.getBoundingClientRect().height
      : 0;
    const measuredBottomTabHeight = bottomTabElement
      ? bottomTabElement.getBoundingClientRect().height
      : 0;
    const measuredControlsHeight =
      controlsElement.getBoundingClientRect().height;

    const headerHeight = Math.max(measuredHeaderHeight, HEADER_HEIGHT_FALLBACK);
    const bottomTabHeight = Math.max(
      measuredBottomTabHeight,
      BOTTOM_TAB_HEIGHT_FALLBACK,
    );
    const controlsHeight = Math.max(
      measuredControlsHeight,
      CONTROLS_HEIGHT_FALLBACK,
    );
    const cardWrapWidth = cardWrapElement.getBoundingClientRect().width;

    const idealCardHeight =
      cardWrapWidth * CARD_WIDTH_RATIO * CARD_HEIGHT_RATIO;
    const focusModeAvailableCardHeight =
      window.innerHeight - controlsHeight - CARD_SAFE_GAP * 2;
    const nextExpandedHeight = Math.floor(
      Math.min(idealCardHeight, focusModeAvailableCardHeight),
    );
    setExpandedCardHeight((prev) => {
      if (prev === null) return nextExpandedHeight;
      return Math.abs(prev - nextExpandedHeight) >= HEIGHT_UPDATE_THRESHOLD
        ? nextExpandedHeight
        : prev;
    });
    const availableCardHeight =
      window.innerHeight -
      headerHeight -
      bottomTabHeight -
      controlsHeight -
      CARD_SAFE_GAP * 2;
    const nextCompressed = availableCardHeight < idealCardHeight;

    if (!nextCompressed) {
      setIsCardCompressed(false);
      setCompressedCardHeight(null);
      return;
    }

    setIsCardCompressed(true);
    const nextCompressedHeight = Math.max(
      CARD_MIN_HEIGHT,
      Math.floor(availableCardHeight),
    );
    setCompressedCardHeight((prev) => {
      if (prev === null) return nextCompressedHeight;
      return Math.abs(prev - nextCompressedHeight) >= HEIGHT_UPDATE_THRESHOLD
        ? nextCompressedHeight
        : prev;
    });
  }, [isFocusMode, isFocusTransitioning]);

  const handleToggleFocusMode = useCallback(() => {
    if (!isCardCompressed && !isFocusMode) return;

    setIsFocusTransitioning(true);
    setIsFocusMode((prev) => !prev);
  }, [isCardCompressed, isFocusMode]);

  useEffect(() => {
    // if (!true) return;

    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.touchAction = "none"; // 모바일 터치 스크롤 방지
    documentElement.style.overscrollBehavior = "none"; // 바운스/체인 스크롤 방지

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        measureCardLayout();
      });
    };

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("orientationchange", scheduleMeasure);

    scheduleMeasure();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("orientationchange", scheduleMeasure);
    };
  }, [measureCardLayout]);

  useEffect(() => {
    setChromeVisible(!isFocusMode);
  }, [isFocusMode, setChromeVisible]);

  useEffect(() => {
    if (!isFocusTransitioning) return;

    const timeoutId = window.setTimeout(() => {
      setIsFocusTransitioning(false);
    }, FOCUS_MODE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isFocusTransitioning]);

  useEffect(() => {
    return () => {
      setChromeVisible(true);
    };
  }, [setChromeVisible]);

  return (
    <div ref={pageRef} className={page({ isFocusMode })}>
      <div ref={cardWrapRef} className={cardWrap({ isFocusMode })}>
        <Card
          isCardCompressed={isCardCompressed}
          isFocusMode={isFocusMode}
          expandedCardHeight={expandedCardHeight}
          compressedCardHeight={compressedCardHeight}
          onToggleFocusMode={handleToggleFocusMode}
        />
      </div>

      <HomeCardControls controlsRef={controlsRef} isFocusMode={isFocusMode} />
    </div>
  );
};

export default HomePageClient;
