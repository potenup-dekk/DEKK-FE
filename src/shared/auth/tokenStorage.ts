const ACCESS_TOKEN_KEY = "dekk_access_token";
const REFRESH_TOKEN_KEY = "dekk_refresh_token";

let memAccess: string | null = null;
let memRefresh: string | null = null;

export function setTokens(accessToken: string, refreshToken: string) {
  memAccess = accessToken;
  memRefresh = refreshToken;
  try {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch {}
}

export function setAccessToken(token: string) {
  memAccess = token;
  try {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } catch {}
}

export function getAccessToken(): string | null {
  if (memAccess) return memAccess;
  try {
    const t = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    memAccess = t;
    return t;
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  if (memRefresh) return memRefresh;
  try {
    const t = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    memRefresh = t;
    return t;
  } catch {
    return null;
  }
}

export function clearTokens() {
  memAccess = null;
  memRefresh = null;
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {}
}
