"use client";

import { useEffect } from "react";

interface UsePageScrollLockParams {
  enabled?: boolean;
}

const usePageScrollLock = ({
  enabled = true,
}: UsePageScrollLockParams = {}) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

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
  }, [enabled]);
};

export default usePageScrollLock;
