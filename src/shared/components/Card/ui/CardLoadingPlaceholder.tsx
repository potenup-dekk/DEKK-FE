import { cardStyle } from "../style";

const VIEWPORT_FALLBACK_CARD_HEIGHT =
  "min(calc(min(100vw, 448px) * 0.8333333333 * 1.5), calc(100dvh - 64px - 80px - 56px - 24px))";

interface CardLoadingPlaceholderProps {
  shouldApplyCompressedCard: boolean;
  targetCardHeight: number | null;
  shouldUseViewportFallbackHeight: boolean;
}

const CardLoadingPlaceholder = ({
  shouldApplyCompressedCard,
  targetCardHeight,
  shouldUseViewportFallbackHeight,
}: CardLoadingPlaceholderProps) => {
  const shouldConstrainCardHeight =
    shouldApplyCompressedCard || shouldUseViewportFallbackHeight;
  const { frontRoot } = cardStyle({
    isCardCompressed: shouldConstrainCardHeight,
  });
  const placeholderStyle = shouldConstrainCardHeight
    ? { height: targetCardHeight ?? VIEWPORT_FALLBACK_CARD_HEIGHT }
    : undefined;

  return (
    <div
      aria-hidden
      className={`${frontRoot()} overflow-hidden bg-gray-200/80 animate-pulse`}
      style={placeholderStyle}
    />
  );
};

export default CardLoadingPlaceholder;
