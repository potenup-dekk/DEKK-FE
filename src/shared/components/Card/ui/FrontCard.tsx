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
import {
  CheckCircle,
  CheckCircleIcon,
  HeartIcon,
  ThumbsDownIcon,
} from "lucide-react";

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

  products?: {
    productId: number;
    brand: string;
    name: string;
    productImageUrl: string;
    productUrl: string;
  }[];

  height?: number | null;
  weight?: number | null;
  tags?: string[] | null;
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
  products = [],
  height = null,
  weight = null,
  tags = null,
}: FrontCardProps) => {
  if (!cards || cards.length === 0) return null;

  const likeOpacity = useTransform(x, (value) => (value >= 0 ? 1 : 0));
  const dislikeOpacity = useTransform(x, (value) => (value < 0 ? 1 : 0));

  return (
    <motion.div
      key={cards[0].id}
      className="relative w-5/6 aspect-1/1.5 z-10 rounded-lg flex items-center justify-center cursor-pointer"
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
        x: x.get(),
        transition: { duration: 0.3 },
      }}
    >
      {/* Overlay */}
      <motion.div
        className="flex absolute items-center z-20 size-full pointer-events-none rounded-lg"
        style={{ background, opacity, filter, backdropFilter }}
      >
        {/* Like View */}
        <motion.div
          className="flex absolute flex-col gap-2 left-10 text-white"
          style={{ opacity: likeOpacity }}
        >
          <span className="text-2xl font-bold">마음에 들어요!</span>

          <div className="flex items-center gap-2">
            <HeartIcon strokeWidth={3} />

            <span className="text-sm">
              덱에 저장하고 언제든 다시 볼 수 있습니다
            </span>
          </div>
        </motion.div>

        {/* Dislike View */}
        <motion.div
          className="flex absolute flex-col gap-2 right-10 text-white text-end"
          style={{ opacity: dislikeOpacity }}
        >
          <span className="text-2xl font-bold">별로예요!</span>

          <div className="flex items-center gap-2">
            <span className="text-sm">비슷한 코디 추천 빈도가 줄어들어요</span>

            <ThumbsDownIcon strokeWidth={3} />
          </div>
        </motion.div>
      </motion.div>

      {/* Back Face */}
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
        <BackFace
          height={height}
          weight={weight}
          products={products}
          tags={tags}
        />
      </motion.div>
    </motion.div>
  );
};

export default FrontCard;
