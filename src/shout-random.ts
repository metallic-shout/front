import { makeShout, Atom } from "./make-shout";

const atomObj = process.env.ATOM_OBJ as unknown as Record<string, Atom>;
const atoms: Atom[] = Object.values(atomObj);

export const shoutRandom = () => {
  const indexRandom = Math.round(Math.random() * atoms.length);
  const currentAtom = atoms[indexRandom];
  return makeShout(currentAtom);
};
