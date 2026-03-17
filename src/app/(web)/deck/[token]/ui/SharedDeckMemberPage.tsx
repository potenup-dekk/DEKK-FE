import type { GuestSharedDeckCardData } from "@/entities/deck";
import SharedDeckPageView from "./SharedDeckPageView";

interface SharedDeckMemberPageProps {
  cards: GuestSharedDeckCardData[];
}

const SharedDeckMemberPage = ({ cards }: SharedDeckMemberPageProps) => {
  return (
    <SharedDeckPageView
      title="회원 공유 덱"
      description="회원으로 공유 덱을 보고 있어요. 링크 참여 및 공유 기능은 계정 상태에 따라 제공됩니다."
      cards={cards}
    />
  );
};

export default SharedDeckMemberPage;
