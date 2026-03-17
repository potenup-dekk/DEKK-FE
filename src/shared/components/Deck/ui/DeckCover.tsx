"use client";

import { useRef, type RefObject } from "react";
import type { DeckItem } from "../model/deckState.helpers";
import deckStyle from "../style";
import DeckPreviewStack from "./DeckPreviewStack";
import { motion } from "framer-motion";

interface DeckCoverProps {
  deck: DeckItem;
  onOpen: (deckId: number, sourceRect: DOMRect) => void;
  onPrefetchDetail: (deckId: number) => void;
}

interface DeckCoverButtonProps {
  deck: DeckItem;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onPrefetch: () => void;
}

const DeckCover = ({ deck, onOpen, onPrefetchDetail }: DeckCoverProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handlePrefetch = () => {
    onPrefetchDetail(deck.id);
  };

  const handleOpen = () => {
    if (!buttonRef.current) {
      return;
    }

    onOpen(deck.id, buttonRef.current.getBoundingClientRect());
  };

  return (
    <DeckCoverButton
      deck={deck}
      buttonRef={buttonRef}
      onOpen={handleOpen}
      onPrefetch={handlePrefetch}
    />
  );
};

const DeckCoverButton = ({
  deck,
  buttonRef,
  onOpen,
  onPrefetch,
}: DeckCoverButtonProps) => {
  const { coverButton, coverMeta, coverTitle } = deckStyle();

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      className={coverButton()}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      onTouchStart={onPrefetch}
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
    >
      <DeckPreviewStack
        deckId={deck.id}
        deckName={deck.name}
        isEmpty={deck.cardCount === 0}
        isShared={deck.type === "SHARED"}
        previewImageSrcList={deck.previewImageSrcList}
      />

      <div className={coverTitle()}>{deck.name}</div>
      <div className={coverMeta()}>{`${deck.cardCount}장의 카드`}</div>
    </motion.button>
  );
};

export default DeckCover;
