const SELECTED_WIDTH_RATIO = 0.83333333;

interface DeckOriginOffset {
  x: number;
  y: number;
}

const getSelectedTransform = (rect: DOMRect) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const targetWidth = window.innerWidth * SELECTED_WIDTH_RATIO;

  return {
    offset: {
      x: window.innerWidth / 2 - centerX,
      y: window.innerHeight / 2 - centerY,
    },
    scale: targetWidth / rect.width,
  };
};

const getDeckOriginOffset = (rect: DOMRect): DeckOriginOffset => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return {
    x: centerX - window.innerWidth / 2,
    y: centerY - window.innerHeight / 2,
  };
};

export { getDeckOriginOffset, getSelectedTransform };
