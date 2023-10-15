/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Metal = {
  __typename?: 'Metal';
  elementCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
  styled: Scalars['String']['output'];
};

export type Metals = {
  __typename?: 'Metals';
  all: Array<Metal>;
  random: Metal;
  select: Metal;
};


export type MetalsSelectArgs = {
  index: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  metals: Metals;
  randomMetal: Metal;
};

export type GetterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetterQuery = { __typename?: 'Query', metals: { __typename?: 'Metals', random: { __typename?: 'Metal', name: string } } };


export const GetterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Getter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"random"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetterQuery, GetterQueryVariables>;