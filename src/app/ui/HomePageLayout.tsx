import Card from "@/shared/components/Card";
import HomeCardControls from "./HomeCardControls";
import { homePageStyle } from "./style";

interface HomePageLayoutProps {
  pageRef: React.RefObject<HTMLDivElement | null>;
  cardWrapRef: React.RefObject<HTMLDivElement | null>;
  controlsRef: React.RefObject<HTMLDivElement | null>;
  isFocusMode: boolean;
  isFocusTransitioning: boolean;
  transitionOffsetY: number;
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
  isFocusTransitioning,
  transitionOffsetY,
  isCardCompressed,
  expandedCardHeight,
  compressedCardHeight,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
}: HomePageLayoutProps) => {
  const { page, cardWrap } = homePageStyle();
  const shouldApplyTransitionOffset =
    isFocusTransitioning && Math.abs(transitionOffsetY) >= 1;

  return (
    <div ref={pageRef} className={page({ isFocusMode })}>
      <div
        ref={cardWrapRef}
        className={cardWrap({ isFocusMode })}
        style={
          shouldApplyTransitionOffset
            ? {
                transform: `translateY(${transitionOffsetY}px)`,
                willChange: "transform",
              }
            : undefined
        }
      >
        <Card
          isCardCompressed={isCardCompressed}
          isFocusMode={isFocusMode}
          isFocusTransitioning={isFocusTransitioning}
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
