"use client";

import { RandomShout } from "./random-shout";
import { Provider } from "jotai";
import { Hello } from "./hello";

interface Props {
  children: React.ReactNode;
}

export const ShoutLayout = ({ children }: Props) => {
  return (
    <>
      <Provider>
        <RandomShout />
        {children}
        <Hello />
      </Provider>
    </>
  );
};
