import { deleteDefaultDeckCardAction } from "@/shared/api/actions";
import type createDeckStateActions from "./useDeckState.actions";
import useDeckStateStore from "./useDeckState.store";
import type { UseDeckStateResult } from "./useDeckState.types";

const createDeleteSelectedCardHandler = (
  store: ReturnType<typeof useDeckStateStore>,
  actions: ReturnType<typeof createDeckStateActions>,
  activeDeck: UseDeckStateResult["activeDeck"],
  selectedCard: UseDeckStateResult["selectedCard"],
): UseDeckStateResult["deleteSelectedCard"] => {
  return async () => {
    if (!activeDeck || !selectedCard || !activeDeck.isDefault) {
      return false;
    }

    await deleteDefaultDeckCardAction(selectedCard.cardId);

    store.setDecks((previousDecks) => {
      return previousDecks.map((deck) => {
        if (deck.id !== activeDeck.id) {
          return deck;
        }

        const nextCards = deck.cards.filter(
          (card) => card.id !== selectedCard.id,
        );

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
};

export default createDeleteSelectedCardHandler;
