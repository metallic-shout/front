import { atomWithReset } from "jotai/utils";

export type IsSuccessFlg = boolean | undefined;

export const isSuccessAtom = atomWithReset(undefined as IsSuccessFlg);
