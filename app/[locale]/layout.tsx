import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { getStaticParams } from "@/components/locales/server";
import { WithToolBox } from "@/components/tool-box";
import { TopBar } from "./top-bar";
import { setStaticParamsLocale } from "next-international/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metallic Shout",
  description: "All humans must shout metallic.",
  manifest: "/manifest.webmanifest",
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Provider>
          <TopBar currentLocale={locale} />
          <WithToolBox />
          {children}
        </Provider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
