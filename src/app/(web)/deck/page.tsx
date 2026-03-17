import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMyInfoAction } from "@/shared/api/actions";
import DeckPageClient from "./ui/DeckPageClient";

export const metadata: Metadata = {
  title: "DEKK 덱 보관함",
  description: "내가 수집한 덱과 공유된 덱을 관리하고 확인할 수 있어요",
};

const DeckPage = async () => {
  try {
    const response = await getMyInfoAction();

    if (!response.data) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  return <DeckPageClient />;
};

export default DeckPage;
