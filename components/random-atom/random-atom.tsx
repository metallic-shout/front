import { useState, useEffect, useCallback } from "react";
import { useMount, useMountedState } from "react-use";
import { makeShout } from "@/src/make-shout";
import { TextView } from "./text-view";
import type { Atom } from "@/src/make-shout";

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

interface Props {
  setShout: (shout: string) => void;
}

export const RandomAtom: React.FC<Props> = ({ setShout: setter }) => {
  const { shout, setShout } = useShout();
  const isMounted = useMountedState();
  const setRandomShout = useCallback(() => {
    setShout(makeRandomShout());
  }, [setShout]);
  useEffect(() => {
    if (!isMounted()) return;
    if (shout == null) return;
    setter(shout);
  }, [isMounted, setter, shout]);

  return shout == null ? null : (
    <div className="items-center px-10">
      <div className="h-max rounded-xl border-primary border overflow-hidden">
        <button
          className="border-r border-primary px-3 bg-panel"
          onClick={setRandomShout}
        >
          →
        </button>
        <div className="py-20 pl-5">
          <TextView text={shout} />
        </div>
      </div>
    </div>
  );
};
