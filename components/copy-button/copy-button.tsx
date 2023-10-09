"use client";

import { useCallback, useTransition, useRef } from "react";
import { useSetAtom } from "jotai";
import { isSuccessAtom } from "./atom";
import { useShoutListener } from "../atom";

interface Props {
  children: [React.ReactNode, React.ReactNode];
}

const useShoutRef = () => {
  const shoutRef = useRef(undefined as string | undefined);
  useShoutListener((shout) => {
    shoutRef.current = shout;
  });
  return shoutRef;
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
  const shout = useShoutRef();

  const fireInsert = useCallback(async () => {
    startTransition(() => {
      setIsSuccess(undefined);
    });
    const result = await writeText2Clipboard(shout.current)
      .then(() => true)
      .catch(() => false);
    startTransition(() => {
      setIsSuccess(result);
    });
  }, [setIsSuccess, shout]);

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
