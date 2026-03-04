"use client";

import clsx from "clsx";
import { deckCardStyle } from "../style";
import { motion } from "framer-motion";

const MAX_ROTATION = 6;

const DeckCard = () => {
  return (
    <motion.div
      className={clsx(deckCardStyle(), "bg-red-200")}
      initial={{ rotate: Math.random() * (MAX_ROTATION * 2) - 6 }}
    ></motion.div>
  );
};

export default DeckCard;
