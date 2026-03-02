"use client";

import React, { useEffect, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";

const MAX_X = 250;

const Card = () => {
  const [index, setIndex] = useState(1);

  // API
  const [cards, setCards] = useState<{ imageUrl: string }[]>([]);

  const initial = Array.from({ length: 5 }).map((i) => {
    // const id = String(nextId.current++);
    return {
      imageUrl: `https://picsum.photos/seed/${i}/400/600`,
    };
  });

  useEffect(() => {
    setCards(initial);
  }, []);
  //

  // Image
  const image = new Image();
  image.src = cards[index]?.imageUrl;

  useEffect(() => {
    console.log(image.src);
  }, [index]);
  //

  const [isVisible, setIsVisible] = useState(true);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-MAX_X, 0, MAX_X], [-16, 0, 16]);

  const blur = useTransform(x, [-100, 0, 100], [8, 0, 8]);
  const background = useTransform(
    x,
    [-MAX_X, 0, MAX_X],
    ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0)", "rgba(29, 154, 39, 0.5)"],
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const opacity = useTransform(x, [-50, 0, 50], [1, 0, 1]);
  const filter = useMotionTemplate`drop-shadow(0px 5px 15px rgba(0, 0, 0, calc(${opacity}/3.5)))`;

  const backCardScale = useTransform(x, [-MAX_X, 0, MAX_X], [0.98, 0.9, 0.98]);
  const backScale = useMotionValue(0.9);
  // const backScale = useSpring(backScaleRaw, { stiffness: 100, damping: 10 });

  let cotrols: ReturnType<typeof animate> | undefined;

  useEffect(() => {
    // visible 상태일 때만 x 기반 scale 반영
    const unsubscribe = backCardScale.on("change", (latest) => {
      if (isVisible) backScale.set(latest);
    });

    let controls: ReturnType<typeof animate> | undefined;

    if (!isVisible) {
      // 카드가 사라질 때 back card를 1까지 tween
      controls = animate(backScale, 1, {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    } else {
      backScale.set(backCardScale.get());
    }

    return () => {
      unsubscribe();
      controls?.stop();
    };
  }, [isVisible, backCardScale, backScale]);
  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsVisible(true);
        setIndex((prev) => (prev + 1) % cards.length);
      }}
    >
      {isVisible && (
        <motion.div
          key={index}
          initial={false}
          className="absolute w-4/5 aspect-1/1.5 bg-gray-200 rounded-lg shadow-md flex items-center justify-center cursor-pointer z-10 overflow-hidden"
          drag
          dragSnapToOrigin
          dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
          style={{ x, rotate, filter }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 100) {
              setIsVisible(false);
            }
          }}
          exit={{
            zIndex: 0,
            opacity: 0,
            scale: 0.8,
            x: x.get() >= 0 ? x.get() : -x.get(),
            transition: { duration: 0.4 },
          }}
        >
          <motion.div
            className="absolute z-10 top-0 left-0 w-full h-full rounded-lg"
            style={{ background, backdropFilter, opacity }}
          >
            gdgd
          </motion.div>
          {/* <motion.div className="flex rounded-2xl w-full h-full">
            <img src={image.src} alt="asdf" />
          </motion.div> */}
        </motion.div>
      )}

      <motion.div
        key={"back"}
        className="absolute w-4/5 aspect-1/1.5 bg-gray-200 rounded-lg shadow-md flex items-center justify-center cursor-pointer z-1"
        style={{ scale: backScale }}
      >
        <motion.div className="absolute z-10 top-0 left-0 w-full h-full rounded-lg">
          gdgd
        </motion.div>
        <motion.div className="text-red-300">gdgd</motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
