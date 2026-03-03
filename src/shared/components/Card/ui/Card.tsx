"use client";

import { AnimatePresence } from "framer-motion";
import useCardStack from "../model/useCardStack";
import FrontCard from "./FrontCard";
import { motion } from "framer-motion";
import BackCard from "./BackCard";

const Card = () => {
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
    backImage,
    opacity,
    x,
    setIsSwiping,
    cards,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
  } = useCardStack();

  return (
    <AnimatePresence
      onExitComplete={() => {
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
  );
};

export default Card;
