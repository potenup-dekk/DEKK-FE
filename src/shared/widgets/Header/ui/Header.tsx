"use client";

import Logo from "../../../../../public/logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/shared/components/Tab";
import { useAuthGuard, useLayoutChromeVisibility } from "@/shared/hooks";
import { headerVariants } from "../model/animate";
import { headerStyle } from "../style";
import { ActionButton } from "@/shared/components/Button";

const Header = () => {
  const { isChromeVisible } = useLayoutChromeVisibility();
  const { root, left, center, right } = headerStyle();
  const { isAuthenticated } = useAuthGuard();

  return (
    <motion.div
      id="app-header"
      className="overflow-hidden"
      variants={headerVariants}
      initial={false}
      animate={isChromeVisible ? "visible" : "hidden"}
      style={{ pointerEvents: isChromeVisible ? "auto" : "none" }}
      aria-hidden={!isChromeVisible}
    >
      <div className={root()}>
        <div className={left()}></div>

        <div className={center()}>
          <Link href={"/"}>
            <Image
              src={Logo}
              width={90}
              height={24}
              alt="DEKK logo"
              loading="eager"
            />
          </Link>
        </div>

        <div className={right()}>
          {isAuthenticated ? (
            <Link href="/me">
              <Profile />
            </Link>
          ) : (
            <Link href="/login">
              <ActionButton
                color="primary"
                label="로그인"
                type="button"
                size="sm"
              />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
