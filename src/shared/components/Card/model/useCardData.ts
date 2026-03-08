import { useCallback, useRef, useState } from "react";
import type { CardItem } from "./useCardStack.types";
import { appendCardPage, resolveCardImageUrl } from "./useCardData.helpers";
import {
  useEnsureCardBuffer,
  useInitialCardLoad,
  usePrefetchCardImages,
  useRevokeBlobUrls,
} from "./useCardData.effects";

const PICSUM_START_PAGE = 2;

const useCardData = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const nextPageRef = useRef(PICSUM_START_PAGE);
  const isFetchingRef = useRef(false);
  const imageUrlCacheRef = useRef<Map<string, string>>(new Map());
  const loadingImageRef = useRef<Map<string, Promise<string>>>(new Map());
  const createdBlobUrlsRef = useRef<Set<string>>(new Set());

  const resolveImageUrl = useCallback(async (remoteUrl: string) => {
    return resolveCardImageUrl(
      remoteUrl,
      imageUrlCacheRef.current,
      loadingImageRef.current,
      createdBlobUrlsRef.current,
    );
  }, []);

  const appendNextPage = useCallback(async () => {
    await appendCardPage(nextPageRef, isFetchingRef, setCards);
  }, []);

  usePrefetchCardImages(cards, resolveImageUrl, setCards);
  useRevokeBlobUrls(createdBlobUrlsRef);
  useInitialCardLoad(appendNextPage);
  useEnsureCardBuffer(cards.length, appendNextPage);

  return {
    cards,
    setCards,
    frontImage: cards[0]?.imageUrl,
    backImage: cards[1]?.imageUrl,
    appendNextPage,
  };
};

export default useCardData;
