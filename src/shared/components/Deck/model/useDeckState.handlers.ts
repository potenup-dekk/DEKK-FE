import { getCustomDeckCards, getDefaultDeckCards } from "@/shared/api/services";
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

const hasLoadedCustomDeckCards = (decks: DeckItem[], customDeckId: number) => {
  const targetDeck = decks.find((deck) => deck.id === customDeckId);

  if (!targetDeck || targetDeck.isDefault) {
    return false;
  }

  if (targetDeck.cardCount === 0) {
    return true;
  }

  return targetDeck.cards.length > 0;
};

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

const createLoadCustomDeckCards = (
  store: ReturnType<typeof useDeckStateStore>,
) => {
  const inFlightCustomDeckIds = new Set<number>();

  return async (customDeckId: number) => {
    if (inFlightCustomDeckIds.has(customDeckId)) {
      return;
    }

    if (hasLoadedCustomDeckCards(store.decks, customDeckId)) {
      return;
    }

    inFlightCustomDeckIds.add(customDeckId);

    try {
      let currentPage = 0;
      let hasNext = true;
      const allCards: DeckCardItem[] = [];
      let latestShareToken: string | null = null;
      let latestExpiredInSeconds: number | null = null;
      let latestRole: "HOST" | "GUEST" | null = null;

      while (hasNext) {
        const response = await getCustomDeckCards(
          customDeckId,
          currentPage,
          DEFAULT_DECK_PAGE_SIZE,
        );
        const responseData = response.data;

        if (!responseData) {
          break;
        }

        allCards.push(...mapDefaultDeckCards(responseData.content));
        latestShareToken = responseData.token;
        latestExpiredInSeconds = responseData.expiredInSeconds;
        latestRole = responseData.role;
        hasNext = responseData.hasNext;
        currentPage += 1;
      }

      store.setDecks((previousDecks) => {
        return previousDecks.map((deck) => {
          if (deck.id !== customDeckId) {
            return deck;
          }

          return {
            ...deck,
            sharedToken: latestShareToken,
            sharedExpiredInSeconds: latestExpiredInSeconds,
            sharedRole: latestRole,
            cardCount: allCards.length,
            cards: allCards,
          };
        });
      });
    } catch {
      return;
    } finally {
      inFlightCustomDeckIds.delete(customDeckId);
    }
  };
};

const createPrefetchDeckDetailHandler = (
  store: ReturnType<typeof useDeckStateStore>,
  loadDefaultDeckCards: () => Promise<void>,
  loadCustomDeckCards: (customDeckId: number) => Promise<void>,
): UseDeckStateResult["prefetchDeckDetail"] => {
  return (deckId) => {
    if (isDefaultDeck(store.decks, deckId)) {
      void loadDefaultDeckCards();
      return;
    }

    void loadCustomDeckCards(deckId);
  };
};

const createOpenDeckHandler = (
  store: ReturnType<typeof useDeckStateStore>,
  actions: ReturnType<typeof createDeckStateActions>,
  loadDefaultDeckCards: () => Promise<void>,
  loadCustomDeckCards: (customDeckId: number) => Promise<void>,
): UseDeckStateResult["openDeck"] => {
  return (deckId, sourceRect) => {
    actions.openDeck(deckId, sourceRect);

    if (isDefaultDeck(store.decks, deckId)) {
      void loadDefaultDeckCards();
      return;
    }

    void loadCustomDeckCards(deckId);
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
  createLoadCustomDeckCards,
  createLoadDefaultDeckCards,
  createOpenDeckHandler,
  createPrefetchDeckDetailHandler,
  createRetryLoadDefaultDeckHandler,
};
