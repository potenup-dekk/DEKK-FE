type TokenPayload = {
  accessToken: string;
  refreshToken: string;
};

export async function setTokens(accessToken: string, refreshToken: string) {
  const payload: TokenPayload = { accessToken, refreshToken };

  const response = await fetch("/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("토큰 쿠키 저장에 실패했습니다.");
  }
}

export async function clearTokens() {
  await fetch("/api/auth/tokens", {
    method: "DELETE",
    credentials: "include",
  });
}
