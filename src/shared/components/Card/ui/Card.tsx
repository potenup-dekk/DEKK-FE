"use client";

import { useRef } from "react";
import useCardStack from "../model/useCardStack";
import CardStackContent from "./CardStackContent";
import { useAuthGuard } from "@/shared/hooks";
import { CardAuthProvider } from "../model/cardAuthContext";

const APPEND_INTERVAL = 3;

const moveFrontCardToBack = <T,>(items: T[]) => {
  if (items.length <= 1) return items;
  const [frontCard, ...rest] = items;
  return [...rest, frontCard];
};

const Card = () => {
  const { isAuthenticated } = useAuthGuard();
  const cardStack = useCardStack(isAuthenticated);
  const swipeCycleCountRef = useRef(0);

  const handleExitComplete = () => {
    cardStack.resetFlipState();
    cardStack.setCards((prev) => moveFrontCardToBack(prev));

    swipeCycleCountRef.current += 1;
    if (swipeCycleCountRef.current % APPEND_INTERVAL === 0) {
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
      />
    </CardAuthProvider>
  );
};

export default Card;
