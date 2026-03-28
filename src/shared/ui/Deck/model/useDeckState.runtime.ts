import createDeckStateActions from "./useDeckState.actions";
import useDeckCloseTimeout from "./useDeckCloseTimeout";
import useDeckDerivedState from "./useDeckState.derived";
import useDeckInitialization from "./useDeckState.initialization";
import { createDeckStateRuntimeHandlers } from "./useDeckState.runtime.helpers";
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
  const {
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
    updateActiveDeckName,
  } = createDeckStateRuntimeHandlers(store, actions, activeDeck, selectedCard);

  useDeckInitialization(store.setDecks, clearCloseTimeout);

  return {
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
  };
};

export default useDeckStateRuntime;
