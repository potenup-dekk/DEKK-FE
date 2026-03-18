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
      title="공유 덱 미리보기"
      description=""
      cards={cards}
    />
  );
};

export default SharedDeckGuestPage;
