import { NextIncomingMessage } from "next/dist/server/request-meta";

export const buildHostUrl = (req: NextIncomingMessage | undefined) => {
  if (!req) return "";
  const proto = req.headers["x-forwarded-proto"] ? "https://" : "http://";
  return `${proto}${req.headers.host}`;
};
