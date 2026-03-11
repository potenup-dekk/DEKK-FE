import type { DeckSummaryData } from "@/entities/deck";

const toDeckSummaryData = (
  raw: Record<string, unknown>,
): DeckSummaryData | null => {
  const deckIdValue = raw.deckId;
  const nameValue = raw.name;
  const typeValue = raw.type;
  const cardCountValue = raw.cardCount;
  const previewImageUrlsValue = raw.previewImageUrls;

  if (typeof deckIdValue !== "number" || typeof nameValue !== "string") {
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

export { toDeckSummaryList };
