import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";
import conf from "./locales/conf.json";

const I18nMiddleware = createI18nMiddleware(conf);

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
