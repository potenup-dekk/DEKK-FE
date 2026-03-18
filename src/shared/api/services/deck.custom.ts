import { ApiRequestError, requestJson } from "@/shared/api/fetcher/client";
import type {
  CreateCustomDeckPayload,
  CustomDeckCardsResultData,
  CustomDeckData,
  CustomDeckShareData,
  DeckCardContentData,
  DeckRole,
  DeckType,
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
  token: string | null;
  expiredInSeconds: number | null;
  role: DeckRole;
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
  data:
    | DefaultDeckCardsResponse
    | DeckCardContentData[]
    | CustomDeckCardsResultData
    | null
    | undefined,
  page: number,
): CustomDeckCardsPageData => {
  if (data && typeof data === "object" && "cards" in data) {
    const cards = (data as CustomDeckCardsResultData).cards;

    if (!Array.isArray(cards)) {
      return {
        content: [],
        currentPage: page,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        token: null,
        expiredInSeconds: null,
        role: "GUEST",
      };
    }

    return {
      content: cards,
      currentPage: page,
      size: cards.length,
      totalElements: cards.length,
      totalPages: 1,
      hasNext: false,
      token: (data as CustomDeckCardsResultData).token,
      expiredInSeconds: (data as CustomDeckCardsResultData).expiredInSeconds,
      role: (data as CustomDeckCardsResultData).role,
    };
  }

  if (Array.isArray(data)) {
    return {
      content: data,
      currentPage: page,
      size: data.length,
      totalElements: data.length,
      totalPages: 1,
      hasNext: false,
      token: null,
      expiredInSeconds: null,
      role: "GUEST",
    };
  }

  if (data && typeof data === "object" && "content" in data) {
    const pagedData = data as DefaultDeckCardsResponse;

    if (!Array.isArray(pagedData.content)) {
      return {
        content: [],
        currentPage: page,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        hasNext: false,
        token: null,
        expiredInSeconds: null,
        role: "GUEST",
      };
    }

    return {
      content: pagedData.content,
      currentPage:
        typeof pagedData.currentPage === "number"
          ? pagedData.currentPage
          : page,
      size:
        typeof pagedData.size === "number"
          ? pagedData.size
          : pagedData.content.length,
      totalElements:
        typeof pagedData.totalElements === "number"
          ? pagedData.totalElements
          : pagedData.content.length,
      totalPages:
        typeof pagedData.totalPages === "number" ? pagedData.totalPages : 1,
      hasNext: Boolean(pagedData.hasNext),
      token: null,
      expiredInSeconds: null,
      role: "GUEST",
    };
  }

  return {
    content: [],
    currentPage: page,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    token: null,
    expiredInSeconds: null,
    role: "GUEST",
  };
};

const toDeckCardList = (data: unknown): DeckCardContentData[] => {
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
      const tag = raw.tag;
      const tags = raw.tags;
      const products = raw.products;

      if (typeof cardId !== "number" || typeof cardImageUrl !== "string") {
        return null;
      }

      const parsedCard: DeckCardContentData = {
        cardId,
        cardImageUrl,
        height: typeof height === "number" ? height : null,
        weight: typeof weight === "number" ? weight : null,
      };

      if (Array.isArray(tag)) {
        parsedCard.tag = tag.filter(
          (item): item is string => typeof item === "string",
        );
      }

      if (Array.isArray(tags)) {
        parsedCard.tags = tags.filter(
          (item): item is string => typeof item === "string",
        );
      }

      if (Array.isArray(products)) {
        parsedCard.products = products
          .map((product) => {
            if (!product || typeof product !== "object") {
              return null;
            }

            const rawProduct = product as Record<string, unknown>;
            const productId = rawProduct.productId;
            const brand = rawProduct.brand;
            const name = rawProduct.name;
            const productImageUrl = rawProduct.productImageUrl;
            const productsImageUrl = rawProduct.productsImageUrl;
            const productUrl = rawProduct.productUrl;
            const url = rawProduct.url;

            return {
              productId: typeof productId === "number" ? productId : undefined,
              brand: typeof brand === "string" ? brand : undefined,
              name: typeof name === "string" ? name : undefined,
              productImageUrl:
                typeof productImageUrl === "string"
                  ? productImageUrl
                  : undefined,
              productsImageUrl:
                typeof productsImageUrl === "string"
                  ? productsImageUrl
                  : undefined,
              productUrl:
                typeof productUrl === "string" ? productUrl : undefined,
              url: typeof url === "string" ? url : undefined,
            };
          })
          .filter((item): item is NonNullable<typeof item> => item !== null);
      }

      return parsedCard;
    })
    .filter((item): item is DeckCardContentData => item !== null);
};

