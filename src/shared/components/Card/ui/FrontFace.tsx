"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FrontFaceProps } from "../props.type";

const FrontFace = ({ imageUrl }: FrontFaceProps) => {
  return (
    <motion.div
      className="absolute inset-0 bg-gray-200 rounded-lg overflow-hidden"
      style={{
        rotateY: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <Image
        src={imageUrl}
        className="object-cover size-full"
        draggable={false}
        fill
        alt="asdf"
      />
    </motion.div>
  );
};

export default FrontFace;
