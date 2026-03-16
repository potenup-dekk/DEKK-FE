import type createDeckStateActions from "./useDeckState.actions";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";

const toUseDeckStateResult = (
  store: ReturnType<typeof useDeckStateStore>,
  activeDeck: UseDeckStateResult["activeDeck"],
  selectedCard: UseDeckStateResult["selectedCard"],
  actions: ReturnType<typeof createDeckStateActions>,
  openDeck: UseDeckStateResult["openDeck"],
  retryLoadDefaultDeck: UseDeckStateResult["retryLoadDefaultDeck"],
  createDeck: UseDeckStateResult["createDeck"],
  saveSelectedCardToCustomDeck: UseDeckStateResult["saveSelectedCardToCustomDeck"],
  deleteSelectedCard: UseDeckStateResult["deleteSelectedCard"],
  updateActiveDeckName: UseDeckStateResult["updateActiveDeckName"],
  deleteActiveDeck: UseDeckStateResult["deleteActiveDeck"],
  turnOnSharedDeck: UseDeckStateResult["turnOnSharedDeck"],
  turnOffSharedDeck: UseDeckStateResult["turnOffSharedDeck"],
  leaveSharedDeck: UseDeckStateResult["leaveSharedDeck"],
): UseDeckStateResult => {
  return {
    decks: store.decks,
    mode: store.mode,
    activeDeck,
    selectedCard,
    radialOrigin: store.radialOrigin,
    isCreateSheetOpen: store.isCreateSheetOpen,
    isHeroFlipped: store.isHeroFlipped,
    defaultDeckFetchStatus: store.defaultDeckFetchStatus,
    defaultDeckFetchError: store.defaultDeckFetchError,
    openDeck,
    retryLoadDefaultDeck,
    closeDeck: actions.closeDeck,
    selectCard: actions.selectCard,
    closeHero: actions.closeHero,
    toggleHeroFlip: actions.toggleHeroFlip,
    openCreateSheet: actions.openCreateSheet,
    closeCreateSheet: actions.closeCreateSheet,
    createDeck,
    saveSelectedCardToCustomDeck,
    deleteSelectedCard,
    updateActiveDeckName,
    deleteActiveDeck,
    turnOnSharedDeck,
    turnOffSharedDeck,
    leaveSharedDeck,
  };
};

export default toUseDeckStateResult;
