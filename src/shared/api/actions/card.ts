"use server";

import type { SwipePayload } from "@/entities/card";
import { saveCardSwipeEvaluation } from "@/shared/api/services/card";

const saveCardSwipeEvaluationAction = async (
  cardId: number,
  payload: SwipePayload,
) => {
  return saveCardSwipeEvaluation(cardId, payload);
};

export { saveCardSwipeEvaluationAction };
