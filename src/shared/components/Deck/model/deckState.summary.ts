import type { DeckSummaryData } from "@/entities/deck";
import { normalizeDeckPreviewImageSrcList } from "./deckState.images";
import type { DeckItem } from "./deckState.types";

const mapDeckSummaries = (decks: DeckSummaryData[]): DeckItem[] => {
  return decks
    .map((deck) => {
      const isSystem = deck.type === "DEFAULT";

      return {
        id: deck.deckId,
        name: deck.name,
        isSystem,
        cardCount: deck.cardCount,
        previewImageSrcList: normalizeDeckPreviewImageSrcList(
          deck.previewImageUrls,
        ),
        cards: [],
      } satisfies DeckItem;
    })
    .sort((left, right) => {
      if (left.isSystem && !right.isSystem) return -1;
      if (!left.isSystem && right.isSystem) return 1;

      return left.id - right.id;
    });
};

export { mapDeckSummaries };
