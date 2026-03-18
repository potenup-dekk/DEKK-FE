import clsx from "clsx";
import deckStyle from "../style";

interface DeckShareNoticeNumberBadgeProps {
  value: number;
  size?: "sm" | "md" | "lg";
}

const DeckShareNoticeNumberBadge = ({
  value,
  size = "md",
}: DeckShareNoticeNumberBadgeProps) => {
  const {
    sheetOnboardingNumberBadge,
    sheetOnboardingNumberBadgeLg,
    sheetOnboardingNumberBadgeMd,
    sheetOnboardingNumberBadgeSm,
  } = deckStyle();

  const sizeClassName =
    size === "sm"
      ? sheetOnboardingNumberBadgeSm()
      : size === "lg"
        ? sheetOnboardingNumberBadgeLg()
        : sheetOnboardingNumberBadgeMd();

  return (
    <span className={clsx(sheetOnboardingNumberBadge(), sizeClassName)}>
      {value}
    </span>
  );
};

export default DeckShareNoticeNumberBadge;
