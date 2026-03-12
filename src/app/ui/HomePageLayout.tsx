import Card from "@/shared/components/Card";
import HomeCardControls from "./HomeCardControls";
import { homePageStyle } from "./style";

interface HomePageLayoutProps {
  pageRef: React.RefObject<HTMLDivElement | null>;
  cardWrapRef: React.RefObject<HTMLDivElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  isFocusMode: boolean;
  isCardCompressed: boolean;
  expandedCardHeight: number | null;
  compressedCardHeight: number | null;
  onToggleFocusMode: () => void;
  onOpenCustomDeckSheet: (cardId: number) => void;
}

const HomePageLayout = ({
  pageRef,
  cardWrapRef,
  controlsRef,
  isFocusMode,
  isCardCompressed,
  expandedCardHeight,
  compressedCardHeight,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
}: HomePageLayoutProps) => {
  const { page, cardWrap } = homePageStyle();

  return (
    <div ref={pageRef} className={page({ isFocusMode })}>
      <div ref={cardWrapRef} className={cardWrap({ isFocusMode })}>
        <Card
          isCardCompressed={isCardCompressed}
          isFocusMode={isFocusMode}
          expandedCardHeight={expandedCardHeight}
          compressedCardHeight={compressedCardHeight}
          onToggleFocusMode={onToggleFocusMode}
          onOpenCustomDeckSheet={onOpenCustomDeckSheet}
        />
      </div>

      <HomeCardControls controlsRef={controlsRef} isFocusMode={isFocusMode} />
    </div>
  );
};

export default HomePageLayout;
