import { createI18nClient } from "next-international/client";

export const { useI18n, useScopedI18n, I18nProviderClient } = createI18nClient({
  ja: () => import("./key-label-dict/ja"),
  en: () => import("./key-label-dict/en"),
});
