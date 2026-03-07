"use client";

import { AnimatePresence } from "framer-motion";
import useCardStack from "../model/useCardStack";
import FrontCard from "./FrontCard";
import { motion } from "framer-motion";
import BackCard from "./BackCard";
import { useAuthGuard } from "@/shared/hooks";
import { CardAuthProvider } from "../model/cardAuthContext";

const Card = () => {
  const { isAuthenticated } = useAuthGuard();
  const {
    setCards,
    rotate,
    filter,
    rotateYSpring,
    frontImage,
    backScale,
    backdropFilter,
    background,
    animateFlip,
    resetFlipState,
    backImage,
    opacity,
    x,
    setIsSwiping,
    cards,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
  } = useCardStack(isAuthenticated);

  return (
    <CardAuthProvider isLoggedIn={isAuthenticated}>
      <AnimatePresence
        onExitComplete={() => {
          resetFlipState();

          setCards((prev) => {
            if (prev.length === 0) return prev;

            const [, ...rest] = prev;
            return rest;
          });

          x.set(0);
          setIsSwiping(false);
          setRemovingCardId(null);
        }}
      >
        {/* front card */}
        {cards.length > 0 && !removingCardId && (
          <FrontCard
            key={cards[0].id}
            cards={cards}
            frontImage={frontImage}
            products={cards[0].products}
            height={cards[0].height}
            weight={cards[0].weight}
            tags={cards[0].tags}
            x={x}
            rotate={rotate}
            rotateYSpring={rotateYSpring}
            animateFlip={animateFlip}
            setIsSwiping={setIsSwiping}
            onLike={onLike}
            onDislike={onDislike}
            background={background}
            opacity={opacity}
            filter={filter}
            backdropFilter={backdropFilter}
          />
        )}

        {/* back card */}
        {cards.length > 1 && (
          <BackCard backImage={backImage} backScale={backScale} />
        )}
      </AnimatePresence>
    </CardAuthProvider>
  );
};

export default Card;
