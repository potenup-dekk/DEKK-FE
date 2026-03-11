import toUseDeckStateResult from "./useDeckState.result";
import useDeckStateRuntime from "./useDeckState.runtime";
import type { UseDeckStateResult } from "./useDeckState.types";

const useDeckState = (): UseDeckStateResult => {
  const {
    actions,
    activeDeck,
    deleteSelectedCard,
    openDeck,
    retryLoadDefaultDeck,
    selectedCard,
    store,
  } = useDeckStateRuntime();

  return toUseDeckStateResult(
    store,
    activeDeck,
    selectedCard,
    actions,
    openDeck,
    retryLoadDefaultDeck,
    deleteSelectedCard,
  );
};

export default useDeckState;
