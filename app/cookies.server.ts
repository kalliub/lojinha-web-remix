import { createCookie } from "@remix-run/node";

export const listData = createCookie("list-data", {
  maxAge: 30 * 60, // 30 minutes
  secure: true,
  path: "/",
});
