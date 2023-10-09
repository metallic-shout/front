import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  ja: () => import("./key-label-dict/ja"),
  en: () => import("./key-label-dict/en"),
});
