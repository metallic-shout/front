"use client";

import { useMemo } from "react";
import { makeShout } from "@/src/make-shout";
import type { Atom } from "@/src/make-shout";
import { ClipboardExec } from "@/components/clipboard";

const atomObj = process.env.ATOM_OBJ as unknown as Record<string, Atom>;
const atoms: Atom[] = Object.values(atomObj);

const useShout = () => {
  const shout = useMemo(() => {
    const indexRandom = Math.round(Math.random() * atoms.length);
    const currentAtom = atoms[indexRandom];
    return makeShout(currentAtom);
  }, []);
  return shout;
};

export const RandomAtom: React.FC = () => {
  const shout = useShout();
  return (
    <div className="w-full h-1/2 flex">
      <div className="w-full h-full flex items-center">
        <textarea
          readOnly
          value={shout}
          className="bg-inherit w-3/4 ml-auto h-1/2 resize-none focus:outline-none"
        />
      </div>
      <ClipboardExec target={shout} />
    </div>
  );
};
