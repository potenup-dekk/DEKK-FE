"use client";

import { AnimatePresence, motion } from "framer-motion";
import { deckHeroBackdropMotion } from "../model/animate";
import type { DeckCardItem } from "../model/deckState.helpers";
import useDeckHeroGesture from "../model/useDeckHeroGesture";
import deckStyle from "../style";
import DeckHeroActions from "./DeckHeroActions";
import DeckHeroCard from "./DeckHeroCard";

interface DeckHeroOverlayProps {
  selectedCard: DeckCardItem | null;
  isOpen: boolean;
  isFlipped: boolean;
  onClose: () => void;
  onDeleteCard: () => void;
  onFlip: () => void;
  onOpenCreateDeckSheet: () => void;
}

interface DeckHeroOverlayContentProps {
  selectedCard: DeckCardItem;
  isFlipped: boolean;
  onClose: () => void;
  onDeleteCard: () => void;
  onTapFlip: () => void;
  onOpenCreateDeckSheet: () => void;
}

const DeckHeroOverlayContent = ({
  selectedCard,
  isFlipped,
  onClose,
  onDeleteCard,
  onTapFlip,
  onOpenCreateDeckSheet,
}: DeckHeroOverlayContentProps) => {
  const { heroContainer } = deckStyle();
  const { onDragEnd, onTap, rotate, x, y } = useDeckHeroGesture({
    onSwipeClose: onClose,
    onTapFlip,
  });

  return (
    <motion.section
      className={heroContainer()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <DeckHeroCard
        card={selectedCard}
        isFlipped={isFlipped}
        gestureBindings={{ x, y, rotate, onDragEnd, onTap }}
      />
      <DeckHeroActions
        onClose={onClose}
        onDeleteCard={onDeleteCard}
        onOpenCreateDeckSheet={onOpenCreateDeckSheet}
      />
    </motion.section>
  );
};

const DeckHeroOverlay = ({
  selectedCard,
  isOpen,
  isFlipped,
  onClose,
  onDeleteCard,
  onFlip,
  onOpenCreateDeckSheet,
}: DeckHeroOverlayProps) => {
  const { heroBackdrop } = deckStyle();

  return (
    <AnimatePresence>
      {isOpen && selectedCard ? (
        <>
          <motion.div
            className={heroBackdrop()}
            initial={deckHeroBackdropMotion.initial}
            animate={deckHeroBackdropMotion.animate}
            exit={deckHeroBackdropMotion.exit}
          />
          <DeckHeroOverlayContent
            selectedCard={selectedCard}
            isFlipped={isFlipped}
            onClose={onClose}
            onDeleteCard={onDeleteCard}
            onTapFlip={onFlip}
            onOpenCreateDeckSheet={onOpenCreateDeckSheet}
          />
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default DeckHeroOverlay;
