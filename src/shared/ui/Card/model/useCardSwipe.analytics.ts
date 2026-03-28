import type { SwipeType } from "@/entities/card";
import type { CardItem } from "./useCardStack.types";

interface GtmCardSwipeEvent {
  event: "card_swipe";
  swipe_type: SwipeType;
  card_id: number | null;
  is_logged_in: boolean;
  source: "main_card";
}

interface DataLayerTarget {
  dataLayer?: unknown[];
}

const toCurrentCardId = (cards: CardItem[]) => {
  const frontCard = cards[0];

  return frontCard ? frontCard.cardId : null;
};

const pushCardSwipeEvent = (
  cards: CardItem[],
  swipeType: SwipeType,
  isLoggedIn: boolean,
) => {
  if (typeof window === "undefined") {
    return;
  }

  const target = window as Window & DataLayerTarget;
  const event: GtmCardSwipeEvent = {
    event: "card_swipe",
    swipe_type: swipeType,
    card_id: toCurrentCardId(cards),
    is_logged_in: isLoggedIn,
    source: "main_card",
  };

  if (!Array.isArray(target.dataLayer)) {
    target.dataLayer = [];
  }

  target.dataLayer.push(event);
};

export { pushCardSwipeEvent };
