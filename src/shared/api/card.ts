import { requestJson } from "@/shared/api/client";
import type { ApiSuccess } from "@/shared/types/api";

export type SwipeType = "LIKE" | "DISLIKE";

export type SwipePayload = {
  swipeType: SwipeType;
};

export async function saveCardSwipeEvaluation(
  cardId: number,
  payload: SwipePayload,
) {
  return requestJson<ApiSuccess<null>>(`/w/v1/cards/${cardId}/swipe`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
