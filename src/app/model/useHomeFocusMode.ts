import { useCallback, useState } from "react";

type FocusTransitionDirection = "enter" | "exit" | null;

const useHomeFocusMode = () => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFocusTransitioning, setIsFocusTransitioning] = useState(false);
  const [focusTransitionDirection, setFocusTransitionDirection] =
    useState<FocusTransitionDirection>(null);

  const toggleFocusMode = useCallback((canToggle: boolean) => {
    if (!canToggle && !isFocusMode) {
      return;
    }

    setFocusTransitionDirection(isFocusMode ? "exit" : "enter");
    setIsFocusTransitioning(true);
    setIsFocusMode((prev) => !prev);
  }, [isFocusMode]);

  return {
    focusTransitionDirection,
    isFocusMode,
    isFocusTransitioning,
    setFocusTransitionDirection,
    setIsFocusTransitioning,
    toggleFocusMode,
  };
};

export default useHomeFocusMode;
