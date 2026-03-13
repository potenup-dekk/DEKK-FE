import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type {
  CreateCustomDeckPayload,
  CustomDeckData,
  DeckCardContentData,
  DefaultDeckCardsResponse,
  UpdateCustomDeckPayload,
} from "@/entities/deck";
import type { ApiResponse } from "@/shared/types/api";

interface CustomDeckCardsPageData {
  content: DeckCardContentData[];
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

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
  if (response.code === "SD20008" || response.code.startsWith("SD2")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckCardsResponse = <T>(response: ApiResponse<T>) => {
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

const assertCustomDeckCreateResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20005" || response.code.startsWith("SD2")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckSaveResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20009" || response.code.startsWith("SD2")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckCardDeleteResponse = (response: ApiResponse<null>) => {
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

const assertCustomDeckUpdateResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20006" || response.code.startsWith("SD2")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertCustomDeckDeleteResponse = (response: ApiResponse<null>) => {
  if (response.code === "SD20007" || response.code.startsWith("SD2")) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const toCustomDeckCardsPageData = (
  data: DefaultDeckCardsResponse | DeckCardContentData[] | null | undefined,
  page: number,
): CustomDeckCardsPageData => {
  if (Array.isArray(data)) {
    return {
      content: data,
      currentPage: page,
      size: data.length,
      totalElements: data.length,
      totalPages: 1,
      hasNext: false,
    };
  }

  if (data && Array.isArray(data.content)) {
    return {
      content: data.content,
      currentPage:
        typeof data.currentPage === "number" ? data.currentPage : page,
      size: typeof data.size === "number" ? data.size : data.content.length,
      totalElements:
        typeof data.totalElements === "number"
          ? data.totalElements
          : data.content.length,
      totalPages: typeof data.totalPages === "number" ? data.totalPages : 1,
      hasNext: Boolean(data.hasNext),
    };
  }

  return {
    content: [],
    currentPage: page,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
  };
};

const getCustomDecks = async () => {
  const response = await requestJson<ApiResponse<unknown>>(
    "/api/decks/custom",
    {
      method: "GET",
    },
  );

  const validated = assertCustomDeckGetResponse(response);

  return {
    ...validated,
    data: toCustomDeckList(validated.data),
  };
};

const getCustomDeckCards = async (
  customDeckId: number,
  page = 0,
  size = 100,
) => {
  const response = await requestJson<
    ApiResponse<DefaultDeckCardsResponse | DeckCardContentData[]>
  >(`/api/decks/custom/${customDeckId}/cards?page=${page}&size=${size}`, {
    method: "GET",
  });

  const validated = assertCustomDeckCardsResponse(response);

  return {
    ...validated,
    data: toCustomDeckCardsPageData(validated.data, page),
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

const deleteCardFromCustomDeck = async (
  customDeckId: number,
  cardId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/custom/${customDeckId}/cards/${cardId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertCustomDeckCardDeleteResponse(response);
};

const updateCustomDeckName = async (
  customDeckId: number,
  payload: UpdateCustomDeckPayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/custom/${customDeckId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    },
  );

  return assertCustomDeckUpdateResponse(response);
};

const deleteCustomDeck = async (
  customDeckId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/custom/${customDeckId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertCustomDeckDeleteResponse(response);
};

export {
  createCustomDeck,
  deleteCardFromCustomDeck,
  deleteCustomDeck,
  getCustomDeckCards,
  getCustomDecks,
  saveCardToCustomDeck,
  updateCustomDeckName,
};
