const HOP_BY_HOP_REQUEST_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
]);

const HOP_BY_HOP_RESPONSE_HEADERS = new Set([
  "connection",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

const copyRequestHeaders = (headers: Headers) => {
  const copied = new Headers();

  headers.forEach((value, key) => {
    if (HOP_BY_HOP_REQUEST_HEADERS.has(key.toLowerCase())) return;
    copied.set(key, value);
  });

  return copied;
};

const copyResponseHeaders = (headers: Headers) => {
  const copied = new Headers();

  headers.forEach((value, key) => {
    if (HOP_BY_HOP_RESPONSE_HEADERS.has(key.toLowerCase())) return;
    copied.set(key, value);
  });

  return copied;
};

export { copyRequestHeaders, copyResponseHeaders };
