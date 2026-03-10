import type { DeckCardContentData, DeckProductData } from "@/entities/deck";

interface DeckCardProductItem {
  productId: number;
  brand: string;
  name: string;
  productImageUrl: string;
  productUrl: string;
}

interface DeckCardItem {
  id: number;
  cardId: number;
  name: string;
  imageSrc: string;
  height: number | null;
  weight: number | null;
  tags: string[];
  products: DeckCardProductItem[];
}

interface DeckOriginOffset {
  x: number;
  y: number;
}

interface DeckItem {
  id: number;
  name: string;
  isSystem: boolean;
  previewImageSrcList: string[];
  cards: DeckCardItem[];
}

const PREVIEW_IMAGE_SRC_LIST = [
  "/goods/top.webp",
  "/goods/shirts.webp",
  "/goods/sweater.webp",
] as const;

const CARD_IMAGE_BASE_URL =
  "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com/";

const toDeckCardLayoutId = (cardId: number) => {
  return `deck-card-${cardId}`;
};

const resolveCdnImageUrl = (imageUrl: string) => {
  if (!imageUrl) {
    return PREVIEW_IMAGE_SRC_LIST[0];
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${CARD_IMAGE_BASE_URL}${imageUrl}`;
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

const toDefaultDeckPreviewImageSrcList = (cards: DeckCardItem[]) => {
  const remotePreviewImages = cards.slice(0, 3).map((card) => card.imageSrc);

  if (!remotePreviewImages.length) {
    return [...PREVIEW_IMAGE_SRC_LIST];
  }

  return remotePreviewImages;
};

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

const patchDefaultDeckCards = (decks: DeckItem[], cards: DeckCardItem[]) => {
  return decks.map((deck) => {
    if (deck.id !== 0) {
      return deck;
    }

    return {
      ...deck,
      previewImageSrcList: toDefaultDeckPreviewImageSrcList(cards),
      cards,
    };
  });
};

const createInitialDecks = (): DeckItem[] => {
  return [
    {
      id: 0,
      name: "모든 카드",
      isSystem: true,
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
      isSystem: false,
      previewImageSrcList: [...PREVIEW_IMAGE_SRC_LIST],
      cards: [],
    },
  ];
};

export {
  createCustomDeck,
  createInitialDecks,
  mapDefaultDeckCards,
  patchDefaultDeckCards,
  toDeckCardLayoutId,
};
export type { DeckCardItem, DeckCardProductItem, DeckItem, DeckOriginOffset };
