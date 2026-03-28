const tabIndicatorTransition = {
  type: "spring",
  stiffness: 450,
  damping: 35,
} as const;

const getTabIndicatorAnimate = (activeIndex: number, hasSelection: boolean) => {
  if (!hasSelection) {
    return {
      opacity: 0,
    };
  }

  return {
    x: `${activeIndex * 100}%`,
    opacity: 1,
  };
};

export { getTabIndicatorAnimate, tabIndicatorTransition };
