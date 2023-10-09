"use client";

import { useAtomValue } from "jotai";
import { isSuccessAtom } from "./atom";
import { ErrorMsg as PureErrorMsg } from "../error-msg";

interface Props {
  children: [React.ReactNode, React.ReactNode];
}

export const ErrorMsg: React.FC<Props> = ({ children }) => {
  const isSuccess = useAtomValue(isSuccessAtom);
  return <PureErrorMsg isSuccess={isSuccess}>{children}</PureErrorMsg>;
};
