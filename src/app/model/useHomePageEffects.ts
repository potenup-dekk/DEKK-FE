import { useEffect } from "react";

const FOCUS_MODE_TRANSITION_MS = 420;

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
  setIsFocusTransitioning: (value: boolean) => void,
) => {
  useEffect(() => {
    if (!isFocusTransitioning) return;

    const timeoutId = window.setTimeout(() => {
      setIsFocusTransitioning(false);
    }, FOCUS_MODE_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isFocusTransitioning, setIsFocusTransitioning]);
};

const useFocusModeChromeVisibility = (
  isFocusMode: boolean,
  setChromeVisible: (isVisible: boolean) => void,
) => {
  useEffect(() => {
    setChromeVisible(!isFocusMode);
  }, [isFocusMode, setChromeVisible]);

  useEffect(() => {
    return () => {
      setChromeVisible(true);
    };
  }, [setChromeVisible]);
};

export {
  useCardLayoutResizeEffect,
  useDisablePageScroll,
  useFocusModeChromeVisibility,
  useFocusTransitionReset,
};
