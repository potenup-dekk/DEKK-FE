import { getSelectedTransform } from "./deckPosition";

const selectDeckCard = (
  cardElement: HTMLDivElement,
  setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  setSelectedScale: React.Dispatch<React.SetStateAction<number>>,
) => {
  const selectedTransform = getSelectedTransform(
    cardElement.getBoundingClientRect(),
  );

  setOffset(selectedTransform.offset);
  setSelectedScale(selectedTransform.scale);
};

const resolveDeckCardRotate = (styleRotate: unknown, randomRotate: number) => {
  if (typeof styleRotate === "number" || typeof styleRotate === "string") {
    return styleRotate;
  }

  return randomRotate;
};

export { resolveDeckCardRotate, selectDeckCard };
