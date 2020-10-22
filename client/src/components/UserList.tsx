import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UserItem } from './UserItem';
import useUserSearch from '../utils/useUserSearch';

export const UserList: React.FC = () => {
  const [query, setQuery] = useState<string>('');

  const observer = useRef<IntersectionObserver>();

  const { loading, data, error, fetchMore, skip } = useUserSearch(0, 20, query);

  const users = data?.Users;

  const hasMore = users?.length && users.length % 20 === 0;

  const lastUserRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore({
            variables: {
              skip: skip + 20,
            },
            // @ts-ignore
            updateQuery: (prevResult, { fetchMoreResult }) => {
              console.log(skip);
              if (!fetchMoreResult) {
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
