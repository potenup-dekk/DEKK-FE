"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import {
  deckSelectionOverlayMotion,
  deckSelectionOverlayTransition,
} from "../model/animate";

interface DeckSelectionOverlayProps {
  isVisible: boolean;
  tintClassName: string;
  zIndexClassName?: string;
}

const DeckSelectionOverlay = ({
  isVisible,
  tintClassName,
  zIndexClassName = "z-50",
}: DeckSelectionOverlayProps) => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={`${tintClassName} pointer-events-none fixed inset-0 ${zIndexClassName}`}
          initial={deckSelectionOverlayMotion.initial}
          animate={deckSelectionOverlayMotion.animate}
          exit={deckSelectionOverlayMotion.exit}
          transition={deckSelectionOverlayTransition}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export default DeckSelectionOverlay;
