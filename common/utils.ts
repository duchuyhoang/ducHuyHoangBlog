import { NextIncomingMessage } from "next/dist/server/request-meta";

export const buildHostUrl = (req: NextIncomingMessage | undefined) => {
  if (!req) return "";
  const proto = req.headers["x-forwarded-proto"] ? "https://" : "http://";
  return `${proto}${req.headers.host}`;
};

export function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
