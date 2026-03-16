import {
  createCustomDeckAction,
  leaveSharedDeckAction,
  deleteCustomDeckAction,
  saveCardToCustomDeckAction,
  turnOffSharedDeckAction,
  turnOnSharedDeckAction,
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
        const currentCardMap = new Map(
          currentDecks.map((deck) => {
            return [deck.id, deck.cards] as const;
          }),
        );

        return nextDecks.map((deck) => {
          return {
            ...deck,
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

  const turnOnSharedDeck = async (customDeckId: number) => {
    try {
      const response = await turnOnSharedDeckAction(customDeckId);
      await syncDeckListFromServer();

      return {
        success: true,
        tokenResult: response.data,
      };
    } catch {
      return {
        success: false,
      };
    }
  };

  const turnOffSharedDeck = async (customDeckId: number) => {
    try {
      await turnOffSharedDeckAction(customDeckId);
      await syncDeckListFromServer();
    } catch {
      return false;
    }

    return true;
  };

  const leaveSharedDeck = async (sharedDeckId: number) => {
    try {
      await leaveSharedDeckAction(sharedDeckId);
      await syncDeckListFromServer();
    } catch {
      return false;
    }

    return true;
  };

  return {
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

    retryLoadDefaultDeck: createRetryLoadDefaultDeckHandler(
      store,

      loadDefaultDeckCards,
    ),
    saveSelectedCardToCustomDeck,
    leaveSharedDeck,
    turnOffSharedDeck,
    turnOnSharedDeck,
    updateActiveDeckName,
  };
};

export { createDeckStateRuntimeHandlers };
