"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Deck } from "@/shared/components/Deck";
import { useAuthGuard } from "@/shared/hooks";

const DeckPageClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthGuard();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="p-4 text-sm">로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 max-w-md items-center justify-center">
      <Deck />
      <Deck />
    </div>
  );
};

export default DeckPageClient;
