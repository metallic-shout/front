import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DeleyMetal = {
  __typename?: 'DeleyMetal';
  get: Metal;
  styled: Scalars['String']['output'];
};

export type DeleyMetals = {
  __typename?: 'DeleyMetals';
  getAll: Array<Metal>;
  styledAll: Array<Scalars['String']['output']>;
};

export type Metal = {
  __typename?: 'Metal';
  elementCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Metals = {
  __typename?: 'Metals';
  all: DeleyMetals;
  random: DeleyMetal;
  select: DeleyMetal;
};


export type MetalsSelectArgs = {
  elementCode: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  metals: Metals;
};

export type StyledMetal = {
  __typename?: 'StyledMetal';
  board: Scalars['String']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeleyMetal: ResolverTypeWrapper<DeleyMetal>;
  DeleyMetals: ResolverTypeWrapper<DeleyMetals>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Metal: ResolverTypeWrapper<Metal>;
  Metals: ResolverTypeWrapper<Metals>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StyledMetal: ResolverTypeWrapper<StyledMetal>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DeleyMetal: DeleyMetal;
  DeleyMetals: DeleyMetals;
  Int: Scalars['Int']['output'];
  Metal: Metal;
  Metals: Metals;
  Query: {};
  String: Scalars['String']['output'];
  StyledMetal: StyledMetal;
};

export type DeleyMetalResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleyMetal'] = ResolversParentTypes['DeleyMetal']> = {
  get?: Resolver<ResolversTypes['Metal'], ParentType, ContextType>;
  styled?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleyMetalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleyMetals'] = ResolversParentTypes['DeleyMetals']> = {
  getAll?: Resolver<Array<ResolversTypes['Metal']>, ParentType, ContextType>;
  styledAll?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetalResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metal'] = ResolversParentTypes['Metal']> = {
  elementCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetalsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metals'] = ResolversParentTypes['Metals']> = {
  all?: Resolver<ResolversTypes['DeleyMetals'], ParentType, ContextType>;
  random?: Resolver<ResolversTypes['DeleyMetal'], ParentType, ContextType>;
  select?: Resolver<ResolversTypes['DeleyMetal'], ParentType, ContextType, RequireFields<MetalsSelectArgs, 'elementCode'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  metals?: Resolver<ResolversTypes['Metals'], ParentType, ContextType>;
};

export type StyledMetalResolvers<ContextType = any, ParentType extends ResolversParentTypes['StyledMetal'] = ResolversParentTypes['StyledMetal']> = {
  board?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DeleyMetal?: DeleyMetalResolvers<ContextType>;
  DeleyMetals?: DeleyMetalsResolvers<ContextType>;
  Metal?: MetalResolvers<ContextType>;
  Metals?: MetalsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StyledMetal?: StyledMetalResolvers<ContextType>;
};

