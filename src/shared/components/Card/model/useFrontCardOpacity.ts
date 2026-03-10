import { type MotionValue, useTransform } from "framer-motion";

const useFrontCardOpacity = (x: MotionValue<number>) => {
  const likeOpacity = useTransform(x, (value) => (value >= 0 ? 1 : 0));
  const dislikeOpacity = useTransform(x, (value) => (value < 0 ? 1 : 0));

  return {
    likeOpacity: likeOpacity as MotionValue<number>,
    dislikeOpacity: dislikeOpacity as MotionValue<number>,
  };
};

export default useFrontCardOpacity;
