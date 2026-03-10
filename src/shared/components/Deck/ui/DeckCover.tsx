"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  getDeckPreviewCardMotion,
  getDeckPreviewCardVisual,
} from "../model/animate";
import type { DeckItem } from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckCardImage from "./DeckCardImage";

interface DeckCoverProps {
  deck: DeckItem;
  onOpen: (deckId: number, sourceRect: DOMRect) => void;
}

interface DeckPreviewStackProps {
  deckId: number;
  deckName: string;
  previewImageSrcList: string[];
}

const DeckPreviewStack = ({
  deckId,
  deckName,
  previewImageSrcList,
}: DeckPreviewStackProps) => {
  const { coverStack, previewImage, previewImageBase } = deckStyle();

  return (
    <div className={coverStack()}>
      {previewImageSrcList.slice(0, 3).map((imageSrc, index) => {
        const previewCardMotion = getDeckPreviewCardMotion(index);
        const previewCardVisual = getDeckPreviewCardVisual(index);

        return (
          <motion.div
            key={`${deckId}-${imageSrc}`}
            className={previewImageBase()}
            initial={previewCardMotion.initial}
            animate={previewCardMotion.animate}
            style={{
              width: previewCardVisual.width,
              zIndex: previewCardVisual.zIndex,
            }}
          >
            <DeckCardImage
              src={imageSrc}
              alt={`${deckName} 미리보기`}
              className={previewImage()}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const DeckCover = ({ deck, onOpen }: DeckCoverProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { coverButton, coverMeta, coverTitle, systemBadge } = deckStyle();

  const handleOpen = () => {
    if (!buttonRef.current) {
      return;
    }

    onOpen(deck.id, buttonRef.current.getBoundingClientRect());
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={coverButton()}
      onClick={handleOpen}
      whileTap={{ scale: 0.98 }}
    >
      <DeckPreviewStack
        deckId={deck.id}
        deckName={deck.name}
        previewImageSrcList={deck.previewImageSrcList}
      />

      <div className={coverTitle()}>{deck.name}</div>
      <div className={coverMeta()}>{`${deck.cards.length}개의 카드`}</div>
      {deck.isSystem ? (
        <span className={clsx("mt-1", systemBadge())}>고정 덱</span>
      ) : null}
    </motion.button>
  );
};

export default DeckCover;
