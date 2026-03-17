import type { Metadata } from "next";
import { ApiRequestError } from "@/shared/api/fetcher/client";
import { getSharedDeckPreview } from "@/shared/api/services";
import sharedDeckPageStyle from "./style";
import SharedDeckGuestPage from "./ui/SharedDeckGuestPage";

export const metadata: Metadata = {
  title: "DEKK 쉐어덱",
  description: "공유 링크로 쉐어덱 카드 프리뷰를 확인할 수 있어요",
};

interface SharedDeckPageProps {
  params: Promise<{ token: string }>;
}

const SharedDeckTokenPage = async ({ params }: SharedDeckPageProps) => {
  const { token } = await params;
  const { errorText, page } = sharedDeckPageStyle();

  try {
    const previewResponse = await getSharedDeckPreview(token);

    return (
      <SharedDeckGuestPage token={token} cards={previewResponse.data ?? []} />
    );
  } catch (error) {
    if (error instanceof ApiRequestError) {
      return (
        <section className={page()}>
          <p className={errorText()}>{error.message}</p>
        </section>
      );
    }

    return (
      <section className={page()}>
        <p className={errorText()}>쉐어덱을 불러오지 못했습니다.</p>
      </section>
    );
  }
};

export default SharedDeckTokenPage;
