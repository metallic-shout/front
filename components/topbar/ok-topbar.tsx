"use server";

import { ReactNode } from "react";
import { BaseTopbar } from "./base-topbar";

interface Props {
  children: ReactNode;
}

export const OkTopbar = ({ children }: Props) => {
  return <BaseTopbar color="bg-green-900">{children}</BaseTopbar>;
};
