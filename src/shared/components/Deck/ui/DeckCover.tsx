import React from "react";
import { deckCardStyle } from "../style";
import clsx from "clsx";
import { DeckCoverProps } from "../props.type";
import { motion } from "framer-motion";

const DeckCover = ({ onClick, style }: DeckCoverProps) => {
  return (
    <motion.div
      className={clsx(deckCardStyle(), "z-10 bg-red-200")}
      onClick={onClick}
      style={{
        ...style,
      }}
    >
      DeckCover
    </motion.div>
  );
};

export default DeckCover;
