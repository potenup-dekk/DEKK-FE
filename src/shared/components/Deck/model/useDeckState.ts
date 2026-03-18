import toUseDeckStateResult from "./useDeckState.result";
import useDeckStateRuntime from "./useDeckState.runtime";
import type { UseDeckStateResult } from "./useDeckState.types";

const useDeckState = (): UseDeckStateResult => {
  const {
    actions,
    activeDeck,
    closeDeck,
    createDeck,
    deleteActiveDeck,
    deleteSelectedCard,
    openDeck,
    prefetchDeckDetail,
    retryLoadDefaultDeck,
    saveSelectedCardToCustomDeck,
    shareActiveDeck,
    leaveSharedActiveDeck,
    stopShareActiveDeck,
    selectedCard,
    store,
    updateActiveDeckName,
  } = useDeckStateRuntime();

  return toUseDeckStateResult(
    store,
    activeDeck,
    selectedCard,
    actions,
    closeDeck,
    openDeck,
    prefetchDeckDetail,
    retryLoadDefaultDeck,
    createDeck,
    saveSelectedCardToCustomDeck,
    deleteSelectedCard,
    updateActiveDeckName,
    deleteActiveDeck,
    shareActiveDeck,
    leaveSharedActiveDeck,
    stopShareActiveDeck,
  );
};

export default useDeckState;
