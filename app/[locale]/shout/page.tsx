import { CopyButton } from "@/components/copy-button";
import { setStaticParamsLocale } from "next-international/server";
import { RandomShout } from "@/components/random-shout";
import { getScopedI18n, getStaticParams } from "@/components/locales/server";
import { ErrorTopbar, OkTopbar } from "@/components/topbar";
import { Provider } from "jotai";

interface Props {
  params: { locale: string };
}

export default async function ShoutPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  const copyT = await getScopedI18n("copy");

  return (
    <>
      <div className="w-screen h-screen flex-wrap-reverse">
        <nav className="min-w-14">
          <ul>
            <li>
              <p>ok!</p>
            </li>
          </ul>
        </nav>
        <Provider>
          <main className="flex-wrap max-w-[93%]">
            <div className="mx-1/4 max-w-xl max-h-56 px-8">
              <RandomShout>
                <ErrorTopbar>{"out!"}</ErrorTopbar>
              </RandomShout>
            </div>
            <div className="max-w-52 mx-40 h-24">
              <CopyButton>
                {copyT("button")}
                <OkTopbar>{copyT("ok")}</OkTopbar>
                <ErrorTopbar>{copyT("error")}</ErrorTopbar>
              </CopyButton>
            </div>
          </main>
        </Provider>
      </div>
    </>
  );
}

// export function generateStaticParams() {
//   return getStaticParams();
// }
