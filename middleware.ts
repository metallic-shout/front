import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";
import conf from "./components/locales/conf.json";

const I18nMiddleware = createI18nMiddleware({
  locales: ["ja", "en"],
  defaultLocale: "ja",
  urlMappingStrategy: "redirect",
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
