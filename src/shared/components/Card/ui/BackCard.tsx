import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import React from "react";
import { cardStyle } from "../style";

interface BackCardProps {
  backImage: string;
  backScale: ReturnType<typeof useSpring>;
}

const BackCard = ({ backImage, backScale }: BackCardProps) => {
  const { backRoot, backInner } = cardStyle();

  return (
    <motion.div
      key={"back"}
      className={backRoot()}
      style={{ scale: backScale }}
    >
      <motion.div className={backInner()}>
        <Image
          src={backImage}
          className="size-full object-cover"
          draggable={false}
          fill
          sizes="(max-width: 768px) 83vw, 66vw"
          alt="asdf"
        />
      </motion.div>
    </motion.div>
  );
};

export default BackCard;
