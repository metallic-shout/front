"use server";
import { ReactNode } from "react";
const container = `
absolute
flex-col
justify-start
left-0
h-fit
transition-transform ease-out
duration-500
translate-y-0
[*:not([data-visible])>&]:translate-y-[-100%]
`;

interface Props {
  color: string;
  children: ReactNode;
}

export const BaseTopbar = ({ children, color }: Props) => {
  return (
    <div className={` ${color} ${container} top-[3.7rem]`}>
      <p className={`py-1 h-max`}>{children}</p>
    </div>
  );
};
