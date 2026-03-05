import { requestJson } from "@/shared/api/client";
import type { ApiSuccess } from "@/shared/types/api";

export type SwipeType = "LIKE" | "DISLIKE";

export type SwipePayload = {
  swipeType: SwipeType;
};

export interface CardListResponse {
  content: CardContentData[];
  currentPage: number;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

export interface CardContentData {
  cardId: number;
  cardImageUrl: string;
  height: number | null;
  weight: number | null;
  tags: string[];
}

export async function getCards(page: number, size: number) {
  return requestJson<ApiSuccess<CardListResponse>>(
    `/w/v1/cards?page=${page}&size=${size}`,
    { method: "GET" },
  );
}

export async function saveCardSwipeEvaluation(
  cardId: number,
  payload: SwipePayload,
) {
  return requestJson<ApiSuccess<null>>(`/w/v1/cards/${cardId}/swipe`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
