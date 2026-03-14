import { motion, useAnimationControls } from "framer-motion";
import { TabProps } from "../props.type";
import { Children, isValidElement, useEffect } from "react";
import { TabItemProps } from "../props.type";
import {
  getTabIndicatorAnimate,
  tabIndicatorTransition,
} from "../model/animate";

const Tab = ({ children }: TabProps) => {
  const indicatorControls = useAnimationControls();
  const tabItems = Children.toArray(children).filter((child) =>
    isValidElement<TabItemProps>(child),
  );

  const selectedIndex = tabItems.findIndex(
    (child) =>
      isValidElement<TabItemProps>(child) && Boolean(child.props.selected),
  );
  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  useEffect(() => {
    void indicatorControls.start(
      getTabIndicatorAnimate(activeIndex, selectedIndex >= 0),
    );
  }, [activeIndex, indicatorControls, selectedIndex]);

  return (
    <div className="flex h-fit w-full items-center justify-between gap-3 px-6 py-3">
      <div className="relative flex flex-1 items-stretch">
        {tabItems.length > 0 && (
          <motion.div
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ width: `${100 / tabItems.length}%` }}
            initial={false}
            animate={indicatorControls}
            transition={tabIndicatorTransition}
          />
        )}

        <div className="relative z-10 flex w-full items-stretch">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Tab;
