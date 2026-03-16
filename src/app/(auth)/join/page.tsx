import type { Metadata } from "next";
import JoinPageClient from "./ui/JoinPageClient";

export const metadata: Metadata = {
  title: "DEKK 상세 정보",
  description:
    "상세 정보를 입력하여 DEKK가 조금 더 좋아할만한 코디를 추천해줘요",
};

const JoinPage = () => {
  return <JoinPageClient />;
};

export default JoinPage;
