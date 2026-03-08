import ControlButton from "@/shared/components/Button/ControlButton";
import { HeartIcon, RefreshCwIcon, ThumbsDown } from "lucide-react";
import { homePageStyle } from "./style";

const HomeCardControls = () => {
  const { controls } = homePageStyle();

  const dispatchCardEvent = (eventName: string) => {
    window.dispatchEvent(new Event(eventName));
  };

  return (
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
  );
};

export default HomeCardControls;
