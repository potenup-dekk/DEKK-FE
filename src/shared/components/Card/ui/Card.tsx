"use client";

import useCardStack from "../model/useCardStack";
import CardStackContent from "./CardStackContent";
import { useAuthGuard } from "@/shared/hooks";
import { CardAuthProvider } from "../model/cardAuthContext";
import type { CardDisplayOptions } from "../model/props.type";

const REMAINING_CARD_APPEND_THRESHOLD = 3;

const removeSwipedCard = <T extends { id: string }>(
  items: T[],
  removingCardId: string | null,
) => {
  if (!removingCardId) {
    return items.slice(1);
  }

  return items.filter((item) => item.id !== removingCardId);
};

const Card = ({
  isCardCompressed,
  isFocusMode,
  isFocusTransitioning,
  compressedCardHeight,
  expandedCardHeight,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
}: CardDisplayOptions) => {
  const { isAuthenticated } = useAuthGuard();
  const cardStack = useCardStack(isAuthenticated);

  const handleExitComplete = () => {
    let shouldAppendNextPage = false;

    cardStack.resetFlipState();
    cardStack.setCards((prev) => {
      const nextCards = removeSwipedCard(prev, cardStack.removingCardId);
      shouldAppendNextPage =
        nextCards.length === REMAINING_CARD_APPEND_THRESHOLD;
      return nextCards;
    });

    if (shouldAppendNextPage) {
      void cardStack.appendNextPage();
    }

    cardStack.x.set(0);
    cardStack.setIsSwiping(false);
    cardStack.setRemovingCardId(null);
  };

  return (
    <CardAuthProvider isLoggedIn={isAuthenticated}>
      <CardStackContent
        cardStack={cardStack}
        onExitComplete={handleExitComplete}
        displayOptions={{
          isCardCompressed,
          isFocusMode,
          isFocusTransitioning,
          compressedCardHeight,
          expandedCardHeight,
          onToggleFocusMode,
          onOpenCustomDeckSheet,
        }}
      />
    </CardAuthProvider>
  );
};

export default Card;
