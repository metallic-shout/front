import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { getStaticParams } from "@/components/locales/server";

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
        <Provider locale={locale}>{children}</Provider>
      </body>
    </html>
  );
}
