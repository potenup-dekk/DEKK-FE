const deckBackdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const deckCardLayoutTransition = {
  type: "spring",
  damping: 30,
  stiffness: 300,
} as const;

const deckCardSelectedTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
} as const;

const getRandomRotation = (maxRotation: number) => {
  return Math.random() * (maxRotation * 2) - maxRotation;
};

export {
  deckBackdropMotion,
  deckCardLayoutTransition,
  deckCardSelectedTransition,
  getRandomRotation,
};
