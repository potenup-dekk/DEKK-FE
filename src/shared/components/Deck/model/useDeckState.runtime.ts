import {
  createDeleteSelectedCardHandler,
  createLoadDefaultDeckCards,
  createOpenDeckHandler,
  createRetryLoadDefaultDeckHandler,
} from "./useDeckState.handlers";
import createDeckStateActions from "./useDeckState.actions";
import useDeckCloseTimeout from "./useDeckCloseTimeout";
import useDeckDerivedState from "./useDeckState.derived";
import useDeckInitialization from "./useDeckState.initialization";
import useDeckStateStore from "./useDeckState.store";

const useDeckStateRuntime = () => {
  const store = useDeckStateStore();
  const { clearCloseTimeout, scheduleCloseReset } = useDeckCloseTimeout({
    setMode: store.setMode,
    setActiveDeckId: store.setActiveDeckId,
    setRadialOrigin: store.setRadialOrigin,
  });
  const { activeDeck, selectedCard } = useDeckDerivedState(
    store.decks,
    store.activeDeckId,
    store.selectedCardId,
  );
  const actions = createDeckStateActions({
    mode: store.mode,
    setMode: store.setMode,
    setDecks: store.setDecks,
    setActiveDeckId: store.setActiveDeckId,
    setSelectedCardId: store.setSelectedCardId,
    setRadialOrigin: store.setRadialOrigin,
    setIsCreateSheetOpen: store.setIsCreateSheetOpen,
    setIsHeroFlipped: store.setIsHeroFlipped,
    clearCloseTimeout,
    scheduleCloseReset,
  });
  const loadDefaultDeckCards = createLoadDefaultDeckCards(store);
  const openDeck = createOpenDeckHandler(actions, loadDefaultDeckCards);
  const retryLoadDefaultDeck = createRetryLoadDefaultDeckHandler(
    store,
    loadDefaultDeckCards,
  );
  const deleteSelectedCard = createDeleteSelectedCardHandler(
    store,
    actions,
    activeDeck,
    selectedCard,
  );

  useDeckInitialization(store.setDecks, clearCloseTimeout);

  return {
    actions,
    activeDeck,
    deleteSelectedCard,
    openDeck,
    retryLoadDefaultDeck,
    selectedCard,
    store,
  };
};

export default useDeckStateRuntime;
