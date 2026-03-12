import type createDeckStateActions from "./useDeckState.actions";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";
import {
  createDeleteSelectedCardHandler,
  createLoadDefaultDeckCards,
  createOpenDeckHandler,
  createRetryLoadDefaultDeckHandler,
} from "./useDeckState.handlers";

const createDeckStateRuntimeHandlers = (
  store: ReturnType<typeof useDeckStateStore>,
  actions: ReturnType<typeof createDeckStateActions>,
  activeDeck: UseDeckStateResult["activeDeck"],
  selectedCard: UseDeckStateResult["selectedCard"],
) => {
  const loadDefaultDeckCards = createLoadDefaultDeckCards(store);

  return {
    deleteSelectedCard: createDeleteSelectedCardHandler(
      store,
      actions,
      activeDeck,
      selectedCard,
    ),
    openDeck: createOpenDeckHandler(store, actions, loadDefaultDeckCards),
    retryLoadDefaultDeck: createRetryLoadDefaultDeckHandler(
      store,
      loadDefaultDeckCards,
    ),
  };
};

export { createDeckStateRuntimeHandlers };
