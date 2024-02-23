import { useRef } from "react";

export const useTimer = (ms: number) => {
  const timer = useRef(undefined as ReturnType<typeof setTimeout> | undefined);
  const reset = () => {
    if (timer.current == null) return;
    clearTimeout(timer.current);
    timer.current = undefined;
  };
  const start = (f: () => void) => {
    timer.current = setTimeout(() => {
      f();
      timer.current = undefined;
    }, ms);
  };
  return { start, reset };
};
