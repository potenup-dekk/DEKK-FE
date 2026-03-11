import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { DeckSummaryData, DefaultDeckCardsResponse } from "@/entities/deck";
import type { ApiResponse } from "@/shared/types/api";

const DEFAULT_DECK_SUCCESS_CODE = "SD20003" as const;
const DEFAULT_DECK_DELETE_SUCCESS_CODES = ["SD20004", "SD20005"] as const;

const isDefaultDeckSuccessCode = (code: string) => {
  return code === DEFAULT_DECK_SUCCESS_CODE;
};

const assertDeckResponse = <T>(response: ApiResponse<T>) => {
  if (isDefaultDeckSuccessCode(response.code)) {
    return response;
  }

  if (response.code.startsWith("SD2") || response.code.endsWith("OK")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const toDeckSummaryData = (
  raw: Record<string, unknown>,
): DeckSummaryData | null => {
  const deckIdValue = raw.deckId;
  const nameValue = raw.name;
  const typeValue = raw.type;
  const cardCountValue = raw.cardCount;
  const previewImageUrlsValue = raw.previewImageUrls;

  if (typeof deckIdValue !== "number") {
    return null;
  }

  if (typeof nameValue !== "string") {
    return null;
  }

  if (typeValue !== "DEFAULT" && typeValue !== "CUSTOM") {
    return null;
  }

  const cardCount = typeof cardCountValue === "number" ? cardCountValue : 0;
  const previewImageUrls = Array.isArray(previewImageUrlsValue)
    ? previewImageUrlsValue.filter(
        (imageUrl): imageUrl is string => typeof imageUrl === "string",
      )
    : [];

  return {
    deckId: deckIdValue,
    name: nameValue,
    type: typeValue,
    cardCount,
    previewImageUrls,
  };
};

const toDeckSummaryList = (data: unknown): DeckSummaryData[] => {
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        if (!item || typeof item !== "object") {
          return null;
        }

        return toDeckSummaryData(item as Record<string, unknown>);
      })
      .filter((item): item is DeckSummaryData => item !== null);
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  const wrappedContent = (data as { content?: unknown }).content;

  if (!Array.isArray(wrappedContent)) {
    return [];
  }

  return wrappedContent
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      return toDeckSummaryData(item as Record<string, unknown>);
    })
    .filter((item): item is DeckSummaryData => item !== null);
};

const getDecks = async () => {
  const response = await requestJson<ApiResponse<unknown>>("/w/v1/decks", {
    method: "GET",
  });

  const validated = assertDeckResponse(response);

  return {
    ...validated,
    data: toDeckSummaryList(validated.data),
  };
};

const isDefaultDeckDeleteSuccessCode = (code: string) => {
  if (
    DEFAULT_DECK_DELETE_SUCCESS_CODES.includes(
      code as (typeof DEFAULT_DECK_DELETE_SUCCESS_CODES)[number],
    )
  ) {
    return true;
  }

  return code.startsWith("SD2");
};

const assertDefaultDeckDeleteResponse = (response: ApiResponse<null>) => {
  if (isDefaultDeckDeleteSuccessCode(response.code)) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const getDefaultDeckCards = async (page = 0, size = 100) => {
  const response = await requestJson<ApiResponse<DefaultDeckCardsResponse>>(
    `/w/v1/decks/default/cards?page=${page}&size=${size}`,
    { method: "GET" },
  );

  return assertDeckResponse(response);
};

const deleteDefaultDeckCard = async (
  cardId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/default/cards/${cardId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertDefaultDeckDeleteResponse(response);
};

export { deleteDefaultDeckCard, getDecks, getDefaultDeckCards };
