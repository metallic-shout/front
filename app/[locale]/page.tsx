import { CopyButton, ErrorMsg } from "@/components/copy-button";
import { setStaticParamsLocale } from "next-international/server";
import { ShoutLayout } from "@/components/shout-layout";
import { getScopedI18n } from "@/components/locales/server";

interface Props {
  params: { locale: string };
}

export default async function ShoutPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  const copyT = await getScopedI18n("copy");

  return (
    <main className="w-screen h-screen flex-col">
      <ShoutLayout>
        <CopyButton key="ok-p">
          <p>{copyT("button")}</p>
          <ErrorMsg key="ok">
            <p>{copyT("ok")}</p>
            <p>{copyT("error")}</p>
          </ErrorMsg>
        </CopyButton>
      </ShoutLayout>
    </main>
  );
}
