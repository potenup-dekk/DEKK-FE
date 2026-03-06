"use client";

import { Tab, TabItem } from "@/shared/components/Tab";
import APP_ROUTES from "@/shared/constants/routes";
import { HomeIcon, LayersIcon, ShirtIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center">
      <div className="w-full max-w-md">
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
    </div>
  );
};

export default BottomTab;
