"use server";
import type { IconType } from "react-icons";

interface Props {
  text: string;
  gradient: string;
  children: IconType;
}

const gradiention = `
absolute
w-screen
right-0
h-full
bg-gradient-to-br
from-transparent
from-60%
`;

const gradientionUnder = `
bg-gradient-to-tr
from-transparent
from-60%
relative
bottom-[2rem]
h-10
`;

export const AboutPanel = ({ children: Child, text, gradient }: Props) => {
  return (
    <>
      <div className="items-start p-about-panel pl-5">
        <p className="whitespace-pre-line">{text}</p>
      </div>
      <div className="relative h-full -z-10">
        <div className={`${gradiention} ${gradient}`}>
          <div className="justify-end items-end h-full">
            <Child className="h-full w-fit text-theme-bg" />
          </div>
        </div>
      </div>
      <div className={`${gradientionUnder} ${gradient}`}></div>
      <div></div>
    </>
  );
};
