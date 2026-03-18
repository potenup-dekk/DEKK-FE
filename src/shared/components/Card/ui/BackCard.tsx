import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import React from "react";
import { cardResizeTransition } from "../model/animate";
import { cardStyle } from "../style";

interface BackCardProps {
  backImage: string;
  backScale: ReturnType<typeof useSpring>;
  isCardCompressed: boolean;
  compressedCardHeight: number | null;
  expandedCardHeight: number | null;
}

const BackCard = ({
  backImage,
  backScale,
  isCardCompressed,
  compressedCardHeight,
  expandedCardHeight,
}: BackCardProps) => {
  const { backRoot, backInner } = cardStyle();
  const targetCardHeight = isCardCompressed
    ? compressedCardHeight
    : expandedCardHeight;

  return (
    <motion.div
      key={"back"}
      initial={false}
      className={backRoot({ isCardCompressed })}
      animate={targetCardHeight ? { height: targetCardHeight } : undefined}
      transition={cardResizeTransition}
      style={{
        scale: backScale,
      }}
    >
      <motion.div className={backInner()}>
        <Image
          src={backImage}
          className="size-full object-cover"
          draggable={false}
          fill
          sizes="(max-width: 768px) 83vw, 66vw"
          alt="코디"
        />
      </motion.div>
    </motion.div>
  );
};

export default BackCard;
