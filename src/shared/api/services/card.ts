import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { ApiResponse } from "@/shared/types/api";
import type { CardListResponse, SwipePayload } from "@/entities/card";

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
  const response = await requestJson<ApiResponse<CardListResponse>>(
    `/api/cards?page=${page}&size=${size}`,
    { method: "GET" },
  );

  return assertCardResponse(response);
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
