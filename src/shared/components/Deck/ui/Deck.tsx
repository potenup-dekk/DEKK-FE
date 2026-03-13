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
        onUpdateDeckName={deckState.updateActiveDeckName}
        onDeleteDeck={deckState.deleteActiveDeck}
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
        onSaveCardToDeck={deckState.saveSelectedCardToCustomDeck}
      />
    </div>
  );
};

export default Deck;
