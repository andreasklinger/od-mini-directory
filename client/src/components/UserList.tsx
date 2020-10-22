import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import { UserItem } from './UserItem';

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

export const UserList: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const observer = useRef<IntersectionObserver>();

  const [skip, setSkip] = useState(0);

  const { loading, data, error, fetchMore } = useQuery<UserData, QueryVars>(
    GET_USERS,
    {
      variables: { skip: skip, take: 20, searchTerm: query },
    },
  );

  const users = data?.Users;

  const hasMore =
    users?.length && users.length !== 200 && users.length % 20 === 0;

  const lastUserRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip(skip + 20);

          fetchMore({
            variables: {
              skip: skip,
            },
            // @ts-ignore
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult?.Users) {
                return prevResult;
              } else {
                const newUsers = [
                  ...prevResult.Users,
                  ...fetchMoreResult.Users,
                ];
                return {
                  ...prevResult,
                  Users: newUsers,
                };
              }
            },
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className='text-center container'>
      <h3>Users</h3>
      <input type='text' onChange={handleSearch} />
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>ShortBio</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map((user, idx) => {
                  if (users.length === idx + 1)
                    return (
                      <tr ref={lastUserRef} key={user.id}>
                        <UserItem user={user} />
                      </tr>
                    );
                  return (
                    <tr key={user.id}>
                      <UserItem user={user} />
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
};
