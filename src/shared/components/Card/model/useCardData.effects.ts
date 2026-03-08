import { useEffect } from "react";
import type { CardItem } from "./useCardStack.types";

const PREFETCH_COUNT = 5;
const INITIAL_CARD_COUNT = 3;

const usePrefetchCardImages = (
  cards: CardItem[],
  resolveImageUrl: (remoteUrl: string) => Promise<string>,
  setCards: React.Dispatch<React.SetStateAction<CardItem[]>>,
) => {
  useEffect(() => {
    const prefetchCards = async () => {
      const targetCards = cards.slice(0, PREFETCH_COUNT);

      await Promise.all(
        targetCards.map(async (card) => {
          if (!card.imageUrl || card.imageUrl.startsWith("blob:")) return;

          const resolvedUrl = await resolveImageUrl(card.imageUrl);
          if (resolvedUrl === card.imageUrl) return;

          setCards((prev) =>
            prev.map((item) =>
              item.id === card.id && item.imageUrl !== resolvedUrl
                ? { ...item, imageUrl: resolvedUrl }
                : item,
            ),
          );
        }),
      );
    };

    void prefetchCards();
  }, [cards, resolveImageUrl, setCards]);
};

const useRevokeBlobUrls = (
  createdBlobUrlsRef: React.MutableRefObject<Set<string>>,
) => {
  useEffect(() => {
    const createdBlobUrls = createdBlobUrlsRef.current;
    return () => {
      createdBlobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, [createdBlobUrlsRef]);
};

const useInitialCardLoad = (appendNextPage: () => Promise<void>) => {
  useEffect(() => {
    void appendNextPage();
  }, [appendNextPage]);
};

const useEnsureCardBuffer = (
  cardsLength: number,
  appendNextPage: () => Promise<void>,
) => {
  useEffect(() => {
    if (cardsLength < INITIAL_CARD_COUNT) {
      void appendNextPage();
    }
  }, [appendNextPage, cardsLength]);
};

export {
  useEnsureCardBuffer,
  useInitialCardLoad,
  usePrefetchCardImages,
  useRevokeBlobUrls,
};
