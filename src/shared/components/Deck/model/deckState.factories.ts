import { PREVIEW_IMAGE_SRC_LIST } from "./deckState.images";
import type { DeckCardItem, DeckItem } from "./deckState.types";

const buildDeckCards = (deckId: number, count: number): DeckCardItem[] => {
  return Array.from({ length: count }, (_, index) => {
    const imageSrc =
      PREVIEW_IMAGE_SRC_LIST[index % PREVIEW_IMAGE_SRC_LIST.length];

    return {
      id: deckId * 100 + index,
      cardId: deckId * 100 + index,
      name: `카드 ${index + 1}`,
      imageSrc,
      height: null,
      weight: null,
      tags: [],
      products: [],
    };
  });
};

const createInitialDecks = (): DeckItem[] => {
  return [
    {
      id: 0,
      name: "나의 모든 보관함",
      type: "DEFAULT",
      sharedToken: null,
      sharedExpiredInSeconds: null,
      sharedRole: null,
      isDefault: true,
      cardCount: 0,
      previewImageSrcList: [...PREVIEW_IMAGE_SRC_LIST],
      cards: buildDeckCards(0, 16),
    },
  ];
};

const createCustomDeck = (decks: DeckItem[], name: string): DeckItem[] => {
  const nextId = decks.reduce((maxId, deck) => {
    return Math.max(maxId, deck.id);
  }, 0);

  return [
    ...decks,
    {
      id: nextId + 1,
      name,
      type: "CUSTOM",
      sharedToken: null,
      sharedExpiredInSeconds: null,
      sharedRole: null,
      isDefault: false,
      cardCount: 0,
      previewImageSrcList: [...PREVIEW_IMAGE_SRC_LIST],
      cards: [],
    },
  ];
};

export { createCustomDeck, createInitialDecks };
