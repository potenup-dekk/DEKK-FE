import deckStyle from "../style";
import DeckPreviewCard from "./DeckPreviewCard";

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
  const { coverStack, emptyCoverStack } = deckStyle();

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
        return (
          <DeckPreviewCard
            key={`${deckId}-${imageSrc}`}
            deckName={deckName}
            imageSrc={imageSrc}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default DeckPreviewStack;