const toDeckType = (value: unknown): DeckType => {
  if (value === "DEFAULT" || value === "CUSTOM" || value === "SHARED") {
    return value;
  }

  return "CUSTOM";
};

const toDeckRole = (value: unknown): DeckRole => {
  if (value === "HOST" || value === "GUEST") {
    return value;
  }

  return "GUEST";
};

const toCustomDeckDetailData = (data: unknown): CustomDeckCardsResultData => {
  if (!data || typeof data !== "object") {
    return {
      deckType: "CUSTOM",
      token: null,
      expiredInSeconds: null,
      role: "GUEST",
      cards: [],
    };
  }

  const raw = data as Record<string, unknown>;

  return {
    deckType: toDeckType(raw.deckType),
    token: typeof raw.token === "string" ? raw.token : null,
    expiredInSeconds:
      typeof raw.expiredInSeconds === "number" ? raw.expiredInSeconds : null,
    role: toDeckRole(raw.role),
    cards: toDeckCardList(raw.cards),
  };
};

const toCustomDeckShareData = (data: unknown): CustomDeckShareData => {
  const fallback: CustomDeckShareData = {
    token: "",
    expiredInSeconds: null,
    expiredAt: null,
    remainingTime: null,
  };

  if (!data || typeof data !== "object") {
    return fallback;
  }

  const raw = data as Record<string, unknown>;
  const token = typeof raw.token === "string" ? raw.token : "";
  const expiredInSeconds =
    typeof raw.expiredInSeconds === "number" ? raw.expiredInSeconds : null;
  const expiredAt =
    typeof raw.expiredAt === "string"
      ? raw.expiredAt
      : typeof raw.expiresAt === "string"
        ? raw.expiresAt
        : null;
  const remainingTime =
    typeof raw.remainingTime === "string" ? raw.remainingTime : null;

  return {
    token,
    expiredInSeconds,
    expiredAt,
    remainingTime,
  };
};

const assertCustomDeckShareResponse = <T>(response: ApiResponse<T>) => {
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
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const response = await requestJson<ApiResponse<unknown>>(
    `/api/decks/custom/${customDeckId}/cards?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );

  const validated = assertCustomDeckCardsResponse(response);
  const detailData = toCustomDeckDetailData(validated.data);

  return {
    ...validated,
    data: toCustomDeckCardsPageData(detailData, page),
  };
};

const getCustomDeckDetail = async (customDeckId: number) => {
  const response = await requestJson<ApiResponse<unknown>>(
    `/api/decks/custom/${customDeckId}/cards`,
    {
      method: "GET",
    },
  );

  const validated = assertCustomDeckCardsResponse(response);

  return {
    ...validated,
    data: toCustomDeckDetailData(validated.data),
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

const shareCustomDeck = async (customDeckId: number, cookieHeader?: string) => {
  const headers = cookieHeader ? { cookie: cookieHeader } : undefined;

  const response = await requestJson<ApiResponse<unknown>>(
    `/w/v1/decks/custom/${customDeckId}/share`,
    {
      method: "POST",
      headers,
    },
  );

  const validated = assertCustomDeckShareResponse(response);

  return {
    ...validated,
    data: toCustomDeckShareData(validated.data),
  };
};

const stopCustomDeckShare = async (
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

  return assertCustomDeckShareResponse(response);
};

export {
  createCustomDeck,
  deleteCardFromCustomDeck,
  deleteCustomDeck,
  getCustomDeckDetail,
  getCustomDeckCards,
  getCustomDecks,
  saveCardToCustomDeck,
  shareCustomDeck,
  stopCustomDeckShare,
  updateCustomDeckName,
};
