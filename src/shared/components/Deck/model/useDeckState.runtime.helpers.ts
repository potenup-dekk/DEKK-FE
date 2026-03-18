import {
  createCustomDeckAction,
  deleteCustomDeckAction,
  leaveSharedDeckAction,
  saveCardToCustomDeckAction,
  shareCustomDeckAction,
  stopCustomDeckShareAction,
  updateCustomDeckNameAction,
} from "@/shared/api/actions";
import { getDecks } from "@/shared/api/services";
import { mapDeckSummaries } from "./deckState.helpers";
import { toDefaultDeckPreviewImageSrcList } from "./deckState.images";
import type createDeckStateActions from "./useDeckState.actions";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";
import {
  createDeleteSelectedCardHandler,
  createLoadCustomDeckCards,
  createLoadDefaultDeckCards,
  createOpenDeckHandler,
  createPrefetchDeckDetailHandler,
  createRetryLoadDefaultDeckHandler,
} from "./useDeckState.handlers";

const createDeckStateRuntimeHandlers = (
  store: ReturnType<typeof useDeckStateStore>,
  actions: ReturnType<typeof createDeckStateActions>,
  activeDeck: UseDeckStateResult["activeDeck"],
  selectedCard: UseDeckStateResult["selectedCard"],
) => {
  const loadDefaultDeckCards = createLoadDefaultDeckCards(store);
  const loadCustomDeckCards = createLoadCustomDeckCards(store);
  const prefetchDeckDetail = createPrefetchDeckDetailHandler(
    store,
    loadDefaultDeckCards,
    loadCustomDeckCards,
  );

  const wait = (milliseconds: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  const syncDeckListFromServer = async (createdDeckName?: string) => {
    const maxAttempts = createdDeckName ? 8 : 1;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const summaryResponse = await getDecks();
      const nextDecks = mapDeckSummaries(summaryResponse.data ?? []);

      store.setDecks((currentDecks) => {
        const currentDeckMap = new Map(
          currentDecks.map((deck) => {
            return [deck.id, deck] as const;
          }),
        );

        const currentCardMap = new Map(
          currentDecks.map((deck) => {
            return [deck.id, deck.cards] as const;
          }),
        );

        return nextDecks.map((deck) => {
          const currentDeck = currentDeckMap.get(deck.id) ?? null;
          const shouldPreserveSharedMeta =
            deck.type === "SHARED" && currentDeck?.type === "SHARED";

          return {
            ...deck,
            sharedToken:
              deck.sharedToken ??
              (shouldPreserveSharedMeta ? currentDeck.sharedToken : null),
            sharedExpiredInSeconds:
              deck.sharedExpiredInSeconds ??
              (shouldPreserveSharedMeta
                ? currentDeck.sharedExpiredInSeconds
                : null),
            sharedRole:
              deck.sharedRole ??
              (shouldPreserveSharedMeta ? currentDeck.sharedRole : null),
            cards: currentCardMap.get(deck.id) ?? [],
          };
        });
      });

      if (!createdDeckName) {
        return;
      }

      const hasCreatedDeck = nextDecks.some((deck) => {
        return deck.name.trim() === createdDeckName;
      });

      if (hasCreatedDeck) {
        return;
      }

      if (attempt < maxAttempts - 1) {
        await wait(250);
      }
    }
  };

  const createDeck = async (name: string) => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return false;
    }

    try {
      await createCustomDeckAction(trimmedName);
      await syncDeckListFromServer(trimmedName);
    } catch {
      return false;
    }

    return true;
  };

  const saveSelectedCardToCustomDeck = async (customDeckId: number) => {
    if (!selectedCard) {
      return false;
    }

    try {
      await saveCardToCustomDeckAction(customDeckId, selectedCard.cardId);
    } catch {
      return false;
    }

    store.setDecks((previousDecks) => {
      return previousDecks.map((deck) => {
        if (deck.id !== customDeckId) {
          return deck;
        }

        const hasCard = deck.cards.some((card) => {
          return card.id === selectedCard.id;
        });

        if (hasCard) {
          return deck;
        }

        const nextCards = [selectedCard, ...deck.cards];

        return {
          ...deck,
          cardCount: deck.cardCount + 1,
          cards: nextCards,
          previewImageSrcList: toDefaultDeckPreviewImageSrcList(nextCards),
        };
      });
    });

    try {
      await syncDeckListFromServer();
    } catch {
      return true;
    }

    return true;
  };

  const updateActiveDeckName = async (name: string) => {
    if (!activeDeck) {
      return false;
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      return false;
    }

    if (activeDeck.isDefault) {
      return false;
    }

    try {
      await updateCustomDeckNameAction(activeDeck.id, trimmedName);
    } catch {
      return false;
    }

    store.setDecks((previousDecks) => {
      return previousDecks.map((deck) => {
        if (deck.id !== activeDeck.id) {
          return deck;
        }

        return {
          ...deck,
          name: trimmedName,
        };
      });
    });

    return true;
  };

  const deleteActiveDeck = async () => {
    if (!activeDeck || activeDeck.isDefault) {
      return false;
    }

    try {
      await deleteCustomDeckAction(activeDeck.id);
    } catch {
      return false;
    }

    actions.closeDeck();
    store.setDecks((previousDecks) => {
      return previousDecks.filter((deck) => deck.id !== activeDeck.id);
    });

    return true;
  };

  const shareActiveDeck = async () => {
    if (!activeDeck || activeDeck.isDefault) {
      return null;
    }

    try {
      const response = await shareCustomDeckAction(activeDeck.id);
      return response.data ?? null;
    } catch {
      return null;
    }
  };

  const stopShareActiveDeck = async () => {
    if (!activeDeck || activeDeck.isDefault) {
      return false;
    }

    try {
      await stopCustomDeckShareAction(activeDeck.id);
      return true;
    } catch {
      return false;
    }
  };

  const leaveSharedActiveDeck = async () => {
    if (!activeDeck || activeDeck.isDefault) {
      return false;
    }

    try {
      await leaveSharedDeckAction(activeDeck.id);
      return true;
    } catch {
      return false;
    }
  };

  const closeDeck = () => {
    actions.closeDeck();

    void syncDeckListFromServer();
  };

  return {
    closeDeck,
    createDeck,
    deleteActiveDeck,
    deleteSelectedCard: createDeleteSelectedCardHandler(
      store,
      actions,
      activeDeck,
      selectedCard,
    ),
    openDeck: createOpenDeckHandler(
      store,
      actions,
      loadDefaultDeckCards,
      loadCustomDeckCards,
    ),
    prefetchDeckDetail,

    retryLoadDefaultDeck: createRetryLoadDefaultDeckHandler(
      store,

      loadDefaultDeckCards,
    ),
    saveSelectedCardToCustomDeck,
    shareActiveDeck,
    leaveSharedActiveDeck,
    stopShareActiveDeck,
    updateActiveDeckName,
  };
};

export { createDeckStateRuntimeHandlers };
