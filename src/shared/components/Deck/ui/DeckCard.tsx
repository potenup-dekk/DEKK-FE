"use client";

import clsx from "clsx";
import { deckCardStyle } from "../style";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import CEO from "../../../../../public/ceo.png";
import { DeckCardProps } from "../props.type";

const MAX_ROTATION = 4;
const SELECTED_WIDTH_RATIO = 0.83333333;
const CARD_ASPECT_RATIO = "1 / 1.5";

const DeckCard = ({ style }: DeckCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const randomRotateRef = useRef(
    Math.random() * (MAX_ROTATION * 2) - MAX_ROTATION,
  );
  const [selected, setSelected] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedScale, setSelectedScale] = useState(1);
  const { rotate: styleRotate, ...restStyle } = style ?? {};
  const targetRotate =
    typeof styleRotate === "number" || typeof styleRotate === "string"
      ? styleRotate
      : randomRotateRef.current;

  const handleClick = () => {
    if (!selected && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const targetWidth = window.innerWidth * SELECTED_WIDTH_RATIO;

      setOffset({
        x: window.innerWidth / 2 - centerX,
        y: window.innerHeight / 2 - centerY,
      });

      setSelectedScale(targetWidth / rect.width);
    }

    setSelected((prev) => !prev);
  };

  return (
    <motion.div
      ref={cardRef}
      className={clsx(deckCardStyle(), "z-10 relative overflow-hidden")}
      animate={{
        x: selected ? offset.x : 0,
        y: selected ? offset.y : 0,
        scale: selected ? selectedScale : 1,
        rotate: selected ? 0 : targetRotate,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        zIndex: selected ? 50 : 0,
        aspectRatio: CARD_ASPECT_RATIO,
        ...restStyle,
      }}
      onClick={handleClick}
    >
      <Image
        src={CEO}
        className="object-cover h-full w-full pointer-events-none"
        alt=""
      />
    </motion.div>
  );
};

export default DeckCard;
