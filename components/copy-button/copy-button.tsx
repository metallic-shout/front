"use client";

import { useCallback, useTransition } from "react";
import { useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { isSuccessAtom } from "./atom";
import { shoutAtom } from "../atom";

interface Props {
  children: [React.ReactNode, React.ReactNode];
}

const useGetShout = () => {
  const getShout = useAtomCallback(useCallback((get) => get(shoutAtom), []));
  return getShout;
};

const writeText2Clipboard = async (shout?: string) => {
  if (navigator.clipboard == null) throw new Error("clipboard is not enabled.");
  if (shout == null) {
    throw new Error("shout is not set.");
  }
  await navigator.clipboard.writeText(shout);
};

const useClipboard = () => {
  const [, startTransition] = useTransition();
  const setIsSuccess = useSetAtom(isSuccessAtom);
  const getShout = useGetShout();

  const fireInsert = useCallback(async () => {
    startTransition(() => {
      setIsSuccess(undefined);
    });
    const shout = getShout();
    const result = await writeText2Clipboard(shout)
      .then(() => true)
      .catch((e) => {
        console.log(e);
        return false;
      });
    startTransition(() => {
      setIsSuccess(result);
    });
  }, [getShout, setIsSuccess]);

  return {
    fireInsert,
  } as const;
};

export const CopyButton: React.FC<Props> = ({ children }) => {
  const { fireInsert } = useClipboard();
  return (
    <div className="w-full h-3/4 flex-col mt-auto">
      <button onClick={fireInsert} className="bg-panel rounded-xl w-1/2 h-1/4">
        {children[0]}
      </button>
      {children[1]}
    </div>
  );
};
