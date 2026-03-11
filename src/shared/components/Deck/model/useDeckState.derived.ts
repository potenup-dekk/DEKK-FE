import { useMemo } from "react";
import type { DeckItem } from "./deckState.helpers";

interface UseDeckDerivedStateResult {
  activeDeck: DeckItem | null;
  selectedCard: DeckItem["cards"][number] | null;
}

const useDeckDerivedState = (
  decks: DeckItem[],
  activeDeckId: number | null,
  selectedCardId: number | null,
): UseDeckDerivedStateResult => {
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

export default useDeckDerivedState;
