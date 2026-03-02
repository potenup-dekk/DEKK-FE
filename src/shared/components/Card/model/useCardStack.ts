import {
  animate,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MAX_X = 250;
const MAX_ROTATE = 16;
const INITIAL_CARD_COUNT = 3;
const PREFETCH_COUNT = 5;
const PICSUM_LIMIT = 5;
const PICSUM_START_PAGE = 2;

type CardItem = {
  id: string;
  imageUrl: string;
};

type PicsumImage = {
  id: string;
  download_url: string;
};

const useCardStack = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [isSwiping, setIsSwiping] = useState(false);
  const [removingCardId, setRemovingCardId] = useState<string | null>(null);

  const nextPageRef = useRef(PICSUM_START_PAGE);
  const isFetchingRef = useRef(false);
  const imageUrlCacheRef = useRef<Map<string, string>>(new Map());
  const loadingImageRef = useRef<Map<string, Promise<string>>>(new Map());
  const createdBlobUrlsRef = useRef<Set<string>>(new Set());

  const resolveImageUrl = async (remoteUrl: string) => {
    const cached = imageUrlCacheRef.current.get(remoteUrl);
    if (cached) return cached;

    const loading = loadingImageRef.current.get(remoteUrl);
    if (loading) return loading;

    const loadingPromise = (async () => {
      try {
        const response = await fetch(remoteUrl, { cache: "force-cache" });
        if (!response.ok) {
          imageUrlCacheRef.current.set(remoteUrl, remoteUrl);
          return remoteUrl;
        }

        const imageBlob = await response.blob();
        const blobUrl = URL.createObjectURL(imageBlob);

        createdBlobUrlsRef.current.add(blobUrl);
        imageUrlCacheRef.current.set(remoteUrl, blobUrl);

        return blobUrl;
      } catch {
        imageUrlCacheRef.current.set(remoteUrl, remoteUrl);
        return remoteUrl;
      } finally {
        loadingImageRef.current.delete(remoteUrl);
      }
    })();

    loadingImageRef.current.set(remoteUrl, loadingPromise);
    return loadingPromise;
  };

  // Like 액션 handler
  const onLike = () => {
    console.log("like");
    setRemovingCardId(cards[0]?.id || null);
  };

  // Dislike 액션 handler
  const onDislike = () => {
    // alert(`👎 Disliked card: ${cards[0]?.id}`);
    console.log("dislike");
    setRemovingCardId(cards[0]?.id || null);
  };

  const appendNextPage = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const page = nextPageRef.current;
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${PICSUM_LIMIT}`,
      );

      if (!response.ok) return;

      const data = (await response.json()) as PicsumImage[];
      nextPageRef.current += 1;

      const nextCards = data.map((item, index) => ({
        id: `${page}-${item.id}-${index}`,
        imageUrl: item.download_url,
      }));

      setCards((prev) => [...prev, ...nextCards]);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    const prefetchCards = async () => {
      const targetCards = cards.slice(0, PREFETCH_COUNT);

      await Promise.all(
        targetCards.map(async (card) => {
          if (!card?.imageUrl || card.imageUrl.startsWith("blob:")) {
            return;
          }

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
  }, [cards]);

  useEffect(() => {
    return () => {
      createdBlobUrlsRef.current.forEach((blobUrl) => {
        URL.revokeObjectURL(blobUrl);
      });
    };
  }, []);

  useEffect(() => {
    void appendNextPage();
  }, []);

  useEffect(() => {
    if (cards.length < INITIAL_CARD_COUNT) {
      void appendNextPage();
    }

    console.log(cards);
  }, [cards.length]);

  const frontImage = cards[0]?.imageUrl;
  const backImage = cards[1]?.imageUrl;

  // useEffect(() => {
  //   if (!thirdImage) return;

  //   const preloadImage = new Image();
  //   preloadImage.src = thirdImage;
  // }, [thirdImage]);

  const x = useMotionValue(0);
  const rotate = useTransform(
    x,
    [-MAX_X, 0, MAX_X],
    [-MAX_ROTATE, 0, MAX_ROTATE],
  );

  const blur = useTransform(x, [-100, 0, 100], [8, 0, 8]);
  const background = useTransform(
    x,
    [-MAX_X, 0, MAX_X],
    ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)", "rgba(29, 154, 39, 0.6)"],
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const opacity = useTransform(x, [-50, 0, 50], [1, 0, 1]);
  const filter = useMotionTemplate`drop-shadow(0px 5px 15px rgba(0, 0, 0, calc(${opacity}/3.5)))`;

  const backCardScale = useTransform(x, [-MAX_X, 0, MAX_X], [1, 0.9, 1]);
  const backScale = useMotionValue(0.9);

  useEffect(() => {
    const unsubscribe = backCardScale.on("change", (latest) => {
      if (!removingCardId) backScale.set(latest);
    });

    let controls: ReturnType<typeof animate> | undefined;

    if (removingCardId) {
      controls = animate(backScale, 1, {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    } else {
      backScale.set(backCardScale.get());
    }

    return () => {
      unsubscribe();
      controls?.stop();
    };
  }, [removingCardId, backCardScale, backScale]);

  const [isFlipped, setIsFlipped] = useState(false);

  const rotateY = useMotionValue(0);
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const animateFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    animate(rotateY, next ? 180 : 0, { duration: 0.2, ease: "easeInOut" });
  };

  useEffect(() => {
    setIsFlipped(false);
    rotateY.set(0);
  }, [cards[0]?.id, rotateY]);

  return {
    frontImage,
    backImage,
    x,
    rotate,
    background,
    backdropFilter,
    filter,
    backScale,
    rotateYSpring,
    animateFlip,
    isSwiping,
    setIsSwiping,
    setCards,
    cards,
    opacity,
    removingCardId,
    setRemovingCardId,
    onLike,
    onDislike,
  };
};

export default useCardStack;
