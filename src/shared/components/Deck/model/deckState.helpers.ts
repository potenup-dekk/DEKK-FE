import type {
  DeckCardContentData,
  DeckProductData,
  DeckSummaryData,
} from "@/entities/deck";
import { createCustomDeck, createInitialDecks } from "./deckState.factories";
import {
  normalizeDeckPreviewImageSrcList,
  resolveCdnImageUrl,
  toDefaultDeckPreviewImageSrcList,
} from "./deckState.images";
import type {
  DeckCardItem,
  DeckCardProductItem,
  DeckItem,
  DeckOriginOffset,
} from "./deckState.types";

const toDeckCardLayoutId = (cardId: number) => {
  return `deck-card-${cardId}`;
};
const mapDeckProducts = (
  products: DeckProductData[] | undefined,
  cardId: number,
) => {
  if (!products?.length) {
    return [];
  }

  return products.map((product, index) => {
    return {
      productId: product.productId ?? cardId * 1_000 + index,
      brand: product.brand ?? "브랜드 정보 없음",
      name: product.name ?? "상품 정보 없음",
      productImageUrl:
        product.productImageUrl ?? product.productsImageUrl ?? "",
      productUrl: product.productUrl ?? product.url ?? "#",
    };
  });
};

const mapDefaultDeckCards = (
  content: DeckCardContentData[],
): DeckCardItem[] => {
  return content.map((item, index) => {
    return {
      id: item.cardId,
      cardId: item.cardId,
      name: `카드 ${index + 1}`,
      imageSrc: resolveCdnImageUrl(item.cardImageUrl),
      height: item.height,
      weight: item.weight,
      tags: item.tags ?? item.tag ?? [],
      products: mapDeckProducts(item.products, item.cardId),
    };
  });
};

const patchDefaultDeckCards = (decks: DeckItem[], cards: DeckCardItem[]) => {
  return decks.map((deck) => {
    if (deck.id !== 0) {
      return deck;
    }

    return {
      ...deck,
      cardCount: cards.length,
      previewImageSrcList: toDefaultDeckPreviewImageSrcList(cards),
      cards,
    };
  });
};

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
      if (left.isSystem && !right.isSystem) {
        return -1;
      }
      if (!left.isSystem && right.isSystem) {
        return 1;
      }
      return left.id - right.id;
    });
};

export {
  createCustomDeck,
  createInitialDecks,
  mapDeckSummaries,
  mapDefaultDeckCards,
  patchDefaultDeckCards,
  toDeckCardLayoutId,
};
export type { DeckCardItem, DeckCardProductItem, DeckItem, DeckOriginOffset };
