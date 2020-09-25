import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface User {
  id: number;
  name: string;
  shortBio: string;
  isVerified: boolean;
}

interface UserData {
  Users: User[];
}

interface UserVars {
  name: string;
}

const GET_ROCKET_INVENTORY = gql`
  query GetUsers {
    Users {
      id
      name
      shortBio
      isVerified
    }
  }
`;

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );
  return (
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ShortBio</th>
              </tr>
            </thead>
            <tbody>
              {data && data.Users.map(user => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.shortBio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}
