"use client";

import { useMemo, useState } from "react";
import { useMount } from "react-use";
import { makeShout } from "@/src/make-shout";
import type { Atom } from "@/src/make-shout";
import { ClipboardExec } from "@/components/clipboard";

const atomObj = process.env.ATOM_OBJ as unknown as Record<string, Atom>;
const atoms: Atom[] = Object.values(atomObj);

const useShout = () => {
  const [shout, setShout] = useState(null as string | null);
  useMount(() => {
    const indexRandom = Math.round(Math.random() * atoms.length);
    const currentAtom = atoms[indexRandom];
    setShout(makeShout(currentAtom));
  });
  return shout;
};

export const RandomAtom: React.FC = () => {
  const shout = useShout();
  return (
    <div className="w-full h-1/2 flex">
      {shout == null ? (
        ""
      ) : (
        <>
          <div className="w-full h-full flex items-center">
            <textarea
              readOnly
              value={shout}
              className="bg-inherit w-3/4 ml-auto h-1/2 resize-none focus:outline-none"
            />
          </div>
          <ClipboardExec target={shout} />
        </>
      )}
    </div>
  );
};
