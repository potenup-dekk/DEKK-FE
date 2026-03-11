interface DeckCardItemProps {
  cardId: number;
  name: string;
  imageSrc: string;
}

interface DeckItemProps {
  deckId: number;
  name: string;
  isDefault: boolean;
  previewImageSrcList: string[];
  cards: DeckCardItemProps[];
}

interface DeckOriginOffsetProps {
  x: number;
  y: number;
}

export type { DeckCardItemProps, DeckItemProps, DeckOriginOffsetProps };
