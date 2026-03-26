"use client";

import { AnimatePresence, motion } from "framer-motion";
import { deckBackdropMotion } from "../model/animate";
import useDeckState from "../model/useDeckState";
import deckStyle from "../style";
import DeckContent from "./DeckContent";

interface DeckBackdropLayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeckBackdropLayer = ({ isOpen, onClose }: DeckBackdropLayerProps) => {
  const { backdrop } = deckStyle();

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={backdrop()}
          initial={deckBackdropMotion.initial}
          animate={deckBackdropMotion.animate}
          exit={deckBackdropMotion.exit}
          onClick={onClose}
        />
      ) : null}
    </AnimatePresence>
  );
};

const Deck = () => {
  const deckState = useDeckState();
  const { root } = deckStyle();

  return (
    <div className={root()}>
      <DeckBackdropLayer
        isOpen={deckState.mode !== "closed"}
        onClose={deckState.closeDeck}
      />
      <DeckContent deckState={deckState} />
    </div>
  );
};

export default Deck;
