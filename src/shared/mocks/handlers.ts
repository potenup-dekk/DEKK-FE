import { http, HttpResponse } from "msw";
import {
  MOCK_CUSTOM_DECKS,
  MOCK_DEFAULT_DECK_CARDS,
  MOCK_MAIN_CARDS,
} from "@/shared/mocks/data";

let defaultDeckCards = [...MOCK_DEFAULT_DECK_CARDS];

const toPagedList = <T>(items: T[], page: number, size: number) => {
  const safePage = Number.isFinite(page) && page >= 0 ? page : 0;
  const safeSize = Number.isFinite(size) && size > 0 ? size : 10;
  const start = safePage * safeSize;
  const end = start + safeSize;

  return {
    content: items.slice(start, end),
    currentPage: safePage,
    size: safeSize,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / safeSize),
    hasNext: end < items.length,
  };
};

const getDecksResponse = () => {
  const defaultPreview = defaultDeckCards
    .slice(0, 3)
    .map((card) => card.cardImageUrl);

  return [
    {
      deckId: 0,
      name: "모든 카드",
      type: "DEFAULT" as const,
      cardCount: defaultDeckCards.length,
      previewImageUrls: defaultPreview,
    },
    ...MOCK_CUSTOM_DECKS,
  ];
};

const handlers = [
  http.get("*/api/cards", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "0");
    const size = Number(url.searchParams.get("size") ?? "5");
    const paged = toPagedList(MOCK_MAIN_CARDS, page, size);

    return HttpResponse.json({
      code: "CARD_LIST_OK",
      message: "카드 목록 조회 성공",
      data: {
        content: paged.content,
        currentPage: paged.currentPage,
        size: paged.size,
        totalElements: paged.totalElements,
        hasNext: paged.hasNext,
      },
    });
  }),

  http.post("*/api/cards/:cardId/swipe", () => {
    return HttpResponse.json({
      code: "CARD_SWIPE_OK",
      message: "카드 평가 저장 성공",
      data: null,
    });
  }),

  http.get("*/w/v1/decks", () => {
    return HttpResponse.json({
      code: "SD20003",
      message: "덱 목록 조회 성공",
      data: getDecksResponse(),
    });
  }),

  http.get("*/w/v1/decks/default/cards", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "0");
    const size = Number(url.searchParams.get("size") ?? "100");
    const paged = toPagedList(defaultDeckCards, page, size);

    return HttpResponse.json({
      code: "SD20003",
      message: "기본 덱 카드 조회 성공",
      data: paged,
    });
  }),

  http.delete("*/w/v1/decks/default/cards/:cardId", ({ params }) => {
    const cardId = Number(params.cardId);

    if (!Number.isFinite(cardId)) {
      return HttpResponse.json(
        {
          code: "SD40001",
          message: "유효하지 않은 카드 ID입니다.",
          data: null,
        },
        { status: 400 },
      );
    }

    defaultDeckCards = defaultDeckCards.filter((card) => card.cardId !== cardId);

    return HttpResponse.json({
      code: "SD20004",
      message: "기본 덱 카드 삭제 성공",
      data: null,
    });
  }),
];

export default handlers;
