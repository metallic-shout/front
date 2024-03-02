import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { getStaticParams } from "@/components/locales/server";
import { WithToolBox } from "@/components/tool-box";
import { TopBar } from "./top-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metallic Shout",
  description: "All humans must shout metallic.",
  manifest: "/manifest.webmanifest",
};

export const generateStaticParams = () => {
  return getStaticParams();
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <TopBar />
        <Provider locale={locale}>
          <WithToolBox />
          {children}
        </Provider>
      </body>
    </html>
  );
}
