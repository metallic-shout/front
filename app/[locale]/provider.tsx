"use client";

import type { ReactNode } from "react";
import { I18nProviderClient } from "@/locales/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api/graphql",
});

export const Provider = ({ locale, children }: ProviderProps) => {
  return (
    <I18nProviderClient locale={locale}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </I18nProviderClient>
  );
};
