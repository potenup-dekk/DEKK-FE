"use client";

import Logo from "../../../../../public/logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/shared/components/Tab";
import { useLayoutChromeVisibility } from "@/shared/hooks";
import { headerVariants } from "../model/animate";
import { headerStyle } from "../style";

const Header = () => {
  const { isChromeVisible } = useLayoutChromeVisibility();
  const { root, left, center, right } = headerStyle();

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
          <Link href="/me">
            <Profile />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
