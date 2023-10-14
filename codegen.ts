import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "gql/schema.graphql",
  // documents: "gql/schema.graphql",
  documents: ["components/**/*.tsx", "app/**/*.tsx"],
  generates: {
    "gql/client/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "gql/resolver-type.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
