import type { DeckSummaryData } from "@/entities/deck";
import { normalizeDeckPreviewImageSrcList } from "./deckState.images";
import type { DeckItem } from "./deckState.types";

const mapDeckSummaries = (decks: DeckSummaryData[]): DeckItem[] => {
  return decks
    .map((deck) => {
      const isDefault = deck.type === "DEFAULT";

      return {
        id: deck.deckId,
        name: deck.name,
        type: deck.type,
        isDefault,
        cardCount: deck.cardCount,
        previewImageSrcList: normalizeDeckPreviewImageSrcList(
          deck.previewImageUrls,
        ),
        cards: [],
      } satisfies DeckItem;
    })
    .sort((left, right) => {
      if (left.isDefault && !right.isDefault) return -1;
      if (!left.isDefault && right.isDefault) return 1;

      return left.id - right.id;
    });
};

export { mapDeckSummaries };
