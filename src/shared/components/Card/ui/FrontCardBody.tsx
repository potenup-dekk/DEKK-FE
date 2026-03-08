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
}: FrontCardBodyProps) => {
  const { frontFlipper } = cardStyle();

  return (
    <motion.div
      className={frontFlipper()}
      style={{ rotateY: rotateYSpring, ...frontCardFlipStyle }}
      onTap={() => Math.abs(x.get()) >= 20 || animateFlip()}
    >
      <FrontFace imageUrl={frontImage} />
      <BackFace
        height={height ?? null}
        weight={weight ?? null}
        products={products ?? []}
        tags={tags ?? null}
      />
    </motion.div>
  );
};

export default FrontCardBody;
