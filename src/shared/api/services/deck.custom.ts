import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { CreateCustomDeckPayload, CustomDeckData } from "@/entities/deck";
import type { ApiResponse } from "@/shared/types/api";

const toCustomDeckList = (data: unknown): CustomDeckData[] => {
  if (!Array.isArray(data)) return [];

  return data
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const raw = item as Record<string, unknown>;
      const deckId = raw.deckId;
      const name = raw.name;
      const cardCount = raw.cardCount;
      const imageUrl = raw.imageUrl;

      if (
        typeof deckId !== "number" ||
        typeof name !== "string" ||
        typeof cardCount !== "number"
      ) {
        return null;
      }

      return {
        deckId,
        name,
        cardCount,
        imageUrl: typeof imageUrl === "string" ? imageUrl : "",
      } satisfies CustomDeckData;
    })
    .filter((item): item is CustomDeckData => item !== null);
};

const assertCustomDeckGetResponse = <T>(response: ApiResponse<T>) => {
  if (response.code === "SD20008" || response.code.startsWith("SD2")) return response;

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckCreateResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20005" || response.code.startsWith("SD2")) return response;

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckSaveResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20009" || response.code.startsWith("SD2")) return response;

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const getCustomDecks = async () => {
  const response = await requestJson<ApiResponse<unknown>>("/api/decks/custom", { method: "GET" });

  const validated = assertCustomDeckGetResponse(response);

  return {
    ...validated,
    data: toCustomDeckList(validated.data),
  };
};

const createCustomDeck = async (
  payload: CreateCustomDeckPayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>("/w/v1/decks/custom", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  return assertCustomDeckCreateResponse(response);
};

const saveCardToCustomDeck = async (
  customDeckId: number,
  cardId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/custom/${customDeckId}/cards/${cardId}`,
    {
      method: "POST",
      headers,
    },
  );

  return assertCustomDeckSaveResponse(response);
};

export { createCustomDeck, getCustomDecks, saveCardToCustomDeck };
