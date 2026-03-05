export type ApiSuccess<T> = {
  code: string;
  message: string;
  data?: T; // data가 없을 수도 있음
};

export type ApiError = {
  code: string; // EG001 같은
  message: string;
  errors?: string[]; // 문서에 배열로 옴
};
