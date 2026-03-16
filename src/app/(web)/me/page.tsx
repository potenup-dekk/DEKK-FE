import type { Metadata } from "next";
import { ProfileClient } from "@/shared/widgets/ProfileClient";

export const metadata: Metadata = {
  title: "DEKK 마이페이지",
  description: "내 정보를 수정하여 조금 더 핏에 맞는 추천을 해줘요",
};

const MePage = () => {
  return (
    <div className="flex justify-center w-full">
      <ProfileClient />
    </div>
  );
};

export default MePage;
