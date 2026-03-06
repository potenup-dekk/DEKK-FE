import Logo from "../../../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Profile from "@/shared/components/Tab/ui/Profile";

const Header = () => {
  return (
    <div className="grid grid-cols-3 justify-between items-center w-full h-16 p-5">
      <div className="flex"></div>

      <div className="flex items-center justify-center">
        <Link href={"/"}>
          <Image src={Logo} width={90} alt="asdf" />
        </Link>
      </div>

      <div className="flex items-center justify-end">
        <Link href="/me">
          <Profile />
        </Link>
      </div>
    </div>
  );
};

export default Header;
