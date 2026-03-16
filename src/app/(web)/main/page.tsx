import type { Metadata } from "next";
import HomePageClient from "@/app/ui/HomePageClient";

export const metadata: Metadata = {
  title: "DEKK",
  description: "나에게 꼭 맞는 맞춤 핏을 탐색하고 수집하세요!",
};

const MainPage = () => {
  return <HomePageClient />;
};

export default MainPage;
