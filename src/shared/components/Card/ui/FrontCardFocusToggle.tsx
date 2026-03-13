import clsx from "clsx";
import { LayersPlus, Maximize2Icon, Minimize2Icon } from "lucide-react";
import { useCardAuth } from "../model/cardAuthContext";
import { cardStyle } from "../style";

interface FrontCardFocusToggleProps {
  cardId: number;
  isFocusMode: boolean;
  shouldShowFocusModeButton: boolean;
  onToggleFocusMode: () => void;
  onOpenCustomDeckSheet: (cardId: number) => void;
}

const FrontCardFocusToggle = ({
  cardId,
  isFocusMode,
  shouldShowFocusModeButton,
  onToggleFocusMode,
  onOpenCustomDeckSheet,
}: FrontCardFocusToggleProps) => {
  const { isLoggedIn } = useCardAuth();
  const { focusActionButton, focusActionGroup } = cardStyle();
  const FocusIcon = isFocusMode ? Minimize2Icon : Maximize2Icon;

  return (
    <div className={focusActionGroup()}>
      {isLoggedIn ? (
        <button
          type="button"
          className={clsx(focusActionButton())}
          onClick={() => {
            onOpenCustomDeckSheet(cardId);
          }}
          aria-label="커스텀 덱에 저장"
        >
          <LayersPlus size={20} strokeWidth={2.2} />
        </button>
      ) : null}
      {shouldShowFocusModeButton ? (
        <button
          type="button"
          className={clsx(focusActionButton())}
          onClick={onToggleFocusMode}
          aria-label={
            isFocusMode ? "기본 화면으로 복귀" : "카드 집중 모드 열기"
          }
        >
          <FocusIcon size={20} strokeWidth={2.2} />
        </button>
      ) : null}
    </div>
  );
};

export default FrontCardFocusToggle;
