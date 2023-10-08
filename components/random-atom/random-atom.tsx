import { useState, useEffect } from "react";
import { useMount, useMountedState } from "react-use";
import { makeShout } from "@/src/make-shout";
import { TextView } from "./text-view";
import type { Atom } from "@/src/make-shout";

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

interface Props {
  setShout: (shout: string) => void;
}

export const RandomAtom: React.FC<Props> = ({ setShout }) => {
  const shout = useShout();
  const isMounted = useMountedState();
  useEffect(() => {
    if (!isMounted()) return;
    if (shout == null) return;
    setShout(shout);
  }, [isMounted, setShout, shout]);

  return shout == null ? null : (
    <div className="w-full h-full items-center">
      <TextView text={shout} />
    </div>
  );
};
