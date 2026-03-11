import type { DeckCardItem } from "./deckState.types";

const PREVIEW_IMAGE_SRC_LIST = [
  "/goods/top.webp",
  "/goods/shirts.webp",
  "/goods/sweater.webp",
] as const;

const CARD_IMAGE_BASE_URL =
  "https://dekk-crawling-bucket.s3.ap-northeast-2.amazonaws.com/";

const resolveCdnImageUrl = (imageUrl: string) => {
  if (!imageUrl) {
    return PREVIEW_IMAGE_SRC_LIST[0];
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${CARD_IMAGE_BASE_URL}${imageUrl}`;
};

const toDefaultDeckPreviewImageSrcList = (cards: DeckCardItem[]) => {
  const remotePreviewImages = cards.slice(0, 3).map((card) => card.imageSrc);

  if (!remotePreviewImages.length) {
    return [...PREVIEW_IMAGE_SRC_LIST];
  }

  return remotePreviewImages;
};

const normalizeDeckPreviewImageSrcList = (previewImageUrls: string[]) => {
  if (!previewImageUrls.length) {
    return [...PREVIEW_IMAGE_SRC_LIST];
  }

  return previewImageUrls
    .slice(0, 3)
    .map((imageUrl) => resolveCdnImageUrl(imageUrl));
};

export {
  PREVIEW_IMAGE_SRC_LIST,
  normalizeDeckPreviewImageSrcList,
  resolveCdnImageUrl,
  toDefaultDeckPreviewImageSrcList,
};
