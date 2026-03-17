import { motion } from "framer-motion";
import BackFace from "./BackFace";
import FrontFace from "./FrontFace";
import { frontCardFlipStyle } from "../model/animate";
import { cardStyle } from "../style";
import type { FrontCardProps } from "../model/props.type";

interface FrontCardBodyProps {
  rotateYSpring: FrontCardProps["rotateYSpring"];
  x: FrontCardProps["x"];
  animateFlip: FrontCardProps["animateFlip"];
  frontImage: FrontCardProps["frontImage"];
  products: FrontCardProps["products"];
  height: FrontCardProps["height"];
  weight: FrontCardProps["weight"];
  tags: FrontCardProps["tags"];
  isSwipeEnabled: boolean;
  onProductScrollInteractionChange: (isInteracting: boolean) => void;
}

const FrontCardBody = ({
  rotateYSpring,
  x,
  animateFlip,
  frontImage,
  products,
  height,
  weight,
  tags,
  isSwipeEnabled,
  onProductScrollInteractionChange,
}: FrontCardBodyProps) => {
  const { frontFlipper } = cardStyle();

  const handleTap = () => {
    if (!isSwipeEnabled) {
      return;
    }

    if (Math.abs(x.get()) >= 20) {
      return;
    }

    animateFlip();
  };

  return (
    <motion.div
      className={frontFlipper()}
      style={{ rotateY: rotateYSpring, ...frontCardFlipStyle }}
      onTap={handleTap}
    >
      <FrontFace imageUrl={frontImage} />
      <BackFace
        height={height ?? null}
        weight={weight ?? null}
        products={products ?? []}
        tags={tags ?? null}
        onProductScrollInteractionChange={onProductScrollInteractionChange}
      />
    </motion.div>
  );
};

export default FrontCardBody;
