"use client";

import React, { useState } from "react";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const Flip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const rotateY = useMotionValue(0);
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const animateFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    animate(rotateY, next ? 180 : 0, { duration: 0.45, ease: "easeInOut" });
  };

  return (
    // <div
    //   style={{ perspective: 1000 }}
    //   className="w-40 h-40 cursor-pointer"
    //   onClick={animateFlip}
    // >
    <motion.div
      className="relative w-full h-full rounded-lg"
      style={{
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onClick={animateFlip}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-lg bg-red-200 text-black font-bold"
        style={{ rotateY: 180, backfaceVisibility: "hidden" }}
      >
        Front
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-lg bg-blue-500 text-black font-bold"
        style={{ rotateY: 0, backfaceVisibility: "hidden" }}
      >
        <Image
          src={"https://picsum.photos/seed/picsum/200/300"}
          className="size-full object-cover"
          priority
          alt="asdf"
          width={200}
          height={200}
        />
      </motion.div>
    </motion.div>
    // </div>
  );
};

export default Flip;
