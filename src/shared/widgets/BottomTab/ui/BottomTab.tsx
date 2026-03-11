"use client";

import { motion } from "framer-motion";
import { Tab, TabItem } from "@/shared/components/Tab";
import APP_ROUTES from "@/shared/constants/routes";
import { useLayoutChromeVisibility } from "@/shared/hooks";
import { HomeIcon, LayersIcon, ShirtIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { bottomTabVariants } from "../model/animate";
import { bottomTabStyle } from "../style";

const BOTTOM_TAB_ITEMS = [
  { icon: HomeIcon, label: "홈", route: APP_ROUTES.HOME },
  { icon: LayersIcon, label: "덱", route: APP_ROUTES.DECK },
  { icon: ShirtIcon, label: "등록", route: APP_ROUTES.UPLOAD },
] as const;

const BottomTab = () => {
  const { isChromeVisible } = useLayoutChromeVisibility();
  const pathname = usePathname();
  const router = useRouter();
  const { root, inner } = bottomTabStyle();

  return (
    <motion.div
      id="app-bottom-tab"
      className={`${root()} overflow-hidden`}
      variants={bottomTabVariants}
      initial={false}
      animate={isChromeVisible ? "visible" : "hidden"}
      style={{ pointerEvents: isChromeVisible ? "auto" : "none" }}
      aria-hidden={!isChromeVisible}
    >
      <div className={inner()}>
        <Tab>
          {BOTTOM_TAB_ITEMS.map((item) => {
            return (
              <TabItem
                key={item.route}
                icon={item.icon}
                label={item.label}
                selected={pathname === item.route}
                onClick={() => {
                  router.push(item.route);
                }}
              />
            );
          })}
        </Tab>
      </div>
    </motion.div>
  );
};

export default BottomTab;
