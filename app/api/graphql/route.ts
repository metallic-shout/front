import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import typeDefs from "@/gql/schema.graphql";
import { resolvers } from "@/gql/resolver";

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
});

const apolloServer = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { apolloServer as GET, apolloServer as POST };
