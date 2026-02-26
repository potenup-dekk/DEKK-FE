import type { ApiSuccess, ApiError } from "../types/api";

// export class ApiRequestError extends Error {
//   code: string;
//   errors?: string[];

//   constructor(payload: ApiError) {
//     super(payload.message);
//     this.code = payload.code;
//     this.errors = payload.errors;
//   }
// }

export async function requestJson<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ApiSuccess<T>> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = (await res.json()) as ApiSuccess<T> | ApiError;

  if (!res.ok) {
    const err = body as ApiError;
    throw new Error(err.message);
  }

  return body as ApiSuccess<T>;
}
