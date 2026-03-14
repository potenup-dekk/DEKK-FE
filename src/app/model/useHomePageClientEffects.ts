import { useLayoutChromeVisibility } from "@/shared/hooks";
import {
  type FocusTransitionDirection,
  useCardLayoutResizeEffect,
  useDisablePageScroll,
  useFocusModeChromeVisibility,
  useFocusTransitionReset,
} from "./useHomePageEffects";

interface HomePageClientEffectsParams {
  focusTransitionDirection: FocusTransitionDirection;
  measureCardLayout: () => void;
  isFocusMode: boolean;
  isFocusTransitioning: boolean;
  setFocusTransitionDirection: React.Dispatch<
    React.SetStateAction<FocusTransitionDirection>
  >;
  setIsFocusTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHomePageClientEffects = ({
  focusTransitionDirection,
  measureCardLayout,
  isFocusMode,
  isFocusTransitioning,
  setFocusTransitionDirection,
  setIsFocusTransitioning,
}: HomePageClientEffectsParams) => {
  const { setChromeVisible } = useLayoutChromeVisibility();

  useDisablePageScroll();
  useCardLayoutResizeEffect(measureCardLayout);
  useFocusModeChromeVisibility(
    isFocusMode,
    isFocusTransitioning,
    focusTransitionDirection,
    setChromeVisible,
  );
  useFocusTransitionReset(
    isFocusTransitioning,
    setFocusTransitionDirection,
    setIsFocusTransitioning,
  );
};

export default useHomePageClientEffects;
