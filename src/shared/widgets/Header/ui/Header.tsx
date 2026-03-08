import Logo from "../../../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Profile } from "@/shared/components/Tab";
import { headerStyle } from "../style";

const Header = () => {
  const { root, left, center, right } = headerStyle();

  return (
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
  );
};

export default Header;
