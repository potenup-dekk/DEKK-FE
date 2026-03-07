"use client";

import { motion, useSpring } from "framer-motion";
import Image from "next/image";
import React from "react";

interface BackCardProps {
  backImage: string;
  backScale: ReturnType<typeof useSpring>;
}

const BackCard = ({ backImage, backScale }: BackCardProps) => {
  return (
    <motion.div
      key={"back"}
      className="absolute h-full w-5/6 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
      style={{ scale: backScale }}
    >
      <motion.div className="size-full">
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
