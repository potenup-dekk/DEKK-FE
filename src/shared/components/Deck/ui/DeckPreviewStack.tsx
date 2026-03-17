import { UsersRound } from "lucide-react";
import deckStyle from "../style";
import DeckPreviewCard from "./DeckPreviewCard";

interface DeckPreviewStackProps {
  deckId: number;
  deckName: string;
  isEmpty: boolean;
  isShared: boolean;
  previewImageSrcList: string[];
}

const DeckPreviewStack = ({
  deckId,
  deckName,
  isEmpty,
  isShared,
  previewImageSrcList,
}: DeckPreviewStackProps) => {
  const { coverStack, emptyCoverStack, sharedDeckBadge, sharedDeckBadgeIcon } =
    deckStyle();

  if (isEmpty) {
    return (
      <div className={coverStack()}>
        <div className={emptyCoverStack()} />
        {isShared ? (
          <div className={sharedDeckBadge()} aria-hidden>
            <UsersRound className={sharedDeckBadgeIcon()} />
          </div>
        ) : null}
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
      {isShared ? (
        <div className={sharedDeckBadge()} aria-hidden>
          <UsersRound className={sharedDeckBadgeIcon()} />
        </div>
      ) : null}
    </div>
  );
};

export default DeckPreviewStack;
