import { getCards } from "@/features/card-swipe";
import type { CardItem } from "./useCardStack.types";

const PICSUM_LIMIT = 5;
const CARD_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_BUCKET_URL ??
  "https://dekk-api-dev-crawl-bucket.s3.ap-northeast-2.amazonaws.com/";

const toCardImageUrl = (cardImageUrl: string) => {
  if (
    cardImageUrl.startsWith("http://") ||
    cardImageUrl.startsWith("https://")
  ) {
    return cardImageUrl;
  }

  return `${CARD_IMAGE_BASE_URL}${cardImageUrl}`;
};

const getCardKey = (item: {
  cardId?: number;
  publicId?: string;
  cardImageUrl?: string;
}) => {
  if (item.cardId !== undefined) return String(item.cardId);
  if (item.publicId) return item.publicId;
  return item.cardImageUrl ?? "";
};

const mapCards = (
  page: number,
  items: NonNullable<Awaited<ReturnType<typeof getCards>>["data"]>["content"],
) => {
  return items.map((item, index) => {
    const cardKey = getCardKey(item) || String(index);

    return {
      id: `${page}-${cardKey}-${index}`,
      cardId: item.cardId,
      publicId: item.publicId,
      imageUrl: toCardImageUrl(item.cardImageUrl || ""),
      products: item.products ?? [],
      height: item.height,
      weight: item.weight,
      tags: item.tags ?? null,
    };
  });
};

const resolveCardImageUrl = async (
  remoteUrl: string,
  imageUrlCache: Map<string, string>,
  loadingImage: Map<string, Promise<string>>,
  createdBlobUrls: Set<string>,
) => {
  const cached = imageUrlCache.get(remoteUrl);
  if (cached) return cached;

  const loading = loadingImage.get(remoteUrl);
  if (loading) return loading;

  const loadingPromise = (async () => {
    try {
      const response = await fetch(remoteUrl, { cache: "force-cache" });
      if (!response.ok) {
        imageUrlCache.set(remoteUrl, remoteUrl);
        return remoteUrl;
      }

      const blobUrl = URL.createObjectURL(await response.blob());
      createdBlobUrls.add(blobUrl);
      imageUrlCache.set(remoteUrl, blobUrl);
      return blobUrl;
    } catch {
      imageUrlCache.set(remoteUrl, remoteUrl);
      return remoteUrl;
    } finally {
      loadingImage.delete(remoteUrl);
    }
  })();

  loadingImage.set(remoteUrl, loadingPromise);
  return loadingPromise;
};

const appendCardPage = async (
  nextPageRef: React.MutableRefObject<number>,
  isFetchingRef: React.MutableRefObject<boolean>,
  seenCardIdRef: React.MutableRefObject<Set<string>> | undefined,
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>,
) => {
  if (isFetchingRef.current) return;
  isFetchingRef.current = true;

  try {
    const MAX_FETCH_ATTEMPTS = 3;

    const seenCardIds = seenCardIdRef?.current ?? new Set<string>();

    for (let attempt = 0; attempt < MAX_FETCH_ATTEMPTS; attempt += 1) {
      const page = nextPageRef.current;
      const response = await getCards(page, PICSUM_LIMIT);
      nextPageRef.current += 1;

      if (!response.data) {
        continue;
      }

      const content = response.data.content ?? [];
      const uniqueContent = content.filter((item) => {
        const itemKey = getCardKey(item);
        return itemKey ? !seenCardIds.has(itemKey) : true;
      });

      if (uniqueContent.length === 0) {
        continue;
      }

      uniqueContent.forEach((item) => {
        const itemKey = getCardKey(item);
        if (itemKey) {
          seenCardIds.add(itemKey);
        }
      });

      setCards((prev) => [...prev, ...mapCards(page, uniqueContent)]);
      return;
    }
  } finally {
    isFetchingRef.current = false;
  }
};

export { appendCardPage, resolveCardImageUrl };
