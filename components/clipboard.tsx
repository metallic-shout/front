"use client";

import { useCallback, useMemo, useEffect } from "react";
import { useMountedState } from "react-use";
import { atom, useAtom } from "jotai";

interface Props {
  target: string;
}

const defaultStatus = {
  isSuccess: null as boolean | null,
  isRunning: false,
};

const statusAtom = atom(defaultStatus);

const isSuccessAtom = atom(
  (get) => get(statusAtom).isSuccess,
  (get, set, update: boolean | null) => {
    const current = get(statusAtom);
    set(statusAtom, { ...current, isSuccess: update });
  }
);

const isRunningAtom = atom(
  (get) => get(statusAtom).isRunning,
  (get, set, update: boolean) => {
    const current = get(statusAtom);
    set(statusAtom, { ...current, isRunning: update });
  }
);

const setAllAtom = atom(null, (_, set, update: typeof defaultStatus) =>
  set(statusAtom, update)
);

const useClipboard = (targetRaw: string) => {
  const target = useMemo(() => targetRaw, [targetRaw]);
  const isMounted = useMountedState();
  const [isRunning] = useAtom(isRunningAtom);
  const [isSuccess, setIsSuccess] = useAtom(isSuccessAtom);
  const [_, setAll] = useAtom(setAllAtom);

  useEffect(() => {
    if (!isMounted()) return;
    if (!isRunning) return;
    if (navigator.clipboard == null) {
      setIsSuccess(false);
      return;
    }
    navigator.clipboard
      .writeText(target)
      .then(() => true)
      .catch(() => false)
      .then((isSuccess) => {
        setAll({ isRunning: false, isSuccess });
      });
  }, [isRunning, isMounted, target, setIsSuccess, setAll]);

  const fireInsert = useCallback(() => {
    setAll({ isRunning: true, isSuccess: null });
  }, [setAll]);
  return {
    isSuccess,
    fireInsert,
  } as const;
};

export const ClipboardExec: React.FC<Props> = ({ target }) => {
  const { isSuccess, fireInsert } = useClipboard(target);
  const variableProps = useMemo(() => {
    if (isSuccess == null) {
      return {};
    }
    return { "data-copy-result": isSuccess };
  }, [isSuccess]);
  return (
    <div className="w-full h-3/4 flex flex-col items-center mt-auto">
      <button
        onClick={fireInsert}
        className="bg-slate-900 rounded-xl w-1/2 h-1/4"
      >
        コピー
      </button>
      <div
        className={`
        [&>*]:hidden
        [&>*]:invisible
        [&[data-copy-result=true]>*[data-ok-label]]:block
        [&[data-copy-result=true]>*[data-ok-label]]:visible
        [&[data-copy-result=false]>*[data-error-label]]:block
        [&[data-copy-result=false]>*[data-error-label]]:visible
        mt-10
        `}
        {...variableProps}
      >
        <p data-ok-label>コピーしました！</p>
        <p data-error-label>コピーできませんでした。</p>
      </div>
    </div>
  );
};
