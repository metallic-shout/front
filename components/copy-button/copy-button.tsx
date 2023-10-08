import { useCallback, useEffect, useTransition } from "react";
import { useMountedState } from "react-use";
import { atom, useAtom } from "jotai";
import { ErrorMsg } from "./error-msg";

interface Props {
  target: React.MutableRefObject<string | null>;
}

const isSuccessAtom = atom(null as boolean | null);

const isRunningAtom = atom(false);

const useClipboard = (target: React.MutableRefObject<string | null>) => {
  const [, startTransition] = useTransition();
  const isMounted = useMountedState();
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const [isSuccess, setIsSuccess] = useAtom(isSuccessAtom);

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
      if (target.current == null) return;
      const result = await navigator.clipboard
        .writeText(target.current)
        .then(() => true)
        .catch(() => false);
      setIsSuccess(result);
    });
  }, [isRunning, isMounted, setIsSuccess, setIsRunning, target]);

  const fireInsert = useCallback(() => {
    startTransition(() => {
      setIsRunning(true);
      setIsSuccess(null);
    });
  }, [setIsRunning, setIsSuccess]);

  return {
    isSuccess,
    fireInsert,
  } as const;
};

export const CopyButton: React.FC<Props> = ({ target }) => {
  const { isSuccess, fireInsert } = useClipboard(target);
  return (
    <div className="w-full h-3/4 flex-col items-center mt-auto">
      <button onClick={fireInsert} className="bg-panel rounded-xl w-1/2 h-1/4">
        コピー
      </button>
      <ErrorMsg isSuccess={isSuccess} />
    </div>
  );
};
