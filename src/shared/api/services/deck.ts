import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { DefaultDeckCardsResponse } from "@/entities/deck";
import type { ApiResponse } from "@/shared/types/api";
import { toDeckSummaryList } from "./deck.parsers";

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

const deleteDefaultDeckCard = async (cardId: number, cookieHeader?: string) => {
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
