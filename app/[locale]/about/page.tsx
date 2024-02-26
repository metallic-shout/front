import { setStaticParamsLocale } from "next-international/server";
import { getScopedI18n, getStaticParams } from "@/components/locales/server";
import { AboutPanel } from "@/components/about-panel";
import { BiHappyHeartEyes } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { LuHandMetal } from "react-icons/lu";
import { FaDiscord } from "react-icons/fa";

interface Props {
  params: { locale: string };
}
export default async function AboutPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  const aboutT = await getScopedI18n("about");

  return (
    <div className="flex-col gap-12">
      <h1>Metallic Shout</h1>
      <div className="flex-col grid grid-cols-platte auto-rows-max gap-y-8">
        <AboutPanel gradient="to-about-panel-1" text={aboutT("text1")}>
          {BiHappyHeartEyes}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-2" text={aboutT("text2")}>
          {FaLaptopCode}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-3" text={aboutT("text3")}>
          {LuHandMetal}
        </AboutPanel>
        <AboutPanel gradient="to-about-panel-4" text={aboutT("text4")}>
          {FaDiscord}
        </AboutPanel>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
