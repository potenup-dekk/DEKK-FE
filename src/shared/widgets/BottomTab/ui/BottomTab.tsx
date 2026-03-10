"use client";

import { motion } from "framer-motion";
import { Tab, TabItem } from "@/shared/components/Tab";
import APP_ROUTES from "@/shared/constants/routes";
import { useLayoutChromeVisibility } from "@/shared/hooks";
import { HomeIcon, LayersIcon, ShirtIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { bottomTabVariants } from "../model/animate";
import { bottomTabStyle } from "../style";

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
          <TabItem
            icon={HomeIcon}
            label="홈"
            selected={pathname === APP_ROUTES.HOME}
            onClick={() => {
              router.push(APP_ROUTES.HOME);
            }}
          />

          <TabItem
            icon={LayersIcon}
            label="덱"
            selected={pathname === APP_ROUTES.DECK}
            onClick={() => {
              router.push(APP_ROUTES.DECK);
            }}
          />

          <TabItem
            icon={ShirtIcon}
            label="등록"
            selected={pathname === APP_ROUTES.UPLOAD}
            onClick={() => {
              router.push(APP_ROUTES.UPLOAD);
            }}
          />
        </Tab>
      </div>
    </motion.div>
  );
};

export default BottomTab;
