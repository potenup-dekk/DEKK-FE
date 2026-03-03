import { UserIcon } from "lucide-react";
import { TabProps } from "../props.type";
import Link from "next/link";
import Profile from "./Profile";

const Tab = ({ children }: TabProps) => {
  return (
    <div className="flex w-full bg-white items-center justify-between px-6 py-2">
      <div className="flex gap-1">{children}</div>

      <Link href="./me">
        <Profile />
      </Link>
    </div>
  );
};

export default Tab;
