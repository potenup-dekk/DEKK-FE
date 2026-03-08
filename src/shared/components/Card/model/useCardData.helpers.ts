import { getCards } from "@/features/card-swipe";
import type { CardItem } from "./useCardStack.types";

const PICSUM_LIMIT = 5;
const CARD_IMAGE_BASE_URL =
  "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com/";

const mapCards = (
  page: number,
  items: NonNullable<Awaited<ReturnType<typeof getCards>>["data"]>["content"],
) => {
  return items.map((item, index) => ({
    id: `${page}-${item.cardId}-${index}`,
    cardId: item.cardId,
    imageUrl: `${CARD_IMAGE_BASE_URL}${item.cardImageUrl || ""}`,
    products: item.products ?? [],
    height: item.height,
    weight: item.weight,
    tags: item.tags ?? null,
  }));
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
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>,
) => {
  if (isFetchingRef.current) return;
  isFetchingRef.current = true;

  try {
    const page = nextPageRef.current;
    const response = await getCards(page, PICSUM_LIMIT);
    if (!response.data) return;

    nextPageRef.current += 1;
    const content = response.data.content ?? [];
    setCards((prev) => [...prev, ...mapCards(page, content)]);
  } finally {
    isFetchingRef.current = false;
  }
};

export { appendCardPage, resolveCardImageUrl };
