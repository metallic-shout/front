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

export const AboutPanel = ({ children: Child, text, gradient }: Props) => {
  return (
    <>
      <div className="items-start">
        <p>{text}</p>
      </div>
      <div className="relative h-full -z-10">
        <div className={`${gradiention} ${gradient}`}>
          <div className="justify-end items-end h-full">
            <Child className="h-full w-fit text-theme-bg" />
          </div>
        </div>
      </div>
    </>
  );
};
