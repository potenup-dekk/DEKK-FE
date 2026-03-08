"use client";

import { AnimatePresence, motion } from "framer-motion";
import { deckBackdropMotion } from "../model/animate";
import useDeckState from "../model/useDeckState";
import DeckFrame from "./DeckFrame";

const Deck = () => {
  const {
    isOpen,
    visibleCardIndexes,
    isCollapsedAfterAnimation,
    handleCoverClick,
  } = useDeckState();

  return (
    // <motion.div className="absolute">
    <AnimatePresence>
      <div className="relative w-full min-h-37.5 p-5">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            initial={deckBackdropMotion.initial}
            animate={deckBackdropMotion.animate}
            exit={deckBackdropMotion.exit}
          />
        )}
        <DeckFrame
          isOpen={isOpen}
          isCollapsedAfterAnimation={isCollapsedAfterAnimation}
          visibleCardIndexes={visibleCardIndexes}
          handleCoverClick={handleCoverClick}
        />
      </div>
    </AnimatePresence>
  );
};

export default Deck;
