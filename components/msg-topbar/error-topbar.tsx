"use server";
import { ReactNode } from "react";
import { BaseTopbar } from "./base-topbar";

interface Props {
  children: ReactNode;
}

export const ErrorTopbar = ({ children }: Props) => {
  return <BaseTopbar color="bg-red-900">{children}</BaseTopbar>;
};
