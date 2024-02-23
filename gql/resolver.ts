import {
  QueryResolvers,
  MetalsResolvers,
  Metal,
  Metals,
  DeleyMetals,
  DeleyMetal,
  DeleyMetalResolvers,
  DeleyMetalsResolvers,
} from "./resolver-type";
import { dbConnection } from "../drizzle/db";
import * as Schema from "../drizzle/schema";
import { eq, count, sql, inArray, and } from "drizzle-orm";
import { makeShout } from "./resolve-parts/make-shout";
import {
  MetalAtomsSubQuery,
  MetalAtomsSubQueryBase,
} from "@/drizzle/query-type";

await dbConnection.useNormal();

const db = dbConnection.db;

interface HasQuery {
  query: MetalAtomsSubQuery | MetalAtomsSubQueryBase;
}

const queryResolvers: QueryResolvers = {
  metals: (_1, _2, context: HasQuery) => {
    context.query = db.select().from(Schema.metalAtoms);
    return {} as Metals;
  },
};

const metalsResolvers: MetalsResolvers = {
  all: async () => {
    return {} as DeleyMetals;
  },
  select: async (_, { elementCode }, context: HasQuery) => {
    const query = context.query as MetalAtomsSubQueryBase;
    context.query = query
      .where(eq(Schema.metalAtoms.name, elementCode))
      .as("sq");
    return {} as DeleyMetal;
  },
  random: async (_1, _2, context) => {
    const [{ metalCount }] = await db
      .select({
        metalCount: sql<number>`cast(${count(Schema.metalAtoms.id)} as int)`,
      })
      .from(Schema.metalAtoms);
    const id = Math.round(Math.random() * metalCount) + 1;
    const query = context.query as MetalAtomsSubQueryBase;
    context.query = query.where(eq(Schema.metalAtoms.id, id)).as("sq");
    return {} as DeleyMetal;
  },
};

const deleyMetalResolvers: DeleyMetalResolvers = {
  styled: async (_1, _2, context: HasQuery) => {
    const query = context.query as MetalAtomsSubQuery;
    const [{ label, origin }] = await db
      .select({ origin: query.name, label: Schema.styledMetalAtoms.body })
      .from(query)
      .innerJoin(
        Schema.styledMetalAtoms,
        eq(query.id, Schema.styledMetalAtoms.base)
      );
    // console.dir({ aaa });
    return makeShout(label, origin.length);
    // return bag as any;
  },
  get: async (_1, _2, context: HasQuery) => {
    const query = context.query as MetalAtomsSubQueryBase;
    const [metal] = await query;
    return metal as Metal;
  },
};

const deleyMetalsResolvers: DeleyMetalsResolvers = {
  styledAll: async (_1, _2, context: HasQuery) => {
    const query = context.query as MetalAtomsSubQuery;
    const metalArray = await db
      .select({
        origin: query.name,
        label: Schema.styledMetalAtoms.body,
      })
      .from(query)
      .innerJoin(
        Schema.styledMetalAtoms,
        eq(Schema.metalAtoms.id, Schema.styledMetalAtoms.base)
      );
    const someStyled = metalArray.map(({ label, origin }) =>
      makeShout(label, origin.length)
    );
    return someStyled as string[];
  },
  getAll: async (_1, _2, context: HasQuery) => {
    const query = context.query as MetalAtomsSubQueryBase;
    const metalArray = await query;
    return metalArray as Metal[];
  },
};

export const resolvers = {
  Query: queryResolvers,
  Metals: metalsResolvers,
  DeleyMetal: deleyMetalResolvers,
  DeleyMetals: deleyMetalsResolvers,
};
