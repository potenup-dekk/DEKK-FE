import type { Metadata } from "next";
import PostPageClient from "./ui/PostPageClient";

export const metadata: Metadata = {
  title: "DEKK 카드 등록",
  description: "내 인생 사진을 다른 사람과 공유할 수 있어요",
};

const PostPage = () => {
  return <PostPageClient />;
};

export default PostPage;
