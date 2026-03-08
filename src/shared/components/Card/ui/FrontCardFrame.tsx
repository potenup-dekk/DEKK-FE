import { motion } from "framer-motion";
import {
  frontCardDragConstraints,
  frontCardMotionStyle,
  getFrontCardExit,
} from "../model/animate";
import { cardStyle } from "../style";
import type { FrontCardProps } from "../model/props.type";

interface FrontCardFrameProps {
  cardId: string;
  x: FrontCardProps["x"];
  rotate: FrontCardProps["rotate"];
  setIsSwiping: FrontCardProps["setIsSwiping"];
  onLike: FrontCardProps["onLike"];
  onDislike: FrontCardProps["onDislike"];
  children: React.ReactNode;
}

const FrontCardFrame = ({
  cardId,
  x,
  rotate,
  setIsSwiping,
  onLike,
  onDislike,
  children,
}: FrontCardFrameProps) => {
  const { frontRoot } = cardStyle();

  return (
    <motion.div
      key={cardId}
      className={frontRoot()}
      drag
      dragSnapToOrigin
      dragConstraints={frontCardDragConstraints}
      style={{ x, rotate, ...frontCardMotionStyle }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          setIsSwiping(true);
          if (info.offset.x > 0) {
            onLike();
          } else {
            onDislike();
          }
          return;
        }

        setIsSwiping(false);
      }}
      exit={getFrontCardExit(x.get())}
    >
      {children}
    </motion.div>
  );
};

export default FrontCardFrame;
