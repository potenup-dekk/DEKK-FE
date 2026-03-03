import { UserIcon } from "lucide-react";
import React from "react";

const Profile = () => {
  return (
    <button className="flex size-10 items-center justify-center bg-primary rounded-full text-white cursor-pointer">
      <UserIcon size={24} />
    </button>
  );
};

export default Profile;
