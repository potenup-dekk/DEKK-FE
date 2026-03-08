import { motion, type MotionValue } from "framer-motion";
import { HeartIcon, ThumbsDownIcon } from "lucide-react";
import { cardStyle } from "../style";

interface FrontCardOverlayProps {
  background: MotionValue<string>;
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  backdropFilter: MotionValue<string>;
  likeOpacity: MotionValue<number | 0 | 1>;
  dislikeOpacity: MotionValue<number | 0 | 1>;
}

const FrontCardOverlay = ({
  background,
  opacity,
  filter,
  backdropFilter,
  likeOpacity,
  dislikeOpacity,
}: FrontCardOverlayProps) => {
  const { frontOverlay, frontLike, frontDislike } = cardStyle();

  return (
    <motion.div
      className={frontOverlay()}
      style={{ background, opacity, filter, backdropFilter }}
    >
      <motion.div className={frontLike()} style={{ opacity: likeOpacity }}>
        <span className="text-2xl font-bold">마음에 들어요!</span>
        <div className="flex items-center gap-2">
          <HeartIcon strokeWidth={3} />
          <span className="text-sm">
            덱에 저장하고 언제든 다시 볼 수 있습니다
          </span>
        </div>
      </motion.div>

      <motion.div
        className={frontDislike()}
        style={{ opacity: dislikeOpacity }}
      >
        <span className="text-2xl font-bold">별로예요!</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">비슷한 코디 추천 빈도가 줄어들어요</span>
          <ThumbsDownIcon strokeWidth={3} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FrontCardOverlay;
