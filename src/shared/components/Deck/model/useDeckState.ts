import { useEffect, useMemo } from "react";
import { deleteDefaultDeckCardAction } from "@/shared/api/actions";
import { getDecks, getDefaultDeckCards } from "@/shared/api/services";
import {
  mapDeckSummaries,
  mapDefaultDeckCards,
  patchDefaultDeckCards,
  type DeckItem,
} from "./deckState.helpers";
import createDeckStateActions from "./useDeckState.actions";
import useDeckCloseTimeout from "./useDeckCloseTimeout";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";

const DEFAULT_DECK_ID = 0;
const DEFAULT_DECK_PAGE_SIZE = 100;

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "기본 덱 카드를 불러오지 못했습니다.";
};

const useDeckDerivedState = (
  decks: DeckItem[],
  activeDeckId: number | null,
  selectedCardId: number | null,
) => {
  const activeDeck = useMemo(() => {
    if (activeDeckId === null) {
      return null;
    }

    return decks.find((deck) => deck.id === activeDeckId) ?? null;
  }, [activeDeckId, decks]);

  const selectedCard = useMemo(() => {
    if (!activeDeck || selectedCardId === null) {
      return null;
    }

    return activeDeck.cards.find((card) => card.id === selectedCardId) ?? null;
  }, [activeDeck, selectedCardId]);

  return { activeDeck, selectedCard };
};

const toUseDeckStateResult = (
  store: ReturnType<typeof useDeckStateStore>,
  activeDeck: UseDeckStateResult["activeDeck"],
  selectedCard: UseDeckStateResult["selectedCard"],
  actions: ReturnType<typeof createDeckStateActions>,
  openDeck: UseDeckStateResult["openDeck"],
  retryLoadDefaultDeck: UseDeckStateResult["retryLoadDefaultDeck"],
  deleteSelectedCard: UseDeckStateResult["deleteSelectedCard"],
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
    createDeck: actions.createDeck,
    deleteSelectedCard,
  };
};

const useDeckState = (): UseDeckStateResult => {
  const store = useDeckStateStore();
  const { clearCloseTimeout, scheduleCloseReset } = useDeckCloseTimeout({
    setMode: (mode) => {
      store.setMode(mode);
    },
    setActiveDeckId: (deckId) => {
      store.setActiveDeckId(deckId);
    },
    setRadialOrigin: (origin) => {
      store.setRadialOrigin(origin);
    },
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

  const loadDefaultDeckCards = async () => {
    if (
      store.defaultDeckFetchStatus === "loading" ||
      store.hasLoadedDefaultDeckCards
    ) {
      return;
    }

    store.setDefaultDeckFetchStatus("loading");
    store.setDefaultDeckFetchError(null);

    try {
      let currentPage = 0;
      let hasNext = true;
      const allCards: NonNullable<
        Awaited<ReturnType<typeof getDefaultDeckCards>>["data"]
      >["content"] = [];

      while (hasNext) {
        const response = await getDefaultDeckCards(
          currentPage,
          DEFAULT_DECK_PAGE_SIZE,
        );
        const responseData = response.data;

        if (!responseData) {
          break;
        }

        allCards.push(...responseData.content);
        hasNext = responseData.hasNext;
        currentPage += 1;
      }

      const mappedCards = mapDefaultDeckCards(allCards);
      store.setDecks((previousDecks) => {
        return patchDefaultDeckCards(previousDecks, mappedCards);
      });
      store.setHasLoadedDefaultDeckCards(true);
      store.setDefaultDeckFetchStatus("success");
    } catch (error) {
      store.setDefaultDeckFetchError(toErrorMessage(error));
      store.setDefaultDeckFetchStatus("error");
    }
  };

  const loadDeckSummaries = async () => {
    try {
      const response = await getDecks();
      const deckSummaries = response.data ?? [];

      if (!deckSummaries.length) {
        return;
      }

      store.setDecks(mapDeckSummaries(deckSummaries));
    } catch {
      return;
    }
  };

  const openDeck: UseDeckStateResult["openDeck"] = (deckId, sourceRect) => {
    actions.openDeck(deckId, sourceRect);

    if (deckId !== DEFAULT_DECK_ID) {
      return;
    }

    void loadDefaultDeckCards();
  };

  const retryLoadDefaultDeck = () => {
    if (store.activeDeckId !== DEFAULT_DECK_ID) {
      return;
    }

    void loadDefaultDeckCards();
  };

  const deleteSelectedCard: UseDeckStateResult["deleteSelectedCard"] =
    async () => {
      if (!activeDeck || !selectedCard) {
        return false;
      }

      if (!activeDeck.isSystem) {
        return false;
      }

      await deleteDefaultDeckCardAction(selectedCard.cardId);

      store.setDecks((previousDecks) => {
        return previousDecks.map((deck) => {
          if (deck.id !== activeDeck.id) {
            return deck;
          }

          const nextCards = deck.cards.filter((card) => {
            return card.id !== selectedCard.id;
          });

          return {
            ...deck,
            cardCount: Math.max(deck.cardCount - 1, 0),
            cards: nextCards,
            previewImageSrcList: nextCards
              .slice(0, 3)
              .map((card) => card.imageSrc),
          };
        });
      });

      actions.closeHero();

      return true;
    };

  useEffect(() => {
    void loadDeckSummaries();
  }, []);

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, [clearCloseTimeout]);

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
