"use client";

import type { ReactNode } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

export const Provider = ({ children }: ProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
