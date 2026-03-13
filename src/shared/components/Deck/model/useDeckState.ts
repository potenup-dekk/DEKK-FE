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
    openDeck,
    retryLoadDefaultDeck,
    saveSelectedCardToCustomDeck,
    selectedCard,
    store,
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
  );
};

export default useDeckState;
