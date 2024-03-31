import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  FetchPostByID: Post;
  fetchPostForAdmin: Array<Post>;
  fetchPostForUser: Array<Post>;
  name: Scalars['String'];
};


export type QueryFetchPostByIdArgs = {
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  createdBy: Scalars['String'];
  creator: User;
  id: Scalars['String'];
  message: Scalars['String'];
  tags: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: User;
  updatePost: Post;
};


export type MutationCreatePostArgs = {
  postData: PostInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdatePostArgs = {
  postId: Scalars['String'];
  updatedPostData: PostInput;
};

export type PostInput = {
  message: Scalars['String'];
  tags: Scalars['String'];
  title: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type UserFragment = { __typename?: 'User', id: string, name: string, email: string };

export type LoginUserMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, firstName: string, lastName: string, name: string } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, name: string, email: string } | null };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
}
    `;
export const LoginUserDocument = gql`
    mutation loginUser($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    id
    firstName
    lastName
    name
  }
}
    `;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument);
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentUserQuery, CurrentUserQueryVariables>({ query: CurrentUserDocument, ...options });
};