import { useCallback, useState } from "react";

const useHomeFocusMode = () => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isFocusTransitioning, setIsFocusTransitioning] = useState(false);

  const toggleFocusMode = useCallback((canToggle: boolean) => {
    if (!canToggle && !isFocusMode) {
      return;
    }

    setIsFocusTransitioning(true);
    setIsFocusMode((prev) => !prev);
  }, [isFocusMode]);

  return {
    isFocusMode,
    isFocusTransitioning,
    setIsFocusTransitioning,
    toggleFocusMode,
  };
};

export default useHomeFocusMode;
