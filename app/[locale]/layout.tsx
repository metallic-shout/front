import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import conf from "@/locales/conf.json";
import { Provider } from "./provider";
import { getStaticParams } from "@/locales/server";
import type { PageProps } from "./type";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metallic Shout",
  description: "All humans must shout metallic.",
};

export const generateStaticParams = () => {
  return getStaticParams();
};

export default function RootLayout({
  children,
  params: { locale },
}: PageProps) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Provider locale={locale}>{children}</Provider>
      </body>
    </html>
  );
}
