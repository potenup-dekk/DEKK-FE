// src/shared/auth/tokenStorage.ts
const ACCESS_TOKEN_KEY = "dekk_access_token";

/**
 * refreshToken은 HttpOnly 쿠키로 내려오므로 FE에서 저장/조회하지 않음.
 * accessToken만 FE가 들고 API Authorization 헤더에 붙여서 사용.
 *
 * - 보안 최선: 메모리 저장(새로고침 시 로그아웃처럼 동작)
 * - 개발/UX 절충: sessionStorage(탭 닫히면 삭제)
 *
 * 여기선 sessionStorage + 메모리 캐시로 구성(간단).
 */

let memoryToken: string | null = null;

export function setAccessToken(token: string) {
  memoryToken = token;
  try {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {
    // storage 사용 불가 환경 대비
  }
}

export function getAccessToken(): string | null {
  if (memoryToken) return memoryToken;

  try {
    const t = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    memoryToken = t;
    return t;
  } catch {
    return null;
  }
}

export function clearAccessToken() {
  memoryToken = null;
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {}
}
