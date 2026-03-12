import { useLayoutChromeVisibility } from "@/shared/hooks";
import {
  useCardLayoutResizeEffect,
  useDisablePageScroll,
  useFocusModeChromeVisibility,
  useFocusTransitionReset,
} from "./useHomePageEffects";

interface HomePageClientEffectsParams {
  measureCardLayout: () => void;
  isFocusMode: boolean;
  isFocusTransitioning: boolean;
  setIsFocusTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHomePageClientEffects = ({
  measureCardLayout,
  isFocusMode,
  isFocusTransitioning,
  setIsFocusTransitioning,
}: HomePageClientEffectsParams) => {
  const { setChromeVisible } = useLayoutChromeVisibility();

  useDisablePageScroll();
  useCardLayoutResizeEffect(measureCardLayout);
  useFocusModeChromeVisibility(isFocusMode, setChromeVisible);
  useFocusTransitionReset(isFocusTransitioning, setIsFocusTransitioning);
};

export default useHomePageClientEffects;
