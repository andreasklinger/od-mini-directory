import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { User } from '../models/User';

const GET_USERS = gql`
  query Users($skip: Float!, $take: Float!, $searchTerm: String!) {
    Users(skip: $skip, take: $take, searchTerm: $searchTerm) {
      id
      name
      shortBio
      isVerified
      avatar
    }
  }
`;

interface QueryVars {
  skip: number;
  take: number;
  searchTerm: string;
}

interface UserData {
  Users: User[];
}

export const useUserSearch = (skip: number, take: number, query: string) => {
  const { loading, data, error, fetchMore } = useQuery<UserData, QueryVars>(
    GET_USERS,
    {
      variables: { skip, take, searchTerm: query },
    },
  );

  return { loading, data, error, fetchMore, skip };
};

export default useUserSearch;
