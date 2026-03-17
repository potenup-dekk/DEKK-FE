import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { ApiResponse } from "@/shared/types/api";
import type { CardListResponse, SwipePayload } from "@/entities/card";

const toCardListResponse = (
  data: unknown,
  page: number,
  size: number,
): CardListResponse => {
  if (Array.isArray(data)) {
    return {
      content: data,
      currentPage: page,
      size,
      totalElements: data.length,
      hasNext: false,
    };
  }

  if (data && typeof data === "object") {
    const raw = data as Partial<CardListResponse> & { cards?: unknown };

    if (Array.isArray(raw.content)) {
      return {
        content: raw.content,
        currentPage:
          typeof raw.currentPage === "number" ? raw.currentPage : page,
        size: typeof raw.size === "number" ? raw.size : size,
        totalElements:
          typeof raw.totalElements === "number"
            ? raw.totalElements
            : raw.content.length,
        hasNext: Boolean(raw.hasNext),
      };
    }

    if (Array.isArray(raw.cards)) {
      return {
        content: raw.cards,
        currentPage: page,
        size,
        totalElements: raw.cards.length,
        hasNext: false,
      };
    }
  }

  return {
    content: [],
    currentPage: page,
    size,
    totalElements: 0,
    hasNext: false,
  };
};

const isSuccessCode = (code: string) => {
  return code.startsWith("S") || code.endsWith("OK");
};

const assertCardResponse = <T>(response: ApiResponse<T>) => {
  switch (response.code) {
    case "CARD_LIST_OK":
    case "CARD_SWIPE_OK": {
      return response;
    }
    default: {
      if (isSuccessCode(response.code)) {
        return response;
      }

      throw new ApiRequestError(
        400,
        response.message,
        response.code,
        response.errors,
      );
    }
  }
};

const getCards = async (page: number, size: number) => {
  const response = await requestJson<ApiResponse<unknown>>(
    `/api/cards?page=${page}&size=${size}`,
    { method: "GET" },
  );

  const validated = assertCardResponse(response);

  return {
    ...validated,
    data: toCardListResponse(validated.data, page, size),
  };
};

const saveCardSwipeEvaluation = async (
  cardId: number,
  payload: SwipePayload,
) => {
  const response = await requestJson<ApiResponse<null>>(
    `/api/cards/${cardId}/swipe`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  return assertCardResponse(response);
};

export { getCards, saveCardSwipeEvaluation };
