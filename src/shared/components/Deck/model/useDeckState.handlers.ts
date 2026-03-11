import { getDefaultDeckCards } from "@/shared/api/services";
import {
  mapDefaultDeckCards,
  patchDefaultDeckCards,
  type DeckItem,
  type DeckCardItem,
} from "./deckState.helpers";
import createDeleteSelectedCardHandler from "./useDeckState.delete";
import type createDeckStateActions from "./useDeckState.actions";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";

const DEFAULT_DECK_PAGE_SIZE = 100;

const isDefaultDeck = (decks: DeckItem[], deckId: number | null) => {
  if (deckId === null) {
    return false;
  }

  const selectedDeck = decks.find((deck) => deck.id === deckId);

  return selectedDeck?.isDefault ?? false;
};

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "기본 덱 카드를 불러오지 못했습니다.";
};

const createLoadDefaultDeckCards = (
  store: ReturnType<typeof useDeckStateStore>,
) => {
  return async () => {
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
      const allCards: DeckCardItem[] = [];

      while (hasNext) {
        const response = await getDefaultDeckCards(
          currentPage,
          DEFAULT_DECK_PAGE_SIZE,
        );
        const responseData = response.data;

        if (!responseData) {
          break;
        }

        allCards.push(...mapDefaultDeckCards(responseData.content));
        hasNext = responseData.hasNext;
        currentPage += 1;
      }

      store.setDecks((previousDecks) => {
        return patchDefaultDeckCards(previousDecks, allCards);
      });
      store.setHasLoadedDefaultDeckCards(true);
      store.setDefaultDeckFetchStatus("success");
    } catch (error) {
      store.setDefaultDeckFetchError(toErrorMessage(error));
      store.setDefaultDeckFetchStatus("error");
    }
  };
};

const createOpenDeckHandler = (
  store: ReturnType<typeof useDeckStateStore>,
  actions: ReturnType<typeof createDeckStateActions>,
  loadDefaultDeckCards: () => Promise<void>,
): UseDeckStateResult["openDeck"] => {
  return (deckId, sourceRect) => {
    actions.openDeck(deckId, sourceRect);

    if (!isDefaultDeck(store.decks, deckId)) {
      return;
    }

    void loadDefaultDeckCards();
  };
};

const createRetryLoadDefaultDeckHandler = (
  store: ReturnType<typeof useDeckStateStore>,
  loadDefaultDeckCards: () => Promise<void>,
): UseDeckStateResult["retryLoadDefaultDeck"] => {
  return () => {
    if (!isDefaultDeck(store.decks, store.activeDeckId)) {
      return;
    }

    void loadDefaultDeckCards();
  };
};

export {
  createDeleteSelectedCardHandler,
  createLoadDefaultDeckCards,
  createOpenDeckHandler,
  createRetryLoadDefaultDeckHandler,
};
