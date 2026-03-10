const tabIndicatorTransition = {
  type: "spring",
  stiffness: 450,
  damping: 35,
} as const;

const getTabIndicatorAnimate = (activeIndex: number, hasSelection: boolean) => {
  return {
    x: `${activeIndex * 100}%`,
    opacity: hasSelection ? 1 : 0,
  };
};

export { getTabIndicatorAnimate, tabIndicatorTransition };
