import { useEffect, useLayoutEffect } from "react";

const FOCUS_MODE_TRANSITION_MS = 260;
type FocusTransitionDirection = "enter" | "exit" | null;

const useDisablePageScroll = () => {
  useEffect(() => {
    const { body, documentElement } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    documentElement.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    };
  }, []);
};

const useCardLayoutResizeEffect = (measureCardLayout: () => void) => {
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
};

const useFocusTransitionReset = (
  isFocusTransitioning: boolean,
  setFocusTransitionDirection: (value: FocusTransitionDirection) => void,
  setIsFocusTransitioning: (value: boolean) => void,
) => {
  useEffect(() => {
    if (!isFocusTransitioning) return;

    const timeoutId = window.setTimeout(() => {
      setFocusTransitionDirection(null);
      setIsFocusTransitioning(false);
    }, FOCUS_MODE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isFocusTransitioning,
    setFocusTransitionDirection,
    setIsFocusTransitioning,
  ]);
};

const useFocusModeChromeVisibility = (
  isFocusMode: boolean,
  isFocusTransitioning: boolean,
  focusTransitionDirection: FocusTransitionDirection,
  setChromeVisible: (isVisible: boolean) => void,
) => {
  useLayoutEffect(() => {
    if (isFocusTransitioning) {
      if (focusTransitionDirection === "enter") {
        setChromeVisible(false);
        return;
      }

      if (focusTransitionDirection === "exit") {
        setChromeVisible(true);
        return;
      }
    }

    setChromeVisible(!isFocusMode);
  }, [
    focusTransitionDirection,
    isFocusMode,
    isFocusTransitioning,
    setChromeVisible,
  ]);

  useEffect(() => {
    return () => {
      setChromeVisible(true);
    };
  }, [setChromeVisible]);
};

export {
  type FocusTransitionDirection,
  useCardLayoutResizeEffect,
  useDisablePageScroll,
  useFocusModeChromeVisibility,
  useFocusTransitionReset,
};
