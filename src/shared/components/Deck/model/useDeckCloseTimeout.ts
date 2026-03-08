import { useCallback, useRef } from "react";
import type { DeckOriginOffset } from "./deckState.helpers";
import {
  CLOSE_ANIMATION_DURATION,
  DEFAULT_ORIGIN_OFFSET,
} from "./useDeckState.types";

interface UseDeckCloseTimeoutParams {
  setMode: (mode: "closed") => void;
  setActiveDeckId: (deckId: number | null) => void;
  setRadialOrigin: (origin: DeckOriginOffset) => void;
}

const useDeckCloseTimeout = ({
  setMode,
  setActiveDeckId,
  setRadialOrigin,
}: UseDeckCloseTimeoutParams) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (!closeTimeoutRef.current) {
      return;
    }

    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }, []);

  const scheduleCloseReset = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setMode("closed");
      setActiveDeckId(null);
      setRadialOrigin(DEFAULT_ORIGIN_OFFSET);
      closeTimeoutRef.current = null;
    }, CLOSE_ANIMATION_DURATION);
  }, [setActiveDeckId, setMode, setRadialOrigin]);

  return {
    clearCloseTimeout,
    scheduleCloseReset,
  };
};

export default useDeckCloseTimeout;
