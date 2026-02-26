"use client";

import { useSession, signOut } from "next-auth/react";

export default function SessionCheck() {
  const { data, status } = useSession();
  if (status === "loading") return <div>loading...</div>;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>
        로그아웃
      </button>
    </div>
  );
}
