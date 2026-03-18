import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type { GuestSharedDeckCardData } from "@/entities/deck";
import type { ApiResponse } from "@/shared/types/api";

interface SharedDeckJoinPayload {
  token: string;
}

const assertSharedDeckLeaveResponse = <T>(response: ApiResponse<T>) => {
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

const assertSharedDeckPreviewResponse = <T>(response: ApiResponse<T>) => {
  switch (response.code) {
    case "SD20017": {
      return response;
    }
    default: {
      throw new ApiRequestError(
        400,
        response.message,
        response.code,
        response.errors,
      );
    }
  }
};

const toGuestSharedDeckCards = (data: unknown): GuestSharedDeckCardData[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const raw = item as Record<string, unknown>;
      const cardId = raw.cardId;
      const cardImageUrl = raw.cardImageUrl;
      const height = raw.height;
      const weight = raw.weight;
      const tags = raw.tags;

      if (typeof cardId !== "number" || typeof cardImageUrl !== "string") {
        return null;
      }

      return {
        cardId,
        cardImageUrl,
        height: typeof height === "number" ? height : null,
        weight: typeof weight === "number" ? weight : null,
        tags: Array.isArray(tags)
          ? tags.filter((tag): tag is string => typeof tag === "string")
          : [],
      } satisfies GuestSharedDeckCardData;
    })
    .filter((card): card is GuestSharedDeckCardData => card !== null);
};

const getSharedDeckPreview = async (token: string) => {
  const response = await requestJson<ApiResponse<unknown>>(
    `/w/v1/decks/shared/${token}/cards`,
    {
      method: "GET",
    },
  );

  const validated = assertSharedDeckPreviewResponse(response);

  return {
    ...validated,
    data: toGuestSharedDeckCards(validated.data),
  };
};

const getSharedDeckCards = async (sharedDeckToken: string) => {
  const response = await requestJson<ApiResponse<unknown>>(
    `/api/decks/shared/${sharedDeckToken}/cards`,
    {
      method: "GET",
    },
  );

  const validated = assertSharedDeckPreviewResponse(response);

  return {
    ...validated,
    data: toGuestSharedDeckCards(validated.data),
  };
};

const assertSharedDeckJoinResponse = <T>(response: ApiResponse<T>) => {
  switch (response.code) {
    case "SD20015": {
      return response;
    }
    default: {
      throw new ApiRequestError(
        400,
        response.message,
        response.code,
        response.errors,
      );
    }
  }
};

const joinSharedDeck = async (
  payload: SharedDeckJoinPayload,
  cookieHeader?: string,
) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    "/w/v1/decks/shared/join",
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );

  return assertSharedDeckJoinResponse(response);
};

const leaveSharedDeck = async (sharedDeckId: number, cookieHeader?: string) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<null>>(
    `/api/decks/shared/${sharedDeckId}/leave`,
    {
      method: "DELETE",
      headers,
    },
  );

  return assertSharedDeckLeaveResponse(response);
};

export {
  getSharedDeckCards,
  getSharedDeckPreview,
  joinSharedDeck,
  leaveSharedDeck,
};
