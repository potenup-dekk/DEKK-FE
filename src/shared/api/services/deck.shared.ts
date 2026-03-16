import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { ApiResponse } from "@/shared/types/api";
import type {
  GuestSharedDeckCardResponse,
  ShareTokenResult,
  SharedDeckJoinPayload,
} from "@/entities/deck";

const SHARED_DECK_PREVIEW_SUCCESS_CODE = "SD20017" as const;
const SHARED_DECK_TURN_ON_SUCCESS_CODE = "SD20013" as const;
const SHARED_DECK_TURN_OFF_SUCCESS_CODE = "SD20014" as const;
const SHARED_DECK_JOIN_SUCCESS_CODE = "SD20015" as const;
const SHARED_DECK_LEAVE_SUCCESS_CODE = "SD20016" as const;

const assertSharedDeckPreviewResponse = (
  response: ApiResponse<GuestSharedDeckCardResponse[]>,
) => {
  if (response.code === SHARED_DECK_PREVIEW_SUCCESS_CODE) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertTurnOnSharedDeckResponse = (
  response: ApiResponse<ShareTokenResult>,
) => {
  if (response.code === SHARED_DECK_TURN_ON_SUCCESS_CODE) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertTurnOffSharedDeckResponse = (response: ApiResponse<null>) => {
  if (response.code === SHARED_DECK_TURN_OFF_SUCCESS_CODE) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertJoinSharedDeckResponse = (response: ApiResponse<null>) => {
  if (response.code === SHARED_DECK_JOIN_SUCCESS_CODE) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const assertLeaveSharedDeckResponse = (response: ApiResponse<null>) => {
  if (response.code === SHARED_DECK_LEAVE_SUCCESS_CODE) {
    return response;
  }

  throw new ApiRequestError(
    400,
    response.message,
    response.code,
    response.errors,
  );
};

const getSharedDeckPreview = async (token: string) => {
  const response = await requestJson<
    ApiResponse<GuestSharedDeckCardResponse[]>
  >(`/api/decks/shared/${token}/cards`, {
    method: "GET",
  });

  return assertSharedDeckPreviewResponse(response);
};

const turnOnSharedDeck = async (
  customDeckId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<ShareTokenResult>>(
    `/w/v1/decks/custom/${customDeckId}/share`,
    {
      method: "POST",
      headers,
    },
  );

  return assertTurnOnSharedDeckResponse(response);
};

const turnOffSharedDeck = async (
  customDeckId: number,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/custom/${customDeckId}/share`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertTurnOffSharedDeckResponse(response);
};

const joinSharedDeck = async (
  payload: SharedDeckJoinPayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/shared/join`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );

  return assertJoinSharedDeckResponse(response);
};

const leaveSharedDeck = async (sharedDeckId: number, cookieHeader?: string) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/w/v1/decks/shared/${sharedDeckId}/leave`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertLeaveSharedDeckResponse(response);
};

export {
  getSharedDeckPreview,
  joinSharedDeck,
  leaveSharedDeck,
  turnOffSharedDeck,
  turnOnSharedDeck,
};
