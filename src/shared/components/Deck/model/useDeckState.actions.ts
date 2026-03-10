import type { Dispatch, SetStateAction } from "react";
import { getDeckOriginOffset } from "./deckPosition";
import {
  createCustomDeck,
  type DeckItem,
  type DeckOriginOffset,
} from "./deckState.helpers";
import type { DeckViewMode } from "./useDeckState.types";

interface DeckStateActionsParams {
  mode: DeckViewMode;
  setMode: Dispatch<SetStateAction<DeckViewMode>>;
  setDecks: Dispatch<SetStateAction<DeckItem[]>>;
  setActiveDeckId: Dispatch<SetStateAction<number | null>>;
  setSelectedCardId: Dispatch<SetStateAction<number | null>>;
  setRadialOrigin: Dispatch<SetStateAction<DeckOriginOffset>>;
  setIsCreateSheetOpen: Dispatch<SetStateAction<boolean>>;
  setIsHeroFlipped: Dispatch<SetStateAction<boolean>>;
  clearCloseTimeout: () => void;
  scheduleCloseReset: () => void;
}

const createDeckOpenActions = ({
  mode,
  clearCloseTimeout,
  scheduleCloseReset,
  setActiveDeckId,
  setIsCreateSheetOpen,
  setSelectedCardId,
  setRadialOrigin,
  setIsHeroFlipped,
  setMode,
}: DeckStateActionsParams) => {
  const openDeck = (deckId: number, sourceRect: DOMRect) => {
    clearCloseTimeout();
    setActiveDeckId(deckId);
    setSelectedCardId(null);
    setRadialOrigin(getDeckOriginOffset(sourceRect));
    setIsHeroFlipped(false);
    setMode("open");
  };

  const closeDeck = () => {
    if (mode === "closed") {
      return;
    }

    clearCloseTimeout();
    setMode("closing");
    setSelectedCardId(null);
    setIsHeroFlipped(false);
    setIsCreateSheetOpen(false);
    scheduleCloseReset();
  };

  return { openDeck, closeDeck };
};

const createHeroActions = ({
  setMode,
  setSelectedCardId,
  setIsHeroFlipped,
}: DeckStateActionsParams) => {
  const selectCard = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsHeroFlipped(false);
    setMode("hero");
  };

  const closeHero = () => {
    setSelectedCardId(null);
    setIsHeroFlipped(false);
    setMode("open");
  };

  const toggleHeroFlip = () => {
    setIsHeroFlipped((previous) => !previous);
  };

  return { closeHero, selectCard, toggleHeroFlip };
};

const createSheetActions = ({
  setDecks,
  setIsCreateSheetOpen,
}: DeckStateActionsParams) => {
  const openCreateSheet = () => {
    setIsCreateSheetOpen(true);
  };

  const closeCreateSheet = () => {
    setIsCreateSheetOpen(false);
  };

  const createDeck = (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return false;
    }

    setDecks((previousDecks) => createCustomDeck(previousDecks, trimmedName));
    setIsCreateSheetOpen(false);
    return true;
  };

  return { closeCreateSheet, createDeck, openCreateSheet };
};

const createDeckStateActions = (params: DeckStateActionsParams) => {
  const openActions = createDeckOpenActions(params);
  const heroActions = createHeroActions(params);
  const sheetActions = createSheetActions(params);

  return {
    ...openActions,
    ...heroActions,
    ...sheetActions,
  };
};

export default createDeckStateActions;
