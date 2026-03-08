"use client";

import clsx from "clsx";
import deckCardStyle from "../style";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { DeckCardProps } from "../props.type";
import {
  deckCardSelectedTransition,
  getRandomRotation,
} from "../model/animate";
import {
  resolveDeckCardRotate,
  selectDeckCard,
} from "../model/deckCard.helpers";
import DeckCardImage from "./DeckCardImage";

const MAX_ROTATION = 4;
const CARD_ASPECT_RATIO = "1 / 1.5";

const getDeckCardMotionProps = (
  selected: boolean,
  offset: { x: number; y: number },
  selectedScale: number,
  targetRotate: string | number,
) => {
  return {
    animate: {
      x: selected ? offset.x : 0,
      y: selected ? offset.y : 0,
      scale: selected ? selectedScale : 1,
      rotate: selected ? 0 : targetRotate,
    },
    style: {
      zIndex: selected ? 50 : 0,
      aspectRatio: CARD_ASPECT_RATIO,
    },
  };
};

const DeckCard = ({ style }: DeckCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [randomRotate] = useState<number>(() =>
    getRandomRotation(MAX_ROTATION),
  );
  const [selected, setSelected] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedScale, setSelectedScale] = useState(1);
  const { rotate: styleRotate, ...restStyle } = style ?? {};
  const targetRotate = resolveDeckCardRotate(styleRotate, randomRotate);
  const motionProps = getDeckCardMotionProps(
    selected,
    offset,
    selectedScale,
    targetRotate,
  );

  const handleClick = () => {
    if (!selected && cardRef.current) {
      selectDeckCard(cardRef.current, setOffset, setSelectedScale);
    }

    setSelected((prev) => !prev);
  };

  return (
    <motion.div
      ref={cardRef}
      className={clsx(deckCardStyle(), "z-10 relative overflow-hidden")}
      animate={motionProps.animate}
      transition={deckCardSelectedTransition}
      style={{
        ...motionProps.style,
        ...restStyle,
      }}
      onClick={handleClick}
    >
      <DeckCardImage />
    </motion.div>
  );
};

export default DeckCard;
