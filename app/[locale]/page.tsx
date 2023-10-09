import { CopyButton, ErrorMsg } from "@/components/copy-button";
import { RandomAtom } from "@/components/random-atom";
import { setStaticParamsLocale } from "next-international/server";
import { ShoutLayout } from "@/components/shout-layout";
import type { PageProps } from "./type";
import { getScopedI18n } from "@/locales/server";

export default async function ShoutPage({ params: { locale } }: PageProps) {
  setStaticParamsLocale(locale);
  const copyT = await getScopedI18n("copy");

  return (
    <main className="w-screen h-screen">
      <ShoutLayout>
        <CopyButton key="ok-p">
          <p>{copyT("button")}</p>
          <ErrorMsg key="ok">
            <p>{copyT("ok")}</p>
            <p>{copyT("error")}</p>
          </ErrorMsg>
        </CopyButton>
        ,
      </ShoutLayout>
    </main>
  );
}
