"use client";

import { useCallback, useEffect, useTransition, useRef } from "react";
import { useMountedState } from "react-use";
import { atom, useAtom, useSetAtom } from "jotai";
import { isSuccessAtom } from "./atom";
import { useShoutListener } from "../atom";

interface Props {
  children: [React.ReactNode, React.ReactNode];
}

const isRunningAtom = atom(false);

const useShoutRef = () => {
  const shoutRef = useRef(null as string | null);
  useShoutListener((shout) => {
    shoutRef.current = shout;
  });
  return shoutRef;
};

const useClipboard = () => {
  const [, startTransition] = useTransition();
  const isMounted = useMountedState();
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const setIsSuccess = useSetAtom(isSuccessAtom);
  const shout = useShoutRef();

  useEffect(() => {
    if (!isMounted()) return;
    if (!isRunning) return;
    if (navigator.clipboard == null) {
      startTransition(() => {
        setIsSuccess(false);
        setIsRunning(false);
      });
      return;
    }
    startTransition(async () => {
      if (shout.current == null) {
        setIsSuccess(false);
        setIsRunning(false);
        return;
      }
      const result = await navigator.clipboard
        .writeText(shout.current)
        .then(() => true)
        .catch(() => false);
      setIsSuccess(result);
      setIsRunning(false);
    });
  }, [isRunning, isMounted, setIsSuccess, setIsRunning, shout]);

  const fireInsert = useCallback(() => {
    startTransition(() => {
      setIsRunning(true);
      setIsSuccess(undefined);
    });
  }, [setIsRunning, setIsSuccess]);

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
