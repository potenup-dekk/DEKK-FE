"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DeckCard from "./DeckCard";
import clsx from "clsx";
import DeckCover from "./DeckCover";

const COLLAPSED_CARD_COUNT = 2;
const TOTAL_CARD_COUNT = 50;
const CLOSE_ANIMATION_DELAY = 300;
const ALL_CARD_INDEXES = Array.from(
  { length: TOTAL_CARD_COUNT },
  (_, index) => index,
);
const COLLAPSED_CARD_INDEXES = ALL_CARD_INDEXES.slice(0, COLLAPSED_CARD_COUNT);

const Deck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCardIndexes, setVisibleCardIndexes] = useState(
    COLLAPSED_CARD_INDEXES,
  );
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const clearScheduledTasks = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handleCoverClick = () => {
    clearScheduledTasks();

    if (isOpen) {
      setIsOpen(false);
      closeTimeoutRef.current = setTimeout(() => {
        setVisibleCardIndexes(COLLAPSED_CARD_INDEXES);
      }, CLOSE_ANIMATION_DELAY);
      return;
    }

    setVisibleCardIndexes(ALL_CARD_INDEXES);
    animationFrameRef.current = requestAnimationFrame(() => {
      setIsOpen(true);
      animationFrameRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      clearScheduledTasks();
    };
  }, []);

  const isCollapsedAfterAnimation =
    !isOpen && visibleCardIndexes.length === COLLAPSED_CARD_COUNT;

  return (
    // <motion.div className="absolute">
    <AnimatePresence>
      <div className="relative w-full min-h-37.5 p-5">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <motion.div
          className={clsx(
            "grid-cols-3 gap-5",
            isOpen
              ? "fixed inset-y-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 overflow-y-auto p-5"
              : "relative z-10",
          )}
          style={{
            display: isOpen ? "grid" : "flex",
          }}
        >
          {/* <DeckCard style={{ rotate: 0, scale: 1, x: 0 }} />
           */}
          <DeckCover
            onClick={handleCoverClick}
            style={{
              display: isOpen ? "absolute" : "",
            }}
          />

          {visibleCardIndexes.map((cardIndex) => (
            <motion.div
              key={cardIndex}
              layout
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className={`${isOpen ? "" : "absolute"}`}
            >
              <DeckCard
                style={
                  isCollapsedAfterAnimation
                    ? {
                        rotate: (cardIndex + 1) * 4,
                      }
                    : undefined
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Deck;
