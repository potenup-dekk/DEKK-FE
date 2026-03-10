import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { DefaultDeckCardsResponse } from "@/entities/deck";
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

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
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

const deleteDefaultDeckCard = async (cardId: number) => {
  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/default/cards/${cardId}`,
    { method: "DELETE" },
  );

  return assertDefaultDeckDeleteResponse(response);
};

export { deleteDefaultDeckCard, getDefaultDeckCards };
