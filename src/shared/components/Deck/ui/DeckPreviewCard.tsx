import { motion } from "framer-motion";
import {
  getDeckPreviewCardMotion,
  getDeckPreviewCardVisual,
} from "../model/animate";
import deckStyle from "../style";
import DeckCardImage from "./DeckCardImage";

interface DeckPreviewCardProps {
  deckName: string;
  imageSrc: string;
  index: number;
}

const DeckPreviewCard = ({
  deckName,
  imageSrc,
  index,
}: DeckPreviewCardProps) => {
  const { previewImage, previewImageBase } = deckStyle();
  const previewCardMotion = getDeckPreviewCardMotion(index);
  const previewCardVisual = getDeckPreviewCardVisual(index);

  return (
    <motion.div
      className={previewImageBase()}
      initial={previewCardMotion.initial}
      animate={previewCardMotion.animate}
      style={{
        width: previewCardVisual.width,
        zIndex: previewCardVisual.zIndex,
      }}
    >
      <DeckCardImage
        src={imageSrc}
        alt={`${deckName} 미리보기`}
        className={previewImage()}
      />
    </motion.div>
  );
};

export default DeckPreviewCard;
