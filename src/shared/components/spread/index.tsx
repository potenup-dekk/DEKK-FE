import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Spread = () => {
  const [isSpread, setIsSpread] = React.useState(false);

  return (
    <AnimatePresence>
      <motion.div className="h-dvh w-full flex gap-4">
        <motion.div
          className={`${isSpread ? "grid" : ""} gap-4 gap-y-4 grid-cols-3 grid-rows-6`}
        >
          <motion.div
            className="absolute flex w-24 aspect-1/1.5 bg-green-400 text-black justify-center items-center z-10"
            onClick={() => {
              setIsSpread((prev) => !prev);
            }}
          >
            Deck
          </motion.div>

          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className={`${isSpread ? "" : "absolute"} w-24 aspect-1/1.5 bg-green-400`}
              layout
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
            ></motion.div>
          ))}
          {/* <motion.div
            className="absolute w-24 aspect-1/1.5 bg-green-400"
            layout
          ></motion.div>
          <motion.div
            className="absolute w-24 aspect-1/1.5 bg-green-400"
            layout
          ></motion.div>
          <motion.div
            className="absolute w-24 aspect-1/1.5 bg-green-400"
            layout
          ></motion.div> */}
        </motion.div>
        <motion.div className="w-24 aspect-1/1.5 bg-green-200"></motion.div>
        <motion.div className="w-24 aspect-1/1.5 bg-green-200"></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Spread;
