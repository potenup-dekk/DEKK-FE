import type { CardContentData, CardProductData } from "@/entities/card";
import type { DeckCardContentData, DeckSummaryData } from "@/entities/deck";

interface CardSeed {
  cardId: number;
  imageId: number;
  tags: string[];
  height: number | null;
  weight: number | null;
  brand: string;
  productName: string;
  productImageId: number;
}

const toImageUrl = (imageId: number) => {
  return `https://picsum.photos/id/${imageId}/720/1080`;
};

const toProductImageUrl = (imageId: number) => {
  return `https://picsum.photos/id/${imageId}/240/320`;
};

const toProduct = (
  cardId: number,
  brand: string,
  productName: string,
  productImageId: number,
): CardProductData => {
  return {
    productId: cardId * 10,
    brand,
    name: productName,
    productImageUrl: toProductImageUrl(productImageId),
    productUrl: `https://example.com/products/${cardId * 10}`,
  };
};

const toCardContent = (seed: CardSeed): CardContentData => {
  return {
    cardId: seed.cardId,
    cardImageUrl: toImageUrl(seed.imageId),
    height: seed.height,
    weight: seed.weight,
    tags: seed.tags,
    products: [
      toProduct(
        seed.cardId,
        seed.brand,
        seed.productName,
        seed.productImageId,
      ),
    ],
  };
};

const toDeckCardContent = (card: CardContentData): DeckCardContentData => {
  return {
    cardId: card.cardId,
    cardImageUrl: card.cardImageUrl,
    height: card.height,
    weight: card.weight,
    tags: card.tags,
    products: card.products,
  };
};

const MOCK_ALL_CARD_COUNT = 50;
const MOCK_CARD_ID_START = 301;

const CARD_SEEDS: CardSeed[] = [
  {
    cardId: 301,
    imageId: 1011,
    tags: ["미니멀", "캐주얼", "봄"],
    height: 176,
    weight: 67,
    brand: "DEKK BASIC",
    productName: "오버핏 옥스포드 셔츠",
    productImageId: 1012,
  },
  {
    cardId: 302,
    imageId: 1015,
    tags: ["스트릿", "모노톤"],
    height: 182,
    weight: 74,
    brand: "DEKK LAB",
    productName: "와이드 스트레이트 데님",
    productImageId: 1020,
  },
  {
    cardId: 303,
    imageId: 1027,
    tags: ["클래식", "포멀"],
    height: 171,
    weight: 60,
    brand: "DEKK FORM",
    productName: "싱글 브레스티드 블레이저",
    productImageId: 1031,
  },
  {
    cardId: 304,
    imageId: 1035,
    tags: ["여름", "데일리"],
    height: 168,
    weight: 57,
    brand: "DEKK AIR",
    productName: "린넨 하프 셔츠",
    productImageId: 1048,
  },
  {
    cardId: 305,
    imageId: 1050,
    tags: ["레이어드", "가을"],
    height: 179,
    weight: 69,
    brand: "DEKK STUDIO",
    productName: "코튼 니트 가디건",
    productImageId: 1062,
  },
  {
    cardId: 306,
    imageId: 1067,
    tags: ["아웃도어", "윈터"],
    height: 184,
    weight: 78,
    brand: "DEKK TRAIL",
    productName: "라이트 패딩 베스트",
    productImageId: 1074,
  },
  {
    cardId: 307,
    imageId: 1078,
    tags: ["러블리", "파스텔"],
    height: 162,
    weight: 50,
    brand: "DEKK BLOOM",
    productName: "크롭 가디건",
    productImageId: 1080,
  },
  {
    cardId: 308,
    imageId: 1084,
    tags: ["워크웨어", "빈티지"],
    height: null,
    weight: null,
    brand: "DEKK GARAGE",
    productName: "캔버스 워크 재킷",
    productImageId: 1082,
  },
];

const buildMockMainCards = () => {
  return Array.from({ length: MOCK_ALL_CARD_COUNT }, (_, index) => {
    const seed = CARD_SEEDS[index % CARD_SEEDS.length];
    const cardId = MOCK_CARD_ID_START + index;

    return toCardContent({
      ...seed,
      cardId,
      imageId: seed.imageId + index,
      productImageId: seed.productImageId + index,
    });
  });
};

const MOCK_MAIN_CARDS: CardContentData[] = buildMockMainCards();

const MOCK_DEFAULT_DECK_CARDS: DeckCardContentData[] =
  MOCK_MAIN_CARDS.map(toDeckCardContent);

const MOCK_CUSTOM_DECKS: DeckSummaryData[] = [
  {
    deckId: 1,
    name: "출근룩",
    type: "CUSTOM",
    cardCount: 3,
    previewImageUrls: [toImageUrl(1015), toImageUrl(1027), toImageUrl(1084)],
  },
  {
    deckId: 2,
    name: "주말코디",
    type: "CUSTOM",
    cardCount: 2,
    previewImageUrls: [toImageUrl(1035), toImageUrl(1078)],
  },
  {
    deckId: 3,
    name: "겨울아우터",
    type: "CUSTOM",
    cardCount: 1,
    previewImageUrls: [toImageUrl(1067)],
  },
];

export { MOCK_CUSTOM_DECKS, MOCK_DEFAULT_DECK_CARDS, MOCK_MAIN_CARDS };
