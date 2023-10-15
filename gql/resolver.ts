import {
  QueryResolvers,
  MetalsResolvers,
  Metal,
  Metals,
  MetalResolvers,
} from "./resolver-type";
import { metalMap } from "./resolve-parts/metal-map";

const queryResolvers: QueryResolvers = {
  metals: () => {
    const all = metalMap.map(([code, name]) => {
      const metal = { elementCode: code, name } as Metal;
      return metal;
    });
    return { all } as Metals;
  },
};

const metalsResolvers: MetalsResolvers = {
  select: (parent, { index }) => {
    return parent.all[index];
  },
  random: (parent) => {
    const length = parent.all.length;
    const index = Math.round(Math.random() * length);
    return parent.all[index];
  },
};

const metalResolvers: MetalResolvers = {
  styled: () => {},
};

export const resolvers = {
  Query: queryResolvers,
  Metals: metalsResolvers,
};
