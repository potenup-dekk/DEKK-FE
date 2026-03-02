"use client";

import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import BackFace from "./BackFace";
import FrontFace from "./FrontFace";

interface FrontCardProps {
  cards: {
    id: string;
    imageUrl: string;
  }[];

  frontImage: string;
  x: ReturnType<typeof useMotionValue<number>>;
  rotate: MotionValue<number>;
  rotateYSpring: ReturnType<typeof useSpring>;
  animateFlip: () => void;
  setIsSwiping: React.Dispatch<React.SetStateAction<boolean>>;
  onLike: () => void;
  onDislike: () => void;
  // background, opacity, filter, backdropFilter
  background: MotionValue<string>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  backdropFilter: MotionValue<string>;
}

const FrontCard = ({
  cards,
  x,
  rotate,
  rotateYSpring,
  frontImage,
  animateFlip,
  setIsSwiping,
  onLike,
  onDislike,
  background,
  opacity,
  filter,
  backdropFilter,
}: FrontCardProps) => {
  if (!cards || cards.length === 0) return null;

  const likeOpacity = useTransform(x, (value) => (value >= 0 ? 1 : 0));
  const dislikeOpacity = useTransform(x, (value) => (value < 0 ? 1 : 0));

  return (
    <motion.div
      key={cards[0].id}
      className="relative w-5/6 aspect-1/1.5 z-10 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
      drag
      dragSnapToOrigin
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      style={{
        x,
        rotate,
        perspective: 1000,
        WebkitPerspective: 1000,
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          setIsSwiping(true);
          // 오른쪽 드래그 (Like), 왼쪽 드래그 (Dislike)
          if (info.offset.x > 0) {
            onLike();
          } else {
            onDislike();
          }
        } else {
          setIsSwiping(false);
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
      {/* overlay - 뒤집혀지지 않음 */}
      <motion.div
        className="absolute z-20 size-full pointer-events-none rounded-lg"
        style={{ background, opacity, filter, backdropFilter }}
      >
        {/* Like */}
        <motion.div
          className="absolute left-4 top-4 text-green-500 font-bold"
          style={{ opacity: likeOpacity }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          Like
        </motion.div>

        {/* Dislike */}
        <motion.div
          className="absolute left-4 top-4 text-red-500 font-bold"
          style={{ opacity: dislikeOpacity }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          Dislike
        </motion.div>
      </motion.div>

      {/* 카드 뒤집기 */}
      <motion.div
        className="relative size-full rounded-lg"
        style={{
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
        onTap={() => Math.abs(x.get()) >= 20 || animateFlip()}
      >
        <FrontFace imageUrl={frontImage} />
        <BackFace />
      </motion.div>
    </motion.div>
  );
};

export default FrontCard;
