import type { GuestSharedDeckCardData } from "@/entities/deck";
import SharedDeckPageView from "./SharedDeckPageView";

interface SharedDeckGuestPageProps {
  token: string;
  cards: GuestSharedDeckCardData[];
}

const SharedDeckGuestPage = ({ token, cards }: SharedDeckGuestPageProps) => {
  return (
    <SharedDeckPageView
      token={token}
      title="게스트 공유 덱"
      description="비회원으로 공유 덱을 보고 있어요. 카드 이미지와 체형/태그 정보만 볼 수 있습니다."
      cards={cards}
    />
  );
};

export default SharedDeckGuestPage;
