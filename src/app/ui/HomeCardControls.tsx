import type { RefObject } from "react";
import ControlButton from "@/shared/components/Button/ControlButton";
import { HeartIcon, RefreshCwIcon, ThumbsDown } from "lucide-react";
import { homePageStyle } from "./style";

interface HomeCardControlsProps {
  controlsRef: RefObject<HTMLDivElement | null>;
  isFocusMode: boolean;
}

const HomeCardControls = ({
  controlsRef,
  isFocusMode,
}: HomeCardControlsProps) => {
  const { controls, controlsWrap } = homePageStyle();

  const dispatchCardEvent = (eventName: string) => {
    window.dispatchEvent(new Event(eventName));
  };

  return (
    <div ref={controlsRef} className={controlsWrap({ isFocusMode })}>
      <div className={controls()}>
        <ControlButton
          icon={ThumbsDown}
          label="별로예요"
          onClick={() => {
            dispatchCardEvent("card:dislike");
          }}
        />
        <ControlButton
          icon={RefreshCwIcon}
          label="뒤집기"
          color="secondary"
          onClick={() => {
            dispatchCardEvent("card:flip");
          }}
        />
        <ControlButton
          icon={HeartIcon}
          label="마음에 들어요"
          onClick={() => {
            dispatchCardEvent("card:like");
          }}
        />
      </div>
    </div>
  );
};

export default HomeCardControls;
