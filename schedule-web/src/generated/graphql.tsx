import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddUser: Scalars['Boolean'];
  AddBooking: Scalars['Boolean'];
  CancellBooking: Scalars['Boolean'];
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  address: Scalars['String'];
};


export type MutationAddBookingArgs = {
  date: Scalars['String'];
  address: Scalars['String'];
};


export type MutationCancellBookingArgs = {
  date: Scalars['String'];
  address: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  CheckIfAddressInDatabase: Scalars['Boolean'];
  CheckIfBookingInDatabase: Scalars['Boolean'];
};


export type QueryCheckIfAddressInDatabaseArgs = {
  address: Scalars['String'];
};


export type QueryCheckIfBookingInDatabaseArgs = {
  date: Scalars['String'];
};

export type AddBookingMutationVariables = Exact<{
  date: Scalars['String'];
  address: Scalars['String'];
}>;


export type AddBookingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'AddBooking'>
);

export type AddUserMutationVariables = Exact<{
  address: Scalars['String'];
  email: Scalars['String'];
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'AddUser'>
);

export type CheckIfAddressInDatabaseQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type CheckIfAddressInDatabaseQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'CheckIfAddressInDatabase'>
);

export type CheckIfBookingInDatabaseQueryVariables = Exact<{
  date: Scalars['String'];
}>;


export type CheckIfBookingInDatabaseQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'CheckIfBookingInDatabase'>
);


export const AddBookingDocument = gql`
    mutation AddBooking($date: String!, $address: String!) {
  AddBooking(date: $date, address: $address)
}
    `;

export function useAddBookingMutation() {
  return Urql.useMutation<AddBookingMutation, AddBookingMutationVariables>(AddBookingDocument);
};
export const AddUserDocument = gql`
    mutation AddUser($address: String!, $email: String!) {
  AddUser(address: $address, email: $email)
}
    `;

export function useAddUserMutation() {
  return Urql.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument);
};
export const CheckIfAddressInDatabaseDocument = gql`
    query CheckIfAddressInDatabase($address: String!) {
  CheckIfAddressInDatabase(address: $address)
}
    `;

export function useCheckIfAddressInDatabaseQuery() {
  return Urql.useQuery<CheckIfAddressInDatabaseQuery,CheckIfAddressInDatabaseQueryVariables>({ query: CheckIfAddressInDatabaseDocument});
};
export const CheckIfBookingInDatabaseDocument = gql`
    query CheckIfBookingInDatabase($date: String!) {
  CheckIfBookingInDatabase(date: $date)
}
    `;

export function useCheckIfBookingInDatabaseQuery() {
  return Urql.useQuery<CheckIfBookingInDatabaseQuery,CheckIfBookingInDatabaseQueryVariables>({ query: CheckIfBookingInDatabaseDocument});
};