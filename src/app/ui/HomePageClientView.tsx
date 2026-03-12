import DeckCreateSheet from "@/shared/components/Deck/ui/DeckCreateSheet";
import HomePageLayout from "./HomePageLayout";

interface HomePageClientViewProps {
  pageRef: React.RefObject<HTMLDivElement | null>;
  cardWrapRef: React.RefObject<HTMLDivElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  isFocusMode: boolean;
  isCardCompressed: boolean;
  expandedCardHeight: number | null;
  compressedCardHeight: number | null;
  onToggleFocusMode: () => void;
  onOpenCustomDeckSheet: (cardId: number) => void;
  isCustomDeckSheetOpen: boolean;
  customDeckTargetCardId: number | null;
  onCloseCustomDeckSheet: () => void;
}

const HomePageClientView = ({
  pageRef,
  cardWrapRef,
  controlsRef,
  isFocusMode,
  isCardCompressed,
  expandedCardHeight,
  compressedCardHeight,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
  isCustomDeckSheetOpen,
  customDeckTargetCardId,
  onCloseCustomDeckSheet,
}: HomePageClientViewProps) => {
  return (
    <>
      <HomePageLayout
        pageRef={pageRef}
        cardWrapRef={cardWrapRef}
        controlsRef={controlsRef}
        isFocusMode={isFocusMode}
        isCardCompressed={isCardCompressed}
        expandedCardHeight={expandedCardHeight}
        compressedCardHeight={compressedCardHeight}
        onToggleFocusMode={onToggleFocusMode}
        onOpenCustomDeckSheet={onOpenCustomDeckSheet}
      />
      <DeckCreateSheet
        isOpen={isCustomDeckSheetOpen}
        targetCardId={customDeckTargetCardId}
        onClose={onCloseCustomDeckSheet}
      />
    </>
  );
};

export default HomePageClientView;
