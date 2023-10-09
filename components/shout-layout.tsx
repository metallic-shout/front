"use client";

import { RandomAtom } from "./random-atom";
import { Provider } from "jotai";

interface Props {
  children: React.ReactNode;
}

export const ShoutLayout = ({ children }: Props) => {
  return (
    <>
      <Provider>
        <RandomAtom />
        {children}
      </Provider>
    </>
  );
};
