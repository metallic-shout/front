import { useMount } from "react-use";
import { useCallback } from "react";
import { atom, useSetAtom, useAtomValue } from "jotai";

type Listener = (shout: string) => void;

const shoutAtom = atom(undefined as string | undefined);
const listenerAtom = atom([] as Listener[]);
const adder4listenAtom = atom(null, (get, set, update: Listener) => {
  const next = [...get(listenerAtom), update];
  set(listenerAtom, next);
});

export const useShoutListener = (listener: Listener) => {
  const addListener = useSetAtom(adder4listenAtom);
  useMount(() => {
    addListener(listener);
  });
};

export const useApplyShout = () => {
  const listeners = useAtomValue(listenerAtom);
  const setShout = useSetAtom(shoutAtom);
  return useCallback(
    (shout: string) => {
      setShout(shout);
      listeners.forEach((f) => {
        f(shout);
      });
    },
    [listeners, setShout]
  );
};

export const useShoutContent = () => useAtomValue(shoutAtom);
