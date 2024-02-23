"use client";
import {
  useCallback,
  useTransition,
  useState,
  ReactNode,
  useRef,
  useMemo,
} from "react";
import { useAtomCallback } from "jotai/utils";
import { shoutAtom } from "@/components/random-shout";
import { useTimer } from "./use-timer";

const LABEL_SHOW_DELEY = 1500;

interface Props {
  children: [ReactNode, ReactNode, ReactNode];
}

const writeText2Clipboard = async (shout?: string) => {
  if (navigator.clipboard == null) throw new Error("clipboard is not enabled.");
  if (shout == null) {
    throw new Error("shout is not set.");
  }
  await navigator.clipboard.writeText(shout);
};

const useClipboard = () => {
  const [isSuccess, setIsSuccess] = useState(undefined as boolean | undefined);
  const timer = useTimer(LABEL_SHOW_DELEY);
  const [, startTransition] = useTransition();
  const getShout = useAtomCallback(useCallback((get) => get(shoutAtom), []));
  const fireInsert = useCallback(async () => {
    timer.reset();
    startTransition(() => {
      setIsSuccess(undefined);
    });
    const result = await writeText2Clipboard(getShout())
      .then(() => true)
      .catch((e) => {
        console.log(e);
        return false;
      });
    startTransition(() => {
      setIsSuccess(result);
    });
    timer.start(() => {
      startTransition(() => {
        setIsSuccess(undefined);
      });
    });
  }, [getShout, timer]);

  return {
    isSuccess,
    fireInsert,
  } as const;
};

const useVisibles = (isSuccess: boolean | undefined) => {
  return useMemo(() => {
    if (isSuccess == null) return [undefined, undefined];
    if (isSuccess) return ["", undefined];
    else return [undefined, ""];
  }, [isSuccess]);
};

export const CopyButton: React.FC<Props> = ({ children }) => {
  const { isSuccess, fireInsert } = useClipboard();
  const visibles = useVisibles(isSuccess);
  return (
    <div className="w-full h-3/4 flex-col mt-auto">
      <button onClick={fireInsert} className="bg-panel rounded-xl w-1/2 h-1/4">
        {children[0]}
      </button>
      <div data-visible={visibles[0]}>{children[1]}</div>
      <div data-visible={visibles[1]}>{children[2]}</div>
    </div>
  );
};
