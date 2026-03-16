import toUseDeckStateResult from "./useDeckState.result";
import useDeckStateRuntime from "./useDeckState.runtime";
import type { UseDeckStateResult } from "./useDeckState.types";

const useDeckState = (): UseDeckStateResult => {
  const {
    actions,
    activeDeck,
    createDeck,
    deleteActiveDeck,
    deleteSelectedCard,
    leaveSharedDeck,
    openDeck,
    retryLoadDefaultDeck,
    saveSelectedCardToCustomDeck,
    selectedCard,
    store,
    turnOffSharedDeck,
    turnOnSharedDeck,
    updateActiveDeckName,
  } = useDeckStateRuntime();

  return toUseDeckStateResult(
    store,
    activeDeck,
    selectedCard,
    actions,
    openDeck,
    retryLoadDefaultDeck,
    createDeck,
    saveSelectedCardToCustomDeck,
    deleteSelectedCard,
    updateActiveDeckName,
    deleteActiveDeck,
    turnOnSharedDeck,
    turnOffSharedDeck,
    leaveSharedDeck,
  );
};

export default useDeckState;
