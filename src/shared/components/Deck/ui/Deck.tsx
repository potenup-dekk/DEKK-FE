"use client";

import { AnimatePresence, motion } from "framer-motion";
import DeckCreateSheet from "@/shared/components/Deck/ui/DeckCreateSheet";
import DeckHeroOverlay from "@/shared/components/Deck/ui/DeckHeroOverlay";
import { deckBackdropMotion } from "../model/animate";
import useDeckState from "../model/useDeckState";
import deckStyle from "../style";
import DeckFrame from "./DeckFrame";

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

      <DeckFrame
        decks={deckState.decks}
        activeDeck={deckState.activeDeck}
        selectedCardId={deckState.selectedCard?.id ?? null}
        mode={deckState.mode}
        radialOrigin={deckState.radialOrigin}
        defaultDeckFetchStatus={deckState.defaultDeckFetchStatus}
        defaultDeckFetchError={deckState.defaultDeckFetchError}
        onOpenDeck={deckState.openDeck}
        onRetryLoadDefaultDeck={deckState.retryLoadDefaultDeck}
        onCloseDeck={deckState.closeDeck}
        onSelectCard={deckState.selectCard}
      />

      <DeckHeroOverlay
        selectedCard={deckState.selectedCard}
        isOpen={deckState.mode === "hero"}
        isFlipped={deckState.isHeroFlipped}
        onClose={deckState.closeHero}
        onDeleteCard={() => {
          void deckState.deleteSelectedCard();
        }}
        onFlip={deckState.toggleHeroFlip}
        onOpenCreateDeckSheet={deckState.openCreateSheet}
      />

      <DeckCreateSheet
        isOpen={deckState.isCreateSheetOpen}
        onClose={deckState.closeCreateSheet}
        onCreate={deckState.createDeck}
      />
    </div>
  );
};

export default Deck;
