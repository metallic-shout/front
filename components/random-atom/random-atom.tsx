"use client";

import { useState, useEffect, useCallback } from "react";
import { useMount, useMountedState } from "react-use";
import { makeShout } from "@/src/make-shout";
import { TextView } from "./text-view";
import type { Atom } from "@/src/make-shout";
import { useApplyShout } from "../atom";

const atomObj = process.env.ATOM_OBJ as unknown as Record<string, Atom>;
const atoms: Atom[] = Object.values(atomObj);

const makeRandomShout = () => {
  const indexRandom = Math.round(Math.random() * atoms.length);
  const currentAtom = atoms[indexRandom];
  return makeShout(currentAtom);
};

const useShout = () => {
  const [shout, setShout] = useState(null as string | null);
  useMount(() => {
    setShout(makeRandomShout());
  });
  return { shout, setShout };
};

interface Props {}

export const RandomAtom: React.FC<Props> = () => {
  const { shout, setShout } = useShout();
  const isMounted = useMountedState();
  const applyShout = useApplyShout();
  const setRandomShout = useCallback(() => {
    setShout(makeRandomShout());
  }, [setShout]);
  useEffect(() => {
    if (!isMounted()) return;
    if (shout == null) return;
    applyShout(shout);
  }, [applyShout, isMounted, shout]);

  return shout == null ? null : (
    <div className="px-10 h-1/3">
      <div
        className={`
          rounded-xl
          border-primary
          border
          overflow-hidden
          items-stretch
          `}
      >
        <button
          className="border-r border-primary px-3 bg-panel w-max"
          onClick={setRandomShout}
        >
          →
        </button>
        <div className="pl-5 justify-start">
          <TextView text={shout} />
        </div>
      </div>
    </div>
  );
};
