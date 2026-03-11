import { motion } from "framer-motion";
import {
  getDeckPreviewCardMotion,
  getDeckPreviewCardVisual,
} from "../model/animate";
import deckStyle from "../style";
import DeckCardImage from "./DeckCardImage";

interface DeckPreviewStackProps {
  deckId: number;
  deckName: string;
  isEmpty: boolean;
  previewImageSrcList: string[];
}

const DeckPreviewStack = ({
  deckId,
  deckName,
  isEmpty,
  previewImageSrcList,
}: DeckPreviewStackProps) => {
  const { coverStack, emptyCoverStack, previewImage, previewImageBase } =
    deckStyle();

  if (isEmpty) {
    return (
      <div className={coverStack()}>
        <div className={emptyCoverStack()} />
      </div>
    );
  }

  return (
    <div className={coverStack()}>
      {previewImageSrcList.slice(0, 3).map((imageSrc, index) => {
        const previewCardMotion = getDeckPreviewCardMotion(index);
        const previewCardVisual = getDeckPreviewCardVisual(index);

        return (
          <motion.div
            key={`${deckId}-${imageSrc}`}
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
      })}
    </div>
  );
};

export default DeckPreviewStack;
