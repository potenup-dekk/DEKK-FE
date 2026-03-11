import clsx from "clsx";
import { Maximize2Icon, Minimize2Icon } from "lucide-react";
import { cardStyle } from "../style";

interface FrontCardFocusToggleProps {
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
}

const FrontCardFocusToggle = ({
  isFocusMode,
  onToggleFocusMode,
}: FrontCardFocusToggleProps) => {
  const { focusToggleButton } = cardStyle();
  const FocusIcon = isFocusMode ? Minimize2Icon : Maximize2Icon;

  return (
    <button
      type="button"
      className={clsx(focusToggleButton())}
      onClick={onToggleFocusMode}
      aria-label={isFocusMode ? "기본 화면으로 복귀" : "카드 집중 모드 열기"}
    >
      <FocusIcon size={20} strokeWidth={2.2} />
    </button>
  );
};

export default FrontCardFocusToggle;
