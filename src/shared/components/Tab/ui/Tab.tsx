import { motion } from "framer-motion";
import { TabProps } from "../props.type";
import Link from "next/link";
import Profile from "./Profile";
import { Children, isValidElement } from "react";
import { TabItemProps } from "../props.type";

const Tab = ({ children }: TabProps) => {
  const tabItems = Children.toArray(children).filter((child) =>
    isValidElement<TabItemProps>(child),
  );

  const selectedIndex = tabItems.findIndex(
    (child) =>
      isValidElement<TabItemProps>(child) && Boolean(child.props.selected),
  );

  const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  return (
    <div className="flex w-full bg-white items-center z-50 justify-between px-6 py-2 gap-3">
      <div className="relative flex flex-1 items-stretch">
        {tabItems.length > 0 && (
          <motion.div
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ width: `${100 / tabItems.length}%` }}
            animate={{
              x: `${activeIndex * 100}%`,
              opacity: selectedIndex >= 0 ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}

        <div className="relative z-10 flex w-full items-stretch">
          {children}
        </div>
      </div>

      <Link href="./me">
        <Profile />
      </Link>
    </div>
  );
};

export default Tab;
