import { CopyButton } from "@/components/copy-button";
import { setStaticParamsLocale } from "next-international/server";
import { RandomShout } from "@/components/random-shout";
import { getScopedI18n } from "@/components/locales/server";
import { ErrorTopbar, OkTopbar } from "@/components/topbar";
import { Provider } from "jotai";

interface Props {
  params: { locale: string };
}

export default async function ShoutPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  const copyT = await getScopedI18n("copy");

  return (
    <main className="w-screen h-screen flex-col">
      <Provider>
        <RandomShout>
          <ErrorTopbar>{"out!"}</ErrorTopbar>
        </RandomShout>
        <CopyButton>
          {copyT("button")}
          <OkTopbar>{copyT("ok")}</OkTopbar>
          <ErrorTopbar>{copyT("error")}</ErrorTopbar>
        </CopyButton>
      </Provider>
    </main>
  );
}
